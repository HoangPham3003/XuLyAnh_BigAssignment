from flask import Flask
import os

app = Flask(__name__)
UPLOAD_FOLDER = './app/static/img_Uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.mkdir(UPLOAD_FOLDER)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

from app import routes