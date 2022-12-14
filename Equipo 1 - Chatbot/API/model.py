import torch
import torch.nn as nn
# -*- coding: utf-8 -*-

class NeuralNet(nn.Module):
    def __init__(self, input_size, hidden_size, num_classes):
        try:
            super(NeuralNet, self).__init__()
            self.l1 = nn.Linear(input_size, hidden_size) 
            self.l2 = nn.Linear(hidden_size, hidden_size) 
            self.l3 = nn.Linear(hidden_size, num_classes)
            self.relu = nn.ReLU()
        except Exception as e:
            print("Se a producido el siguiente error: ", e)
    
    def forward(self, x):
        try:
            out = self.l1(x)
            out = self.relu(out)
            out = self.l2(out)
            out = self.relu(out)
            out = self.l3(out)
            # no activation and no softmax at the end
            return out
        except Exception as e:
            print("Se a producido el siguiente error: ", e)
