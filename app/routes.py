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
    img = cv.cvtColor(img, cv.COLOR_BGR2HSV)

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
    img = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
    ret, img = cv.threshold(img, thresh=127, maxval=255, type=cv.THRESH_BINARY)

    # Create link img render
    fname = file_name.split(".")[0]
    output_path = "./app/static/img_Render/" + fname + "_ThresholdBinary.jpg"
    cv.imwrite(output_path, img)
    send_path = "../static/img_Render/" + fname + "_ThresholdBinary.jpg"

    cv.destroyAllWindows()
    return send_path


def edge_detect_sobel_x(input_path, file_name):
    img = cv.imread(input_path)  # Read image
    if img is None:
        print("Không tìm thấy file ảnh")

    # Processing img
    img = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
    img = cv.Sobel(img, ddepth=-1, dx=1, dy=0, ksize=3)

    # Create link img render
    fname = file_name.split(".")[0]
    output_path = "./app/static/img_Render/" + fname + "_Sobel_X.jpg"
    cv.imwrite(output_path, img)
    send_path = "../static/img_Render/" + fname + "_Sobel_X.jpg"

    cv.destroyAllWindows()
    return send_path


def edge_detect_sobel_y(input_path, file_name):
    # Processing img uploaded
    img = cv.imread(input_path)  # Read image
    if img is None:
        print("Không tìm thấy file ảnh")

    # Processing img
    img = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
    img = cv.Sobel(img, ddepth=-1, dx=0, dy=1, ksize=3)

    # Create link img render
    fname = file_name.split(".")[0]
    output_path = "./app/static/img_Render/" + fname + "_Sobel_Y.jpg"
    cv.imwrite(output_path, img)
    send_path = "../static/img_Render/" + fname + "_Sobel_Y.jpg"

    cv.destroyAllWindows()
    return send_path


def edge_detect_sobel_xy(input_path, file_name):
    img = cv.imread(input_path)  # Read image
    if img is None:
        print("Không tìm thấy file ảnh")

    # Processing img
    img = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
    imgx = cv.Sobel(img, ddepth=-1, dx=1, dy=0, ksize=3)
    imgy = cv.Sobel(img, ddepth=-1, dx=0, dy=1, ksize=3)
    img = imgx + imgy

    # Create link img render
    fname = file_name.split(".")[0]
    output_path = "./app/static/img_Render/" + fname + "_Sobel_XY.jpg"
    cv.imwrite(output_path, img)
    send_path = "../static/img_Render/" + fname + "_Sobel_XY.jpg"

    cv.destroyAllWindows()
    return send_path


def edge_detect_laplace(input_path, file_name):
    # Processing img uploaded
    img = cv.imread(input_path)  # Read image
    if img is None:
        print("Không tìm thấy file ảnh")

    # Processing img
    img = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
    img = cv.Laplacian(img, ddepth=-1, ksize=1)

    # Create link img render
    fname = file_name.split(".")[0]
    output_path = "./app/static/img_Render/" + fname + "_Laplace.jpg"
    cv.imwrite(output_path, img)
    send_path = "../static/img_Render/" + fname + "_Laplace.jpg"

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


@app.route('/sobelX', methods=['POST'])
def sobel_x():
    file = request.files['file']
    if file and allowed_file(file.filename):
        fileName = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], fileName))

        file_path = "./app/static/img_Uploads/" + str(fileName)
        res = edge_detect_sobel_x(file_path, fileName)
        res = str(res)
        return jsonify(data=res)


@app.route('/sobelY', methods=['POST'])
def sobel_y():
    file = request.files['file']
    if file and allowed_file(file.filename):
        fileName = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], fileName))

        file_path = "./app/static/img_Uploads/" + str(fileName)
        res = edge_detect_sobel_y(file_path, fileName)
        res = str(res)
        return jsonify(data=res)


@app.route('/sobelXY', methods=['POST'])
def sobel_xy():
    file = request.files['file']
    if file and allowed_file(file.filename):
        fileName = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], fileName))

        file_path = "./app/static/img_Uploads/" + str(fileName)
        res = edge_detect_sobel_xy(file_path, fileName)
        res = str(res)
        return jsonify(data=res)


@app.route('/laplace', methods=['POST'])
def laplace():
    file = request.files['file']
    if file and allowed_file(file.filename):
        fileName = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], fileName))

        file_path = "./app/static/img_Uploads/" + str(fileName)
        res = edge_detect_laplace(file_path, fileName)
        res = str(res)
        return jsonify(data=res)


@app.route("/favicon.ico")
def favicon():
    return "", 200


@app.route('/', methods=['GET'])
def index():
    return render_template("index.html")