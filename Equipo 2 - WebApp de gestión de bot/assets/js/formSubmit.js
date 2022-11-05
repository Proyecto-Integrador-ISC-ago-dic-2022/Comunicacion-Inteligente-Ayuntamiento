function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const value = Object.fromEntries(data.entries());
    value.patrones = data.getAll('patrones')
    value.respuesta = data.getAll('respuesta')
    const cleansedPreguntas = value.patrones.filter(element => {
        return element !== '';
    })
    const cleansedRespuestas = value.respuesta.filter(element => {
        return element !== '';
    })
    value.patrones = cleansedPreguntas;
    value.respuesta = cleansedRespuestas;
    console.log(value)

    
    let xhr = new XMLHttpRequest();
    let url = 'http://127.0.0.1:8080/artefactos/create'

    xhr.open("POST", url, true)
    xhr.setRequestHeader('Content-Type', 'application/json')

    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xhr.status === 200){
            console.log(xhr.responseText)
            var json = JSON.parse(xhr.responseText);
        }
    }


    xhr.send(JSON.stringify(value));
    console.log(JSON.stringify(value))
    console.log('posted.')

}

const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit)