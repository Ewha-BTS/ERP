from flask import Flask, request, url_for, jsonify
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from pymongo import ReturnDocument
import json

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb+srv://yskim:<password>@cluster0.houen.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
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
        viz_path = 'erp-server/barley/barley'+str(i+1)+'.json'
        with open(viz_path) as f:
            tmp_data = json.load(f)
            vizspec.append(tmp_data)
    
    # print(vizspec)

    # user_id에 맞는 collection 가져와서 vizspec 부분 업데이트
    mongo.db.users.update({'_id' : ObjectId(user_id)}, {'$set' : {'vizspec' : vizspec}})

    # return 'Generated Plots.'
    return jsonify({'message' : 'vizspec Updated'})


if __name__ == '__main__':
    app.run(debug=True, threaded=True)