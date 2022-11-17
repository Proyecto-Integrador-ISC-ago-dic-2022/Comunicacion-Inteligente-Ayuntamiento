function updateAI() {
    console.log('updating')
    fetch('http://127.0.0.1:8080/artefactos/readForAI').then(function (response) {
        return response.json()
    }).then(function (data) {
        fetch('http://127.0.0.1:5000/update', {
            method: 'POST',
            headers: {'Content-Type': 'appliaction/json'},
            body: JSON.stringify(data),

        }).then(function (raw){ 
            if(raw.status == 200){
                document.location.reload()
            }
            else{
                alert('something went wrong.')
            }
            raw.json()}).then(data => console.log(data))
        .catch(err=> console.log(err))
        console.log(data)

    }).catch(function (err) {
        console.log(err)
    })

}


function createAlert(message, severity) {
    var alert = document.createElement('div')
    var alertSeverity = ' alert-' + severity
    alert.className = 'alert alert-dismissable d-flex justify-content-between' + alertSeverity
    alert.setAttribute('role', 'alert')
    alert.appendChild(document.createTextNode(message))
    //<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    var button = document.createElement('button')
    button.type = 'button'
    button.className = 'btn-close'
    button.setAttribute('data-bs-dismiss', 'alert')
    button.setAttribute('aria-label', 'Close')
    alert.appendChild(button)
    return alert

}