function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const value = Object.fromEntries(data.entries());
    value.link = document.getElementById('link').value
    value.patrones = data.getAll('patrones')
    value.respuestas = data.getAll('respuestas')
    const cleansedPreguntas = value.patrones.filter(element => {
        return element !== '';
    })
    const cleansedRespuestas = value.respuestas.filter(element => {
        return element !== '';
    })
    value.patrones = cleansedPreguntas;
    value.respuestas = cleansedRespuestas;
    console.log(value.link)
    var jsonBody = JSON.stringify(value)

    
    let url = 'http://127.0.0.1:8080/artefactos/create'
    //ME SIENTO SUCIO IMPLEMETANDOLO DE ESTA MANERA
    setTimeout(()=> {
        fetch(url, {
            method: "POST", 
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(value)
        }).then(raw => raw.json)
        .then(data=> console.log(data))
    }, 500)

    console.log(JSON.stringify(value))

}

const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit)