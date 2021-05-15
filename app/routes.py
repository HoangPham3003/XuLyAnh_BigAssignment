from flask import Flask, flash, jsonify, request, render_template, url_for
from werkzeug.utils import secure_filename
import numpy as np
from app import app
import os
import cv2 as cv

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'tif'}


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def rgb_to_gray(input_path, file_name):
    print(input_path)
    img = cv.imread(input_path)         # Đọc ảnh
    if img is None:
        print("Không tìm thấy file ảnh")
    # arrRGB = np.array(img)
    img = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
    fname = file_name.split(".")[0]
    output_path = ".\\app\\static\\img_Render\\" + fname + "_RgbToGray.jpg"
    cv.imwrite(output_path, img)
    send_path = "..\\static\\img_Render\\" + fname + "_RgbToGray.jpg"
    cv.destroyAllWindows()
    return send_path


@app.route("/favicon.ico")
def favicon():
    return "", 200


@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        file = request.files['Img_RGB_To_Gray']
        if file and allowed_file(file.filename):
            fileName = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], fileName))

            file_path = ".\\app\\static\\img_Uploads\\" + str(fileName)
            res = rgb_to_gray(file_path, fileName)
            res = str(res)
            return jsonify(data=[res])

    return render_template("index.html")


