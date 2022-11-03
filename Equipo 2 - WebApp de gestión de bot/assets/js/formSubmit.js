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

    
    //let xhr = new XMLHttpRequest();
    let url = '127.0.0.1:8080/artefactos/create'

    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',

        },
        body: JSON.stringify(value)
    }).then(response=> response.json())
    // xhr.open("POST", url)
    // xhr.setRequestHeader('Content-Type', 'application/json')


    // xhr.send(value);
    // console.log(JSON.stringify(value))
    // console.log('posted.')

}

const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit)