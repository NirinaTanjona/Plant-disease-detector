import os
import numpy as np
from flask_cors import CORS, cross_origin
from flask import Flask, request, session, jsonify
from PIL import Image
from werkzeug.utils import secure_filename
from tensorflow.keras import models
from tensorflow.keras.preprocessing import image

UPLOAD_FOLDER = os.getcwd()
ALLOWED_EXTENSIONS = set(['jpeg', 'jpg', 'png'])


app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
CORS(app, supports_credentials=True)
app.config['CORS_HEADERS'] = 'Content-Type'


class_names = ['Apple___Apple_scab', 'Apple___Black_rot', 'Apple___Cedar_apple_rust',
               'Apple___healthy', 'Blueberry___healthy', 'Cherry___healthy',
               'Cherry___Powdery_mildew', 'Corn___Cercospora_leaf_spot Gray_leaf_spot',
               'Corn___Common_rust', 'Corn___healthy', 'Corn___Northern_Leaf_Blight',
               'Grape___Black_rot', 'Grape___Esca_(Black_Measles)', 'Grape___healthy',
               'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)',
               'Orange___Haunglongbing_(Citrus_greening)', 'Peach___Bacterial_spot',
               'Peach___healthy', 'Pepper,_bell___Bacterial_spot',
               'Pepper,_bell___healthy', 'Potato___Early_blight', 'Potato___healthy',
               'Potato___Late_blight', 'Raspberry___healthy', 'Soybean___healthy',
               'Squash___Powdery_mildew', 'Strawberry___healthy',
               'Strawberry___Leaf_scorch', 'Tomato___Bacterial_spot',
               'Tomato___Early_blight', 'Tomato___healthy', 'Tomato___Late_blight',
               'Tomato___Leaf_Mold', 'Tomato___Septoria_leaf_spot',
               'Tomato___Spider_mites Two-spotted_spider_mite', 'Tomato___Target_Spot',
               'Tomato___Tomato_mosaic_virus', 'Tomato___Tomato_Yellow_Leaf_Curl_Virus']


@ app.route("/predict", methods=["POST", "GET"])
def predict():
    # get take the image via POST
    target = os.path.join(UPLOAD_FOLDER, 'test_docs')
    if not os.path.isdir(target):
        os.mkdir(target)
    file = request.files['file']
    filename = secure_filename(file.filename)
    destination = "/".join([target, filename])
    file.save(destination)

    # preprocessing DATA and predict
    img = image.load_img(destination)
    img_array = image.img_to_array(img)
    img_batch = np.expand_dims(img_array, axis=0)

    model = models.load_model(
        UPLOAD_FOLDER + '/saved_leafDisease_detection')
    prediction = model.predict(img_batch)

    # return the prediction in form of JSON using jasonify
    return jsonify(response_func(prediction, class_names))
    # return jsonify(response)


def response_func(prediction, diseaseList):
    predict = []
    for disease in diseaseList:
        dict = {}
        dict['disease'] = disease
        dict['confidence'] = round(
            prediction[0][diseaseList.index(disease)].item(), 2)
        dict['index'] = diseaseList.index(disease)
        predict.append(dict)
    return predict


if __name__ == '__main__':
    predict()
