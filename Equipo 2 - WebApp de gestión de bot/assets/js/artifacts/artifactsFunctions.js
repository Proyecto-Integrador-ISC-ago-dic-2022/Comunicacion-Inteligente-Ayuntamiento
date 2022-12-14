//dropdown menu data and creation

var isCreate = true
var isPatron = true
var data = ["Conversación", "Soporte", "Innovación", "Obras públicas", "Servicios Públicos", "SAPASA", "Seguridad Pública", "Desarrollo Urbano", "Contraloría Municipal", "Protección Civil", "Normatividad", "Subdirección de Tránsito", "Desarrollo Social", "Desarrollo Económico", "Derechos Humanos", "Seguridad Pública y Tránsito", "Secretaría General", "Tesorería", "Servicios Jurídicos", "Instituto de la Mujer", "Educación", "Juventud", "DIF", "Jurídico", "Presidencia"]
var dropdown = document.getElementById('categoria');
data.forEach(function (row) {
    var option = document.createElement('option');
    option.value = row;
    option.appendChild(document.createTextNode(row));
    dropdown.appendChild(option);
});

//add more rows for each question and answer, won't let you go lower than 1 question and answer
function manageRows(tableId, inputName, inputPlaceholder, inputValue) {
    var table = document.getElementById(tableId);
    var row = document.createElement('tr');
    var cell = document.createElement('td');
    var buttonCell = document.createElement('td')
    buttonCell.className = 'text-center my-3'
    // Elemento generado
    // HTML: <input class="form-control" type="text" placeholder="pregunta" name="pregunta">
    if(isPatron){
        var entrada = document.createElement('input')
    }else{
        var entrada = document.createElement('textarea')
        entrada.rows = '4'
        isPatron = true
    }
    if (inputValue != '') {
        entrada.value = inputValue
    }
    entrada.type = 'text';
    entrada.name = inputName;
    entrada.className = "form-control";
    entrada.placeholder = inputPlaceholder;
    var btnDelete = document.createElement('button');
    btnDelete.type = 'button'
    btnDelete.className = 'btn btn-danger visible'
    btnDelete.appendChild(document.createTextNode('Borrar'))
    btnDelete.addEventListener('click', function () {
        var table = document.getElementById(tableId);
        var rowCount = table.rows.length;
        if (rowCount > '1') {
            var td = event.target.parentNode
            var tr = td.parentNode
            tr.parentNode.removeChild(tr)
        } else {
            var alert = createAlert(('Se tiene que registrar una ' + inputPlaceholder), 'warning')
            var preguntasRespuestas = document.getElementById('preguntasRespuestas')
            preguntasRespuestas.prepend(alert)

        }

    })

    buttonCell.appendChild(btnDelete);

    cell.appendChild(entrada);
    row.appendChild(cell);
    row.appendChild(buttonCell);
    table.appendChild(row);
}

//DEPRECATED, we found a better way to delete rows and more user friendly
function deleteRow(tableId) {
    var table = document.getElementById(tableId);
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
                    button.setAttribute('data-bs-toggle', 'modal')
                    button.setAttribute('data-bs-target', '#modalRamas')
                    button.appendChild(document.createTextNode('Ver Ramas'))
                    //Implements the functions that the button will do after clicked,
                    // in this case, this will hide the aside bar to show all the interactions
                    // on a modal which will retrieve from a query it's required data
                    button.addEventListener('click', function () {
                        generateTreeTable(button.id)

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

function generateTreeTable(id) {
    var data = []
    url = 'http://127.0.0.1:8080/artefactos/readCat/' + id
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (query) {
        query.forEach(function (row) {
            var rowArray = []
            for (var i in row) {
                rowArray.push(row[i])
            }
            data.push(rowArray)
        })

        //array is now ordered and ready to be set as a table with the query data

        var ramasTable = document.getElementById('tableRamas-body')
        data.forEach(function (tableRow) {
            var row = document.createElement('tr')
            tableRow.forEach(function (cellData, index, array) {
                if (index === 1) {
                    if (cellData == 1) {
                        cellData = 'Respuesta'
                    } else if (cellData == 2) {
                        cellData = 'Menu'
                    } else if (cellData == 3) {
                        cellData = 'Link'
                    }
                }
                if (index === array.length - 1) {
                    var cell = document.createElement('td');
                    cell.appendChild(document.createTextNode(cellData));

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
                        var dropSucesores = document.getElementById('sucesor_de')
                        dropSucesores.innerHTML = '<option value="0">Ninguno</option>'
                        fetch("http://127.0.0.1:8080/artefactos/read").then(function (response) {
                            return response.json();
                        }).then(function (data) {
                            data.forEach(function (rowData) {
                                if (button.id == rowData.etiqueta) {

                                } else {
                                    var option = document.createElement('option')
                                    option.value = rowData.id
                                    option.appendChild(document.createTextNode(rowData.id + ' - ' + rowData.etiqueta))
                                    dropSucesores.appendChild(option)
                                }

                            })

                        }).catch(function (err) {
                            console.log(err);
                        });
                        editArtifact(button.id)
                        hideAside()
                        isCreate = false
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
                    row.appendChild(cell);
                }


            })
            ramasTable.appendChild(row)
        })


    }).catch(function (err) {
        console.log(err)
    })
}

function deleteArtifact(etiqueta) {
    url = 'http://127.0.0.1:8080/artefactos/delete'
    fetch(url, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "etiqueta": etiqueta })
    }).then(raw => raw.json())
        .then(data => console.log(data))

    setTimeout(() => {
        document.location.reload()
    }, 1000)

}

function editArtifact(etiqueta) {
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
        document.getElementById('etiqueta').value = ''
        document.getElementById('sucesor_de').value = 0
        document.getElementById('link').value = 1

        closeCatModal()
        cancelCreate()
        cancelEdit(btnTransferCancelar)
        isCreate = true
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

            var patrones = document.getElementById('tablaPat-body')
            var respuestas = document.getElementById('tablaRes-body')

            for (var j = 0; j < data.patrones.length; j++) {
                manageRows('tablaPat-body', 'patrones', '¿Qué mensaje quieres?', data.patrones[j])
            }
            for (var k = 0; k < data.respuestas.length; k++) {
                isPatron = false
                manageRows('tablaRes-body', 'respuestas', '¿Qué respuesta quieres?', data.respuestas[k])
            }

            if (data.tipo == 3) {
                document.getElementById('linkInput').style.visibility = 'visible'

            }
            else {
                document.getElementById('linkInput').style.visibility = 'hidden'
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

function closeCatModal() {
    var ramasTable = document.getElementById('tableRamas-body')
    ramasTable.innerHTML = ''
    showAside()
}

function cancelCreate() {
    var patrones = document.getElementById('tablaPat-body')
    var respuesta = document.getElementById('tablaRes-body')
    patrones.innerHTML = ''
    respuesta.innerHTML = ''
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
    const data = new FormData(event.target);
    const value = Object.fromEntries(data.entries());
    if (document.getElementById('tipo').value == 3) {
        value.link = document.getElementById('link').value
        console.log(document.getElementById('link').value)
    } else {
    }

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
    //Check constraints, first: the tag shouldn't be empty, 
    //                   second, there must be at least one question AND one answer
    if (value.etiqueta != '') {
        if (value.patrones.length < 1 || value.respuestas.length < 1) {
            var alert = createAlert('Debes subir al menos una pregunta y una respuesta', 'warning')
            modal = document.getElementById('modalInt-footer')
            modal.appendChild(alert)
        } else {
            console.log(value)
            if (isCreate) {
                postCreate(value)
            } else {
                postUpdate(value)
            }
        }

    } else {
        var alert = createAlert('La etiqueta no puede estar vacia', 'warning');
        modal = document.getElementById('modalInt-footer')
        modal.appendChild(alert)
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
    showAside()
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
        }).then(function (raw) {
            console.log(raw.status)
            if (raw.status == 200) {
                var alert = createAlert('Elemento creado exitosamente, recargando página', 'success');
                modal = document.getElementById('modalInt-footer')
                modal.appendChild(alert)
                showAside()
                setTimeout(() => document.location.reload(), 5000)
            } else {
                switch (raw.status) {
                    case 441:
                        var alert = createAlert('ERROR: La etiqueta ya existe.', 'danger')
                        modal = document.getElementById('modalInt-footer')
                        modal.appendChild(alert)
                        break
                    case 440:
                        var alert = createAlert('ERROR: Ya existe un patron que intentas agregar.', 'danger')
                        modal = document.getElementById('modalInt-footer')
                        modal.appendChild(alert)
                        break
                    default: 
                        console.log('No error status received, this should never happen.');
                        break
                }
                console.log(raw.body)
                console.log(raw.json())

            }
        })
            .then(data => console.log(data))
    }, 500)
}

const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit)

createTable()