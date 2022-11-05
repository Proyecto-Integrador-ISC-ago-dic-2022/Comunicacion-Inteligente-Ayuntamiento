from email import message
from urllib import response
from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
from chat import get_response
# -*- coding: utf-8 -*-

app = Flask(__name__)
CORS(app)


@app.post("/predict")
def predict():
    text = request.get_json().get("message")
    old_children = request.get_json().get("old_children")
    response, link, type, children = get_response(text, old_children)
    message = {"answer": response, "link": link, "type": type, "children": children}
    return jsonify(message)

if __name__ == "__main__":
    app.run(debug=True)
