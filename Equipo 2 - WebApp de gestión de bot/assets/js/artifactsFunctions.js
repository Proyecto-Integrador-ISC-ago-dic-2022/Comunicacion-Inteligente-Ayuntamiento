var tableData = [['SAPASA', 1538], ["Obras Públicas", 605], ['Tránsito', 4028], ['DIF', 2672]];


//dropdown menu data and creation
var data = ["Soporte", "Innovacion", "Obras públicas", "Servicios Públicos", "SAPASA", "Seguridad Pública", "Desarrollo Urbano", "Contraloría Municipal", "Protección Civil", "Normatividad", "Subdirección de Tránsito", "Desarrollo Social", "Desarrollo Económico", "Derechos Humanos", "Seguridad Pública y Tránsito", "Secretaría General", "Tesoreria", "Servicios Jurídicos", "Instituto de la Mujer", "Educación", "Juventud", "DIF", "Jurídico", "Presidencia"]
var dropdown = document.getElementById('categoria');
data.forEach(function (row) {
    var option = document.createElement('option');
    option.value = row;
    option.appendChild(document.createTextNode(row));
    dropdown.appendChild(option);
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



function createTable(data) {
    fetch('127.0.0.1:8080/artefactos').then
    var table = document.getElementById('table-consultas');
    var tableBody = document.getElementById('table-consultas-body');
    data.forEach(function (rowData) {
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

                button.addEventListener('click', function(){
                    genrateTreeTable()
                    
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

function genrateTreeTable() {
    var data = []
    fetch('http://127.0.0.1:8080/artefactos/read').then(function (response) {
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
                if (index === array.length - 1) {
                    var cell = document.createElement('td');
                    cell.appendChild(document.createTextNode(cellData));
                    cell.className = 'px-5'

                    //Boton para ver las ramas
                    var buttonCell = document.createElement('td');
                    var button = document.createElement('button')
                    button.type = 'button'
                    button.className = 'btn btn-primary'
                    button.id = array[1]
                    button.setAttribute('data-bs-toggle', 'modal')
                    button.setAttribute('data-bs-target', '#modalInteraccion')
                    button.appendChild(document.createTextNode('Editar Rama'))
                    button.addEventListener('click', function(){
                        editArtifact(button.id)
                        hideAside()
                    })
                    buttonCell.appendChild(button);
                    
                    //Delete button
                    var deleteButtonCell = document.createElement('td')
                    var deleteButton = document.createElement('button')

                    deleteButton.type = button
                    deleteButton.className = 'btn btn-danger'
                    deleteButton.id = array[1]
                    deleteButton.onclick = deleteArtifact
                    deleteButton.appendChild(document.createTextNode('Borrar Campo'))
                    deleteButtonCell.appendChild(deleteButton)
                    

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

function deleteArtifact(){
    console.log('boooooooo')
}

function editArtifact(etiqueta){
    //console.log(etiqueta)
    url = 'http://127.0.0.1:8080/artefactos/readone/' + etiqueta
    console.log(url)
    fetch(url).then((result) => result.json())
    .then((data) => {
        var tag = document.getElementById('etiqueta')
        var type = document.getElementById('tipo')
        var cat = document.getElementById('categoria')
        var sucesor = document.getElementById('sucesor_de')
        var link = document.getElementById('link')
        console.log(data.patrones)
        console.log(data.respuesta)
        tag.value = data.etiqueta
        type.value = data.tipo
        cat.value = data.categoria
        sucesor.value = data.sucesor_de
        link.value = data.link
    })
}

function hideAside(){
    var aside = document.getElementById('sidenav-main')
    aside.hidden = true
}

function showAside(){
    var aside = document.getElementById('sidenav-main')
    aside.hidden = false
}

createTable(tableData)