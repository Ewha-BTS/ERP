# -*- coding: utf-8 -*-

import tensorflow as tf
from tensorflow import gfile

from flask import Flask, request, url_for, jsonify, render_template, session, redirect
from flask_pymongo import PyMongo
import gridfs
import bcrypt
from bson.objectid import ObjectId
from pymongo import ReturnDocument
import data_utils
import json
import requests

from seq2seq import tasks, models
from seq2seq.configurable import _maybe_load_yaml, _deep_merge_dict
from seq2seq.data import input_pipeline
from seq2seq.inference import create_inference_graph
from seq2seq.training import utils as training_utils

import yaml
import json, csv
from pydoc import locate
from io import StringIO

import pandas as pd 
import os

from flask_cors import CORS
from altair_saver import save


os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

# app.config["MONGO_URI"] = "mongodb://localhost:27017/ERP-database"
app.config["MONGO_URI"] = "mongodb+srv://yskim:11271127@cluster0.houen.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongo = PyMongo(app)

ALLOWED_EXTENSIONS = set(['json', 'tsv', 'csv'])



def allowed_file(filename):
     return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/')
def index():
    return '''
    <form method=post action="/upload" enctype=multipart/form-data>
      <input type=file name=file>
      <input type=submit value=Upload>
    </form>
    '''

@app.route('/mypage')
def mypage():
    if 'name' in session:
        return 'You are logged in as ' + session['name']

    return render_template('index.html')

# @app.route('/users/login', methods=['POST'])
# def login():
#     user = mongo.db.user
#     login_user = user.find_one({'email' : request.form['email']})

#     if login_user:
#         if bcrypt.checkpw(request.form['pass'].encode('utf-8'), login_user['password']):
#             session['name'] = login_user['name']
#             session['email'] = login_user['email']
#             session['password'] = request.form['pass'].encode('utf-8')
#             # return redirect(url_for('mypage'))
#             return jsonify({'message':'Login Done!', 'user_name':login_user['name']}), 200
#     # return 'Invalid name/password'
#     return jsonify({'message':'Login Failed!'}), 401

# @app.route('/users/signup', methods=['POST', 'GET'])
# def register():
#     if request.method == 'POST': # POST
#         user = mongo.db.user
#         existing_user = user.find_one({'name' : request.form['name']})
#         existing_email = user.find_one({'email' : request.form['email']})

#         if (existing_user is None) and (existing_email is None):
#             hashpass = bcrypt.hashpw(request.form['pass'].encode('utf-8'), bcrypt.gensalt())
#             user.insert({'name' : request.form['name'], 'email' : request.form['email'], 'password' : hashpass})

#             session['name'] = request.form['name']
#             # return redirect(url_for('mypage'))
#             return jsonify({'message': 'Register Success!', 'user_name':request.form['name']}), 201
#         # return 'That name already exists!'
#         return jsonify({'message': 'Register Failed!'}), 409
#     return render_template('register.html') # GET

# @app.route('/users/logout')
# def logout():
#     try:
#         session.pop('name', None)
#         return jsonify({'message':'Logout Success'}), 200
#     except:
#         return jsonify({'message':'Logout Failed'}), 405



@app.route('/users/account', methods=['GET','PUT'])
def account():
    if request.method == 'PUT': # update
        user = mongo.db.user
        hashpass = bcrypt.hashpw(request.form['pass'].encode('utf-8'), bcrypt.gensalt())
        user_name = session['name']
        try:
            user.update({'name' : user_name}, {'$set' : {'name' : request.form['name'], 'email' : request.form['email'], 'password' : hashpass}})
            return jsonify({'message':'account updated'}), 200
        except:
            return jsonify({'message':'account update failed'}), 405
    # GET 
    user_name = session['name']
    user_email = session['email']
    user_passwd = session['password']
    # print(user_passwd)
    data = [user_name, user_email, user_passwd]
    return jsonify({'message':'get user account info', 'user_name':user_name, 'user_email':user_email, 'user_pwd':user_passwd}), 200


@app.route('/upload', methods=['POST'])
def upload_file():
    file = request.files['file'] # file 타입의 name
    # user_id = request.args['user_id'] # front에서 전달받은 user_id
    user_id = '612b866711231c181083b74c'

    if file and allowed_file(file.filename):
        generated_plots = [] # 빈 Array // inference 과정에서 생성할 예정이므로.
        save_arr = []
        mongo.save_file(file.filename, file)

        # user_name = session['name']# user_name?
        file_type = file.filename.rsplit('.', 1)[1].lower() # json, csv, tsv
        data_url = 'http://127.0.0.1:5000/file/'+file.filename

        if file_type == 'json':
            data = pd.read_json(data_url)
        elif file_type == 'tsv':
            data = pd.read_csv(data_url, sep='\t')
        elif file_type == 'csv':
            data = pd.read_csv(data_url)
            
        cols = list(data.columns)
        print(cols)
        _id = mongo.db.data.insert({'userId': user_id, 'filename' : file.filename, 'generated_plots' : generated_plots, 'cols':cols, 'save_arr':save_arr})
        # _id = mongo.db.data.insert({'name': user_name, 'filename' : file.filename, 'generated_plots' : generated_plots})
        return jsonify({'message' : 'Success(file uploaded and updated DB)', 'userId' : user_id ,'fileId' : str(ObjectId(_id))}), 200
    return jsonify({'message' : 'Failed(no file OR not allowed file type)'}), 400

    # return 'Done!'
    # return jsonify(str(ObjectId(_id)))

@app.route('/file/<filename>')
def file(filename):
    return mongo.send_file(filename)

@app.route('/inference/<file_id>')
def inference(file_id):
    file = mongo.db.data.find_one({"_id" : ObjectId(file_id)}) # db 찾음
    if file:
        try:
            file_name = file['filename']
            file_id = file['_id']
            print(file_name, file_id)

            data_url = 'http://127.0.0.1:5000/file/'+file_name
            # r = requests.get(data_url)
            ############# TODO #############
            """
            this data(r) -> convert to json all!             
            """
            json_data = convert_to_json(file_name, data_url)
            ################################
            source_data = json.loads(json_data)
            # print(source_data)

            generated_plots = []
            # img_url_arr = []

            f_names = data_utils.generate_field_types(source_data)

            fnorm_result = data_utils.forward_norm(source_data, destination_file,
                                                   f_names)

            run_inference()
            num = 0

            for row in decoded_string:
                decoded_post = data_utils.backward_norm(row, f_names)
                vega_spec = json.loads(decoded_post)
                vega_spec['data'] = {'values' : source_data}
                # dist = './iris_plot/plot_'+str(num)+'.png'
                # print(vega_spec)
                # save(vega_spec, dist)
                # print('save?')
                # img_url_arr.append(dist)
                generated_plots.append(vega_spec)
                # print('append?')
                num+=1
            
            print(file_name, file_id)

            mongo.db.data.update(
                {'_id' : file_id},
                # {'$set' : {'generated_plots' : generated_plots, 'img_url' : img_url_arr}}
                {'$set' : {'generated_plots' : generated_plots}}
                
            )
            print(file_name, file_id)

            # return 'recommendation done!'
            # return jsonify({'message': 'Success(generated recommended plots)', 'plots':generated_plots, 'plots_url':img_url_arr}), 200
            return jsonify({'message': 'Success(generated recommended plots)', 'plots':generated_plots[0]}), 200

        except:
            return jsonify({'message' : 'Fail(Inference failed)'}), 500
    return jsonify({'message':'Fail(no file detected)'}), 400

@app.route('/inference_example')
def inference_example():
    file = mongo.db.data.find_one({"_id" : ObjectId('6186ba66ecb1fd45bdee6ec8')}) # db 찾음
    if file:
        generated_plots = file['generated_plots']
        return jsonify({'message': 'Success(example recommended plots)', 'plots':generated_plots}), 200

    return jsonify({'message':'Fail(no file detected)'}), 400

@app.route('/save', methods=['POST'])
def save():
    user_id = request.args['user_id'] # front에서 전달받은 user_id
    file_id = request.args['file_id'] # front에서 전달받은 file_id
    # img_url = request.args['img_url'] # front에서 전달받은 file_id
    plot_code = request.args['plot'] # front에서 전달받은 file_id


    data = mongo.db.data
    dist_data = data.find_one(
        {'_id' : file_id, 'userId' : user_id}
    )
    
    if dist_data:
        try:
            save_arr = dist_data['save_arr']
            dist = './temp_img/'+str(file_id)+'_plot_'+str(num)+'.png'
            save(plot_code, dist)
            save_arr.append(dist)
            # save_arr.append(img_url)
            data.update(
                {'_id' : file_id},
                {'$set' : {'save_arr' : save_arr}}
            )
            return jsonify({'message': 'Success(saved img url)', 'file_id' : file_id, 'save_arr':save_arr}), 200
        except:
            return jsonify({'message' : 'Fail(save failed)'}), 500
    return jsonify({'message':'Fail(no file detected)'}), 400

@app.route('/get_upload_history/<user_id>')
def get_upload_history(user_id):
    data = mongo.db.data
    history = []
    user_data_all = data.find({'userId':user_id})
    try :
        for x in user_data_all:
            file_name = x['filename']
            file_id = x['_id']
            time = x.get('_id').generation_time
            history.append([file_id, file_name, time])
        return jsonify({'message': 'data upload histroy loaded.', 'history':history}), 200
    except:
        return jsonify({'message': 'data upload histroy failed.'}), 400

@app.route('/get_save_plots/<file_id>')
def get_save_plots(file_id):
    data = mongo.db.data
    dist_data = data.find_one({'_id':ObjectId(file_id)})
    if dist_data:
        try :
            output = dist_data['save_arr']
            return jsonify({'message': 'save plots\' url loaded.', 'save_arr':output}), 200
        except:
            return jsonify({'message': 'Fail: save plots\' url load failed.'}), 500
    return jsonify({'message':'Fail(no file detected)'}), 400
# def recommend():
#     # session name이 같으면서 가장 최근에 올린 data file
#     user_name = session['name']
#     # print(user_name)
#     data = mongo.db.data
#     users_recent = data.find_one(
#         {'name' : user_name},
#         sort=[('_id', -1)]
#     )
    
#     if users_recent:
#         try:
#             file_name = users_recent['filename']
#             file_id = users_recent['_id']
#             print(file_name, file_id)

#             data_url = 'http://127.0.0.1:5000/file/'+file_name
#             # r = requests.get(data_url)
#             ############# TODO #############
#             """
#             this data(r) -> convert to json all!             
#             """
#             json_data = convert_to_json(file_name, data_url)
#             ################################
#             source_data = json.loads(json_data)
#             # print(source_data)

#             generated_plots = []
#             f_names = data_utils.generate_field_types(source_data)

#             fnorm_result = data_utils.forward_norm(source_data, destination_file,
#                                                    f_names)
#             run_inference()

#             for row in decoded_string:
#                 decoded_post = data_utils.backward_norm(row, f_names)
#                 vega_spec = json.loads(decoded_post)
#                 vega_spec['data'] = {'values' : source_data}
#                 generated_plots.append(vega_spec)
            

#             data.update(
#                 {'_id' : file_id},
#                 {'$set' : {'generated_plots' : generated_plots}}
#             )

#             # return 'recommendation done!'
#             return jsonify({'message': 'Success(generated recommended plots)', 'plots':generated_plots}), 200
#         except:
#             return jsonify({'message' : 'Fail(Inference failed)'}), 500
#     return jsonify({'message':'Fail(no file detected)'}), 400
# @app.route('/rec_edit', methods=['POST', 'GET', 'PUT'])
# def rec_edit():
#     """
#     POST : save the plots which is edited and triggered 'save' button by the user
#     """
#     # if request.method == 'POST': # 


#     """
#     GET : just respond generated plots before editing
#     """
#     user_name = session['name']
#     data = mongo.db.data

#     data_recent = data.find_one(
#         {'name': user_name},
#         sort=[('_id', -1)]
#     )

#     if data_recent:
#         try:
#             # user_plots = mongo.db.usre_plots
#             plots = data_recent['generated_plots']
#             # spec(cols) = data['']~
#             cols = data_recent['cols']
#             return jsonify({'message': 'Success(Get plots\' code, columns\' names)', 'plots':plots, 'cols': cols}), 200
#         except:
#             return jsonify({'message': 'Fail(?)'}), 500
    
#     return jsonify({'message':'Fail(No recent data)'}), 400

def convert_to_json(file_name, data):
    file_type = file_name.split('.')[-1]
    if file_type == 'csv':
        df = pd.read_csv(data)
        result = df.to_json(orient="records")
        return result
    if file_type == 'tsv':
        df = pd.read_csv(data, sep='\t')
        result = df.to_json(orient="records")
        return result




# Function to run inference.
def run_inference():
    # tf.reset_default_graph()
    with graph.as_default():
        saver = tf.train.Saver()
        checkpoint_path = loaded_checkpoint_path
        if not checkpoint_path:
            checkpoint_path = tf.train.latest_checkpoint(model_dir_input)

        def session_init_op(_scaffold, sess): 
            ########### restore model ckpt
            saver.restore(sess, checkpoint_path)
            tf.logging.info("Restored model from %s", checkpoint_path)

        scaffold = tf.train.Scaffold(init_fn=session_init_op)
        session_creator = tf.train.ChiefSessionCreator(scaffold=scaffold)
        with tf.train.MonitoredSession(
                session_creator=session_creator, hooks=hooks) as sess:
            sess.run([])
        # print(" ****** decoded string ", decoded_string)
        return decoded_string

destination_file = "test.txt"
# Setup Input parameters
input_pipeline_dict = {
    'class': 'ParallelTextInputPipeline',
    'params': {
        'source_delimiter': '',
        'target_delimiter': '',
        'source_files': [destination_file]
    }
}

model_dir_input = './vizmodel/'

input_task_list = [{'class': 'DecodeText', 'params': {'delimiter': ''}}]

dump_attention_task = {
    'class': 'DumpAttention',
    'params': {
        'dump_plots': False,
        'output_dir': "attention_plot"
    }
}

beam_width = 15 # default setting

#  {'class': 'DumpBeams', 'params': {'file': ['out.npz']}}]
model_params = "{'inference.beam_search.beam_width': 5}"
batch_size = 32
loaded_checkpoint_path = None

session_creator = None
hooks = []
decoded_string = ""


fl_tasks = _maybe_load_yaml(str(input_task_list))
fl_input_pipeline = _maybe_load_yaml(str(input_pipeline_dict))

# Load saved training options
train_options = training_utils.TrainOptions.load(model_dir_input)

# Create the model
model_cls = locate(train_options.model_class) or \
    getattr(models, train_options.model_class)
model_params = train_options.model_params
if (beam_width != 1):
    model_params["inference.beam_search.beam_width"] = beam_width
model_params = _deep_merge_dict(model_params, _maybe_load_yaml(model_params))
model = model_cls(params=model_params, mode=tf.contrib.learn.ModeKeys.INFER)

print("========model params ==========\n", model_params)

def _handle_attention(attention_scores):
    print(">>> Saved attention scores")


def _save_prediction_to_dict(output_string):
    global decoded_string
    decoded_string = output_string


# Load inference tasks
for tdict in fl_tasks:
    if not "params" in tdict:
        tdict["params"] = {}
    task_cls = locate(str(tdict["class"])) or getattr(tasks, str(
        tdict["class"]))
    if (str(tdict["class"]) == "DecodeText"):
        task = task_cls(
            tdict["params"], callback_func=_save_prediction_to_dict)
    elif (str(tdict["class"]) == "DumpAttention"):
        task = task_cls(tdict["params"], callback_func=_handle_attention)

    hooks.append(task)

input_pipeline_infer = input_pipeline.make_input_pipeline_from_def(
    fl_input_pipeline,
    mode=tf.contrib.learn.ModeKeys.INFER,
    shuffle=False,
    num_epochs=1)

# Create the graph used for inference
predictions, _, _ = create_inference_graph(
    model=model, input_pipeline=input_pipeline_infer, batch_size=batch_size)

graph = tf.get_default_graph()



if __name__ == '__main__':
    app.secret_key = 'mysecret'
    app.run(debug=True, threaded=True)
