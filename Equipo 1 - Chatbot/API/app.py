from email import message
from urllib import response
from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
from chat import get_response
# -*- coding: utf-8 -*-

app = Flask(__name__)
CORS(app)

""" 
@app.get("/")
def index_get():
    return render_template("base.html") """

@app.post("/predict")
def predict():
    text = request.get_json().get("message")
    # TODO: check if text is valid
    response, is_ink = get_response(text)
    message = {"answer": response, "is_link": is_ink}
    return jsonify(message)

if __name__ == "__main__":
    app.run(debug=True)
