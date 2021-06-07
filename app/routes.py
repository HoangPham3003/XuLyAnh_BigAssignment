from flask import Flask, flash, jsonify, request, render_template, url_for
from werkzeug.utils import secure_filename
import numpy as np
from app import app
import os
import cv2 as cv

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'tif'}


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def face_detect(input_path, file_name):
    # Processing img uploaded
    img = cv.imread(input_path)         # Read image
    if img is None:
        print("Không tìm thấy file ảnh")

    # Processing img
    face_cascade = cv.CascadeClassifier(cv.data.haarcascades + 'haarcascade_frontalcatface_extended.xml')
    imgGray = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(imgGray)
    for (x, y, w, h) in faces:
        img = cv.rectangle(img, (x, y), (x + w, y + h), (255, 0, 0), 5)

    # Create link img render
    fname = file_name.split(".")[0]
    output_path = "./app/static/img_Render/" + fname + "_FaceDetected.jpg"
    cv.imwrite(output_path, img)
    send_path = "../static/img_Render/" + fname + "_FaceDetected.jpg"

    cv.destroyAllWindows()
    return send_path


def rgb_to_gray(input_path, file_name):
    # Processing img uploaded
    img = cv.imread(input_path)         # Read image
    if img is None:
        print("Không tìm thấy file ảnh")

    # Processing img
    img = cv.cvtColor(img, cv.COLOR_BGR2GRAY)

    # Create link img render
    fname = file_name.split(".")[0]
    output_path = "./app/static/img_Render/" + fname + "_RgbToGray.jpg"
    cv.imwrite(output_path, img)
    send_path = "../static/img_Render/" + fname + "_RgbToGray.jpg"

    cv.destroyAllWindows()
    return send_path


def rgb_to_hsv(input_path, file_name):
    # Processing img uploaded
    img = cv.imread(input_path)         # Read image
    if img is None:
        print("Không tìm thấy file ảnh")

    # Processing img
    img = cv.cvtColor(img, cv.COLOR_RGB2HSV)

    # Create link img render
    fname = file_name.split(".")[0]
    output_path = "./app/static/img_Render/" + fname + "_RgbToHsv.jpg"
    cv.imwrite(output_path, img)
    send_path = "../static/img_Render/" + fname + "_RgbToHsv.jpg"

    cv.destroyAllWindows()
    return send_path


def thresholding_binary(input_path, file_name):
    # Processing img uploaded
    img = cv.imread(input_path)  # Read image
    if img is None:
        print("Không tìm thấy file ảnh")

    # Processing img
    img = cv.cvtColor(img, cv.COLOR_RGB2HSV)

    # Create link img render
    fname = file_name.split(".")[0]
    output_path = "./app/static/img_Render/" + fname + "_RgbToHsv.jpg"
    cv.imwrite(output_path, img)
    send_path = "../static/img_Render/" + fname + "_RgbToHsv.jpg"

    cv.destroyAllWindows()
    return send_path

@app.route('/gray', methods=['POST'])
def gray():
    file = request.files['file']
    if file and allowed_file(file.filename):
        fileName = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], fileName))

        file_path = "./app/static/img_Uploads/" + str(fileName)
        res = rgb_to_gray(file_path, fileName)
        res = str(res)
        return jsonify(data=res)


@app.route('/hsv', methods=['POST'])
def hsv():
    file = request.files['file']
    if file and allowed_file(file.filename):
        fileName = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], fileName))

        file_path = "./app/static/img_Uploads/" + str(fileName)
        res = rgb_to_hsv(file_path, fileName)
        res = str(res)
        return jsonify(data=res)


@app.route('/detection', methods=['POST'])
def detection():
    file = request.files['file']
    if file and allowed_file(file.filename):
        fileName = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], fileName))

        file_path = "./app/static/img_Uploads/" + str(fileName)
        res = face_detect(file_path, fileName)
        res = str(res)
        return jsonify(data=res)


@app.route('/thresholding', methods=['POST'])
def thresholding():
    file = request.files['file']
    if file and allowed_file(file.filename):
        fileName = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], fileName))

        file_path = "./app/static/img_Uploads/" + str(fileName)
        res = thresholding_binary(file_path, fileName)
        res = str(res)
        return jsonify(data=res)


@app.route('/', methods=['GET'])
def index():
    return render_template("index.html")