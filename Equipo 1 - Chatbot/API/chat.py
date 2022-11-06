import random
import json
# -*- coding: utf-8 -*-
import torch

from model import NeuralNet
from nltk_utils import bag_of_words, tokenize

def get_response(msg, old_children):
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

    
    sentence = tokenize(msg)
    tag, prob = get_tag(sentence,tags,all_words,device,model)


    if len(old_children) != 0 and old_children is not None:
        sentence_child = tokenize(str(old_children[0]['Sucesor_de'])+" "+msg)
        tag_child, prob_child = get_tag(sentence_child,tags,all_words,device,model)
        if prob_child.item() > 0.75:
            for old_child in old_children:
                if tag_child == old_child["Etiqueta"]:
                    return (random.choice(old_child['Respuesta']),  old_child['Link'], old_child['Tipo'], old_child['children'])

    if prob.item() > 0.75:
        for intent in intents['interacciones']:
            if tag == intent["Etiqueta"]:
                return (random.choice(intent['Respuesta']),  intent['Link'], intent['Tipo'], intent['children'])
    
    return (random.choice([
        "Lo siento. No te entendí.",
        "Perdon, no comprendo.", 
        "Una disculpa, podría repetirlo."]), "", 1, [])

def get_tag(sentence,tags,all_words,device,model):
    X = bag_of_words(sentence, all_words)
    X = X.reshape(1, X.shape[0])
    X = torch.from_numpy(X).to(device)

    output = model(X)
    _, predicted = torch.max(output, dim=1)

    tag = tags[predicted.item()]

    probs = torch.softmax(output, dim=1)
    prob = probs[0][predicted.item()]
    return tag, prob