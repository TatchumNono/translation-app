import os
import whisper
from flask import Flask, jsonify, request
from werkzeug.utils import secure_filename
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = r'C:\Users\TatchumNono\Desktop\projects\translation app\backend\uploads'

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

ALLOWED_EXTENSIONS = set(['wav', 'mp3', 'aac', 'wma', 'm4a', 'flac', 'mp4', 'mpeg'])

def allowed_file(filename):
	return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/",methods = ['GET'])
def test():
    data = "hello world"
    return jsonify({'data': data})

@app.route('/file-upload', methods=['POST'])
def upload_file():
	# check if the post request has the file part
	if 'file' not in request.files:
		resp = jsonify({'message' : 'No file part in the request'})
		resp.status_code = 400
		return resp
	file = request.files['file']
	if file.filename == '':
		resp = jsonify({'message' : 'No file selected for uploading'})
		resp.status_code = 400
		return resp
	if file and allowed_file(file.filename):
		filename = secure_filename(file.filename)
		file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
		resp = jsonify({'message' : 'File successfully uploaded'})
		resp.status_code = 201
		return resp
	else:
		resp = jsonify({'message' : 'Allowed file types are wav, mp3, aac, wma, m4a, flac, mp4'})
		resp.status_code = 400
		return resp

@app.route('/transcribe/<filename>', methods=['GET'])
def transcribe(filename):
    filepath = UPLOAD_FOLDER + "\\" + filename
    
    model = whisper.load_model("small")
    result = model.transcribe(filepath, fp16=False)
    
    resp = jsonify({'message' : result["text"]})
    return resp

@app.route('/delete_file', methods=['DELETE'])
def delete_file():
    filename = request.args.get('filename')
    filepath = UPLOAD_FOLDER + "//" + filename
    if not filename:
        return 'No filename provided', 400
    try:
        os.remove(filepath)
        return f'{filepath} deleted successfully', 200
    except Exception as e:
        return str(e), 500
    

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000,debug=True)