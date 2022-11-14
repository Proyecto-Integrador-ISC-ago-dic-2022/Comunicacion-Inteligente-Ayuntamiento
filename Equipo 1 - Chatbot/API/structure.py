def revisarEstructura(body):
    try:
        if  body is not None and len(body) > 0:
            if 'interacciones' not in body:
                return False
            else: 
                return revisarPatronRespuestaInteraccion(body['interacciones'])
        else:
            return False
    except Exception as e:
        print("Se a producido el siguiente error: ", e)
        
def revisarPatronRespuestaInteraccion(interacciones):
    try:
        for interaccion in interacciones:
            if ('id' not in interaccion or 'etiqueta' not in interaccion or 'tipo' not in interaccion or 'categoria' not in interaccion
                or 'link' not in interaccion or 'sucesor_de' not in interaccion or 'nivel' not in interaccion or 'children' not in interaccion 
                or 'patrones' not in interaccion or 'respuestas' not in interaccion):
                    return False
            else:
                if (interaccion['patrones'] is None or len(interaccion['patrones']) == 0) or (interaccion['respuestas'] is None or len(interaccion['respuestas']) == 0) :
                    return False
                else:
                    if(len(interaccion['children'])!= 0):
                        if not revisarPatronRespuestaInteraccion(interaccion['children']):
                            return False
            
        return True
    except Exception as e:
        print("Se a producido el siguiente error: ", e)