from email import message
from flask import Flask, jsonify, render_template, request, Response
from flask_cors import CORS
from chat import get_response
from train import train
from structure import revisarEstructura
import json
# -*- coding: utf-8 -*-

app = Flask(__name__)
CORS(app)


@app.post("/predict")
def predict():
    try:
        text = request.get_json().get("message")
        old_children = request.get_json().get("old_children")
        response, link, type, children = get_response(text, old_children)
        message = {"answer": response, "link": link, "type": type, "children": children}
        return jsonify(message)
    except Exception as e:
        print("Se a producido el siguiente error: ", e)
        return Response("Error interno", status=500)


#Post para recibir la info del dashboard
@app.route("/update", methods=("GET", "POST"))
def update():
    try:
        if request.method == "POST":
            body = request.get_json(force = True)
            estructura_correcta = revisarEstructura(body)
            if estructura_correcta:
                #Sobrescribir el json con los nuevos valores
                with open("interacciones.json", "w") as file:
                    file.write(json.dumps(body))
                #Entrenar el modelo
                intents = {}
                with open('interacciones.json', 'r') as f:
                    intents = json.load(f)
                train(intents)
                #Avisar que el modelo fue entrenado exitosamente
                return Response("El modelo se ha entrenado",status=200)
            else:
                #Avisar que la estructura no es la adecuada
                return Response("La estructura no es la adecuada", status=403)
    except Exception as e:
        return Response("Error interno", status=500)


if __name__ == "__main__":
    app.run(debug=True, use_reloader=False)

# Para producción
""" if __name__ == "__main__":
    from waitress import serve
    serve(app, host="0.0.0.0", port=8080) 
    https://stackoverflow.com/questions/51025893/flask-at-first-run-do-not-use-the-development-server-in-a-production-environmen
    """
