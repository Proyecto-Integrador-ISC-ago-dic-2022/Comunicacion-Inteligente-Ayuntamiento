# Comunicacion-Inteligente-Ayuntamiento
En este repositorio se almacenaran los sistemas pertenecientes al proyecto de comunicación inteligente para la ciudadanía desarrollado para el Ayuntamiento de Atizapán junto con el Tecnológico de Monterrey

## Equipo 1: API - CHATBOT
* A01376398 - Oscar Macias Rodríguez
* A01748632 - Michel Antoine Dionne Gutierrez
* A01748172 - Rodrigo Cravioto Caballero

## Uso

Iniciar ambiente de python
```
$ python3 -m venv venv
```
Mac
```
$ . venv/bin/activate
```
Windows
```
$ .\venv\Scripts\activate
```

Instalar dependencias
```
$ (venv) pip install Flask torch torchvision nltk
```
Instalar paquete nltk
```
$ (venv) python
>>> import nltk
>>> nltk.download('punkt')
```
Entrenar
```
$ (venv) python train.py
```

Run
```
$ (venv) python app.py
```



