
function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const value = Object.fromEntries(data.entries());
    value.pregunta = data.getAll('pregunta')
    value.respuesta = data.getAll('respuesta')
    console.log(value);

}

const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit)