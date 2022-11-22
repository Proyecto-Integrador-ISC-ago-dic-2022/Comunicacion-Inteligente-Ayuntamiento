var btnPat = document.getElementById('btnNewPat');
var btnRes = document.getElementById('btnNewRes');
var btnDeletePat = document.getElementById('btnDelPat');
var btnDeleteRes = document.getElementById('btnDelRes');
var btnNewInt = document.getElementById('btnNewInt');
var btnUpdate = document.getElementById('btnUpdate');
var dropdownTipos = document.getElementById('tipo');
dropdownTipos.addEventListener('change', function(){
    if(dropdownTipos.value == 3){
        document.getElementById('linkInput').style.visibility = 'visible'

    }else{
        document.getElementById('linkInput').style.visibility = 'hidden'

    }
})

btnNewInt.addEventListener('click', function () {
    var dropSucesores = document.getElementById('sucesor_de')
    dropSucesores.innerHTML = '<option value="0">Ninguno</option>'
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
})


btnPat.addEventListener('click', function () {
    addRow('tablaPat-body', 'patrones', 'pregunta', '')
})
btnRes.addEventListener('click', function () {
    addRow('tablaRes-body', 'respuestas', 'respuesta', '')
})
btnUpdate.addEventListener('click', function () {
    hideAside()
    updateAI()

})