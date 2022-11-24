import random
import json
# -*- coding: utf-8 -*-
import torch

from model import NeuralNet
from nltk_utils import bag_of_words, tokenize

def get_response(msg, old_children):
    probabilidad_predict = 0.75
    try:
        with open('interacciones.json', 'r', encoding="utf-8") as json_data:
            intents = json.load(json_data)


        bot_name = "Asistente Virtual Atizapan"

        device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

        all_words = []
        tags = []

        FILE = "data.pth"
        data = torch.load(FILE)

        input_size = data["input_size"]
        hidden_size = data["hidden_size"]
        output_size = data["output_size"]
        all_words = data['all_words']
        tags = data['tags']
        model_state = data["model_state"]

        model = NeuralNet(input_size, hidden_size, output_size).to(device)
        model.load_state_dict(model_state)
        model.eval()

        

        if old_children is not None:
            if len(old_children) != 0:
                sentence_child = tokenize(str(old_children[0]['sucesor_de'])+" "+msg)
                tag_child, prob_child = get_tag(sentence_child,tags,all_words,device,model)
                
                if prob_child.item() > probabilidad_predict:
                    for old_child in old_children:
                        if tag_child == old_child["etiqueta"]:
                            return (random.choice(old_child['respuestas']),  old_child['link'], old_child['tipo'], old_child['children'])


        sentence = tokenize(msg)
        tag, prob = get_tag(sentence,tags,all_words,device,model)


        if prob.item() > probabilidad_predict:
            for intent in intents['interacciones']:
                
                if tag == intent["etiqueta"]:
                    return (random.choice(intent['respuestas']),  intent['link'], intent['tipo'], intent['children'])
        
        return (random.choice([
    "Lo siento. No te entendí.",
    "No comprendí, una disculpa.",
    "Perdón, no comprendo.",
    "¿Podrías repetirlo? No logré comprender tu solicitud.",
    "Disculpa, no entendí.",
    "Una disculpa, podría repetirlo."
    ]), "", 1, [])
    except Exception as e:
         print("Se a producido el siguiente error: ", e)

def get_tag(sentence,tags,all_words,device,model):
    try:
        X = bag_of_words(sentence, all_words)
        X = X.reshape(1, X.shape[0])
        X = torch.from_numpy(X).to(device)

        output = model(X)
        _, predicted = torch.max(output, dim=1)
        tag = tags[predicted.item()]

        probs = torch.softmax(output, dim=1)
        prob = probs[0][predicted.item()]
        return tag, prob
    except Exception as e:
        print("Se a producido el siguiente error: ", e)

