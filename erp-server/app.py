
import tensorflow as tf
from tensorflow import gfile

from flask import Flask, request, url_for, jsonify
from flask_pymongo import PyMongo
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
import json
from pydoc import locate

app = Flask(__name__)
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

@app.route('/upload', methods=['POST'])
def upload_file():
    file = request.files['file'] # file 타입의 name
    # filename = secure_filename(file.filename)
    if file and allowed_file(file.filename):
        vizspec = [] # 빈 Array // inference 과정에서 생성할 예정이므로.
        mongo.save_file(file.filename, file)
        # mongo.db.users.insert({'filename' : file.filename, 'vizspec' : vizspec})
        _id = mongo.db.users.insert({'filename' : file.filename, 'vizspec' : vizspec})
    # return 'Done!'
    return jsonify(str(ObjectId(_id)))

@app.route('/file/<filename>')
def file(filename):
    return mongo.send_file(filename)


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


@app.route('/inference/<user_id>')
def inference(user_id):
    db = mongo.db.users.find_one({"_id" : ObjectId(user_id)}) # db 찾음
    db_filename = db["filename"]
    data_url = 'http://127.0.0.1:5000/file/'+db_filename
    r = requests.get(data_url)
    source_data = json.loads(r.content)

    vizspec = []
    #####################################################################
    ######################## model inference 과정 ########################

    # Perform preprocessing - forward normalization on first data sample
    f_names = data_utils.generate_field_types(source_data)
    fnorm_result = data_utils.forward_norm(source_data, destination_file,
                                           f_names)

    run_inference()
        # Perform post processing - backward normalization
    vizspec = []
    for row in decoded_string:
        decoded_post = data_utils.backward_norm(row, f_names)
        vizspec.append(json.loads(decoded_post))
        

    ############vizspec.append(inference를 통해 만들어진 viz spec)###########
    #####################################################################
    #####################################################################
    
    for spec in vizspec:
        spec["data"] = data_url
        # print(spec)
    # data2vis가 barley.json 가지고 만든 Vega-lite 코드
    # for i in range(10):
    #     viz_path = 'barley/barley'+str(i+1)+'.json'
    #     with open(viz_path) as f:
    #         tmp_data = json.load(f)
    #         vizspec.append(tmp_data)
    
    # print(vizspec)

    # user_id에 맞는 collection 가져와서 vizspec 부분 업데이트
    mongo.db.users.update({'_id' : ObjectId(user_id)}, {'$set' : {'vizspec' : vizspec}})

    # return 'Generated Plots.'
    return jsonify({'vizspec' : vizspec})


if __name__ == '__main__':
    app.run(debug=True, threaded=True)
