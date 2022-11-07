//dropdown menu data and creation

var isCreate = true
var data = ["Soporte", "Innovacion", "Obras públicas", "Servicios Públicos", "SAPASA", "Seguridad Pública", "Desarrollo Urbano", "Contraloría Municipal", "Protección Civil", "Normatividad", "Subdirección de Tránsito", "Desarrollo Social", "Desarrollo Económico", "Derechos Humanos", "Seguridad Pública y Tránsito", "Secretaría General", "Tesoreria", "Servicios Jurídicos", "Instituto de la Mujer", "Educación", "Juventud", "DIF", "Jurídico", "Presidencia"]
var dropdown = document.getElementById('categoria');
data.forEach(function (row) {
    var option = document.createElement('option');
    option.value = row;
    option.appendChild(document.createTextNode(row));
    dropdown.appendChild(option);
});

var dropSucesores = document.getElementById('sucesor_de')
fetch("http://127.0.0.1:8080/artefactos/read").then(function (response) {
    return response.json();
}).then(function (data) {
    data.forEach(function (rowData) {
        var option = document.createElement('option') 
        option.value = rowData.id
        option.appendChild(document.createTextNode(rowData.id + ' - ' + rowData.etiqueta))
        dropSucesores.appendChild(option)
    })

}).catch(function (err) {
    console.log(err);
});


//add more rows for each question and answer, won't let you go lower than 1 question and answer
function addRow() {
    var table = document.getElementById('tablaInt');
    var row = document.createElement('tr');
    var cellPregunta = document.createElement('td');
    var cellRespuesta = document.createElement('td');
    // Pregunta
    // HTML: <input class="form-control" type="text" placeholder="pregunta" name="pregunta">
    var pregunta = document.createElement('input');
    pregunta.type = 'text';
    pregunta.name = 'patrones';
    pregunta.className = "form-control";
    pregunta.placeholder = "pregunta";

    // Respuesta
    // HTML: <input class="form-control" type="text" placeholder="respuesta" name="respuesta">
    var respuesta = document.createElement('input');
    respuesta.className = 'form-control';
    respuesta.name = 'respuestas';
    respuesta.type = 'text';
    respuesta.placeholder = 'respuesta';
    cellPregunta.appendChild(pregunta);
    cellRespuesta.appendChild(respuesta);
    row.appendChild(cellPregunta);
    row.appendChild(cellRespuesta)
    table.appendChild(row);
}

function deleteRow() {
    var table = document.getElementById('tablaInt');
    var rowCount = table.rows.length;
    if (rowCount > '1') {
        var row = table.deleteRow(rowCount - 1);
        rowCount--;
    } else {
        alert('No puedes tener menos de una pregunta y respuesta.')
    }
}



function createTable() {
    var catArray = []
    fetch('http://127.0.0.1:8080/artefactos/readCount').then((result) => result.json()).then(function (data) {
        for (i in data) { catArray.push([i, data[i]]) }
        console.log(catArray)
        var table = document.getElementById('table-consultas');
        var tableBody = document.getElementById('table-consultas-body');
        catArray.forEach(function (rowData) {
            var row = document.createElement('tr');
            rowData.forEach(function (cellData, index, array) {
                if (index === array.length - 1) {
                    var cell = document.createElement('td');
                    cell.appendChild(document.createTextNode(cellData));
                    cell.className = 'px-5'

                    //Boton para ver las ramas
                    var buttonCell = document.createElement('td');
                    var button = document.createElement('button')
                    button.type = 'button'
                    button.className = 'btn btn-primary'
                    button.id = array[0]
                    console.log(array[0])
                    button.setAttribute('data-bs-toggle', 'modal')
                    button.setAttribute('data-bs-target', '#modalRamas')
                    button.appendChild(document.createTextNode('Ver Ramas'))
                    //Implements the functions that the button will do after clicked,
                    // in this case, this will hide the aside bar to show all the interactions
                    // on a modal which will retrieve from a query it's required data
                    button.addEventListener('click', function () {
                        console.log(button.id)
                        genrateTreeTable(button.id)

                        hideAside()
                    })
                    buttonCell.appendChild(button);
                    row.appendChild(cell);
                    row.appendChild(buttonCell);
                }
                else {
                    var cell = document.createElement('td');
                    cell.appendChild(document.createTextNode(cellData));
                    cell.className = 'px-5'
                    row.appendChild(cell);
                }


            });
            tableBody.appendChild(row);
        });
        table.appendChild(tableBody);
    })




}

function obtenerRamas() {
    console.log('this should print.')
    url = "http://127.0.0.1:8080/artefactos/read"
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data);
    }).catch(function (err) {
        console.log(err);
    });
}

function genrateTreeTable(id) {
    var data = []
    url = 'http://127.0.0.1:8080/artefactos/readCat/' + id
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (query) {
        //console.log(query);
        query.forEach(function (row) {
            var rowArray = []
            //console.log(row)
            for (var i in row) {
                //console.log(row[i])
                rowArray.push(row[i])
            }
            data.push(rowArray)
        })

        //array is now ordered and ready to be set as a table with the query data

        var ramasTable = document.getElementById('tableRamas-body')
        data.forEach(function (tableRow) {
            var row = document.createElement('tr')
            tableRow.forEach(function (cellData, index, array) {
                //if(cellData == null){cellData = ' '}
                console.log(array[0])
                if(index === 1){
                    if(cellData == 1){
                        cellData = 'Menu'
                    }else if (cellData == 2){
                        cellData = 'Link'
                    }else if(cellData == 3){
                        cellData = 'Respuesta'
                    }
                    console.log(cellData)
                }
                if (index === array.length - 1) {
                    var cell = document.createElement('td');
                    cell.appendChild(document.createTextNode(cellData));
                    cell.className = 'px-5'

                    //Boton para ver las ramas
                    var buttonCell = document.createElement('td');
                    var button = document.createElement('button')
                    button.type = 'button'
                    button.className = 'btn btn-primary'
                    button.id = array[0]
                    button.setAttribute('data-bs-toggle', 'modal')
                    button.setAttribute('data-bs-target', '#modalInteraccion')
                    button.appendChild(document.createTextNode('Editar Rama'))
                    button.addEventListener('click', function () {
                        editArtifact(button.id)
                        hideAside()
                        isCreate = false
                        console.log(isCreate)
                    })
                    buttonCell.appendChild(button);

                    //Delete button
                    var deleteButtonCell = document.createElement('td')
                    var deleteButton = document.createElement('button')

                    deleteButton.type = button
                    deleteButton.className = 'btn btn-danger'
                    deleteButton.id = array[0]
                    deleteButton.appendChild(document.createTextNode('Borrar Campo'))
                    deleteButtonCell.appendChild(deleteButton)
                    deleteButton.addEventListener('click', function () {
                        deleteArtifact(button.id);
                        hideAside();
                    })


                    row.appendChild(cell);
                    row.appendChild(buttonCell);
                    row.appendChild(deleteButtonCell);


                }
                else {
                    var cell = document.createElement('td');
                    cell.appendChild(document.createTextNode(cellData));
                    cell.className = 'px-5'
                    row.appendChild(cell);
                }


            })
            ramasTable.appendChild(row)
        })


    }).catch(function (err) {
        console.log(err)
    })
    //console.log(data)
}

function deleteArtifact(etiqueta) {
    url = 'http://127.0.0.1:8080/artefactos/delete'
    fetch(url, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "etiqueta": etiqueta })
    }).then(raw => raw.json)
        .then(data => console.log(data))

}

function editArtifact(etiqueta) {
    //console.log(etiqueta)
    //<button type="submit" class="btn btn-success" onclick="showAside()" id='guardarCreate'>Guardar</button> 

    url = 'http://127.0.0.1:8080/artefactos/readone/' + etiqueta

    var botonCancelar = document.getElementById('cancelarCreate')
    var btnTransferCancelar = botonCancelar

    var botonCancelarEdit = document.createElement('button')
    botonCancelarEdit.type = 'button'
    botonCancelarEdit.id = 'cancelarEdit'
    botonCancelarEdit.className = 'btn btn-danger'
    botonCancelarEdit.setAttribute('data-bs-dismiss', 'modal')
    botonCancelarEdit.appendChild(document.createTextNode('Cancelar cambios'))
    botonCancelarEdit.addEventListener('click', function () {
        cancelTree()
        cancelCreate()
        cancelEdit(btnTransferCancelar)        
        isCreate = true
        console.log('cancelado el edit iscreate: ' + isCreate)
    })
    botonCancelar.replaceWith(botonCancelarEdit)

    fetch(url).then((result) => result.json())
        .then((data) => {
            var tag = document.getElementById('etiqueta')
            var type = document.getElementById('tipo')
            var cat = document.getElementById('categoria')
            var sucesor = document.getElementById('sucesor_de')
            var link = document.getElementById('link')
            //desabilitar el cambio de nombre de la etiqueta para evitar errores
            tag.disabled = !tag.disabled
            console.log(data.patrones)
            console.log(data.respuestas)
            //adds empty spaces if needed to populate the edit table
            const lenPatrones = data.patrones.length
            const lenRespuestas = data.respuestas.length
            if (lenPatrones != lenRespuestas) {
                const diferencia = Math.max(lenPatrones, lenRespuestas) - Math.min(lenPatrones, lenRespuestas)
                //Patrones array is smaller than respustas
                if (lenPatrones < lenRespuestas) {
                    for (var i = 0; i < diferencia; i++) {
                        data.patrones.push("")
                    }
                    //Respuestas array is smaller
                } else {
                    for (var i = 0; i < diferencia; i++) {
                        data.respuestas.push("")
                    }
                }
            }
            for (var j = 0; j < data.patrones.length; j++) {
                var table = document.getElementById('tablaInt');
                var row = document.createElement('tr');
                var cellPregunta = document.createElement('td');
                var cellRespuesta = document.createElement('td');
                // Pregunta
                // HTML: <input class="form-control" type="text" placeholder="pregunta" name="pregunta">
                var pregunta = document.createElement('input');
                pregunta.type = 'text';
                pregunta.name = 'patrones';
                pregunta.className = "form-control";
                pregunta.placeholder = "pregunta";
                pregunta.value = data.patrones[j]

                // Respuesta
                // HTML: <input class="form-control" type="text" placeholder="respuesta" name="respuesta">
                var respuesta = document.createElement('input');
                respuesta.className = 'form-control';
                respuesta.name = 'respuestas';
                respuesta.type = 'text';
                respuesta.placeholder = 'respuesta';
                respuesta.value = data.respuestas[j]
                cellPregunta.appendChild(pregunta);
                cellRespuesta.appendChild(respuesta);
                row.appendChild(cellPregunta);
                row.appendChild(cellRespuesta)
                table.appendChild(row);
            }


            tag.value = data.etiqueta
            type.value = data.tipo
            cat.value = data.categoria
            sucesor.value = data.sucesor_de
            link.value = data.link
        })
}

function hideAside() {
    var aside = document.getElementById('sidenav-main')
    aside.hidden = true
}

function showAside() {
    var aside = document.getElementById('sidenav-main')
    aside.hidden = false
}

function cancelTree() {
    var ramasTable = document.getElementById('tableRamas-body')
    ramasTable.innerHTML = ''
    showAside()
}

function cancelCreate() {
    var interacciones = document.getElementById("tablaInt")
    interacciones.innerHTML = ''
    showAside()
}

function updateEdit(button1) {
    var tag = document.getElementById('etiqueta')
    tag.disabled = !tag.disabled
    replaceEdittoDefault(button1)


}

function replaceEdittoDefault(buttonCancel) {
    //Get the cancel button to replace it
    var btnCancelarEdit = document.getElementById('cancelarEdit')
    btnCancelarEdit.replaceWith(buttonCancel)



}
function cancelEdit(button1) {
    var tag = document.getElementById('etiqueta')
    tag.disabled = !tag.disabled
    replaceEdittoDefault(button1)
}


function handleSubmit(event) {
    event.preventDefault();
    console.log(event)
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
    value.etiqueta = document.getElementById('etiqueta').value
    if(isCreate){
        console.log('creating')
        postCreate(value)
    }else {
        console.log('updating')
        postUpdate(value)
    }

    




}
 
function postUpdate(value) {
    let url = 'http://127.0.0.1:8080/artefactos/update'
    setTimeout(() => {
        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(value)
        }).then(raw => raw.json)
            .then(data => console.log(data))
    }, 500)
        //Reloads the page so the update on the database will be seen on the artifacts main page
        
        isCreate = true
        setTimeout(() => document.location.reload(), 1000)
}

function postCreate(value) {

    let url = 'http://127.0.0.1:8080/artefactos/create'
    setTimeout(() => {
        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(value)
        }).then(raw => raw.json)
            .then(data => console.log(data))
    }, 500)

    console.log(JSON.stringify(value))

    //Reloads the page so the update on the database will be seen on the artifacts main page
    setTimeout(() => document.location.reload(), 1000)
}

const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit)

createTable()