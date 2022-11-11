function updateAI() {
    fetch('http://127.0.0.1:8080/artefactos/readForAI').then(function (response) {
        console.log(response)
        return response.json()
    }).then(function (data) {
        /*fetch('127.0.0.1:5000/update', {
            method: 'POST',
            headers: {'Content-Type': 'appliaction/json'},
            body: JSON.stringify(data),

        }).then(raw => raw.json()).then(data => console.log(data))
        .catch(err=> console.log(err))*/
        console.log(JSON.stringify(data))

    }).catch(function (err) {
        console.log(err)
        console.log(data)
    })

}