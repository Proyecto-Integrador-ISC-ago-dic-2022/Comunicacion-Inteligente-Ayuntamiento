
function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const value = Object.fromEntries(data.entries())

    if (Object.keys(value).length === 0) {
        var alert = createAlert('Tiene que haber al menos una categoría habilitada.', 'warning')
        var card = document.getElementById('catFooter')
        card.prepend(alert)

    } else {

        for (i in value) {
            value[i] = true
        }

        let url = 'http://127.0.0.1:8080/artefactos/changeCatStatus'
        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(value)
        }).then(raw => raw.json)
            .then(data => console.log(data));
        setTimeout(() => {
            document.location.reload()
        }, 1000)
    }
}
const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit)