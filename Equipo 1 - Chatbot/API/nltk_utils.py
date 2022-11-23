import numpy as np
import nltk
# nltk.download('punkt')
# -*- coding: utf-8 -*-
from nltk.stem.snowball import SpanishStemmer
stemmer = SpanishStemmer()


def tokenize(sentence):
    try:
        return nltk.word_tokenize(sentence)
    except Exception as e:
        print("Se a producido el siguiente error: ", e)

def stem(word):
    try:
        return stemmer.stem(word.lower())
    except Exception as e:
        print("Se a producido el siguiente error: ", e)


def bag_of_words(tokenized_sentence, words):
    try:
        # stem each word
        sentence_words = [stem(word) for word in tokenized_sentence]
        # initialize bag with 0 for each word
        bag = np.zeros(len(words), dtype=np.float32)
        for idx, w in enumerate(words):
            if w in sentence_words: 
                bag[idx] = 1

        return bag
    except Exception as e:
        print("Se a producido el siguiente error: ", e)
