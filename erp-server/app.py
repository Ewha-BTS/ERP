from flask import Flask, request, url_for, jsonify
from flask_cors import CORS, cross_origin
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from pymongo import ReturnDocument
import json


app = Flask(__name__)
CORS(app)
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
    print(11111)
    file = request.files['file'] # file 타입의 name
    # file = request.form['file']
    
    # print(2222)
    print(file) # OK 
    # filename = secure_filename(file.filename)
    if file and allowed_file(file.filename):
        print('---1')
        vizspec = [] # 빈 Array // inference 과정에서 생성할 예정이므로.
        print('---2')
        mongo.save_file(file.filename, file)
        print('---3')

        # mongo.db.users.insert({'filename' : file.filename, 'vizspec' : vizspec})
        # _id = mongo.db.users.insert({'filename' : file.filename, 'vizspec' : vizspec})
        _id = mongo.db.users.insert_one({'filename' : file.filename, 'vizspec' : vizspec})

        print(_id)
        print('---4')

        print('0----')
        print(_id)
    # return 'Done!'
        print('---5')
        
        # res = jsonify(str((_id)))
        # res = jsonify(_id.inserted_id)

    # return res
    return str(_id.inserted_id)

@app.route('/file/<filename>')
def file(filename):
    return mongo.send_file(filename)

@app.route('/inference/<user_id>')
def inference(user_id):

    vizspec = []
    #####################################################################
    ######################## model inference 과정 ########################
    ############vizspec.append(inference를 통해 만들어진 viz spec)###########
    #####################################################################
    #####################################################################
    
    
    # data2vis가 barley.json 가지고 만든 Vega-lite 코드
    for i in range(10):
        viz_path = 'barley/barley'+str(i+1)+'.json'
        with open(viz_path) as f:
            tmp_data = json.load(f)
            vizspec.append(tmp_data)
    
    # print(vizspec)

    # user_id에 맞는 collection 가져와서 vizspec 부분 업데이트
    mongo.db.users.update({'_id' : ObjectId(user_id)}, {'$set' : {'vizspec' : vizspec}})

    res = jsonify({'vizspec' : vizspec})
    # res.headers.add('Access-Control-Allow-Origin', '*')
    # res.headers.add('Access-Control-Allow-Headers', "*")
    # res.headers.add('Access-Control-Allow-Methods', "*")
    # return 'Generated Plots.'
    return res


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5018, debug=True, threaded=True)
