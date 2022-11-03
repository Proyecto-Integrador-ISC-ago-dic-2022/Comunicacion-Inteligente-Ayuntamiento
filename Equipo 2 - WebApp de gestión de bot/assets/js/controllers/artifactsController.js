// public instance IP: 35.247.112.172
//const database = require('../views/database');


var mysql = require('mysql')

var conexion = mysql.createConnection({
    host: '35.247.112.172',
    database: 'interacciones',
    user: 'root',
});


conexion.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });


//Read
exports.readData = async(req, res)=> {
    conexion.query('select * from interaccion', (err, rows) => {
        if(err) throw err
        console.log('Datos de la tabla:\n ' + rows);
        rows.forEach(function (rowData){
            console.log(rowData)
        })
        console.log('finished searching.')

    })
    conexion.end()
    res.status(201)
}

//Create
exports.postData = async(req, res)=>{
    //TODO: manera de recoger datos del frontend return lo siguiente:
    console.log("aqui estoy ")
    var interaccion = req.body
    console.log(interaccion)
    //res.send("recibi el json")
    //res.status(201)
    res.json({"asdasdasd": 'hola'})

    //create database field

    //Checa si se va a agregar link

}
//Update
exports.postUpdate = async(req, res)=>{

}
//Delete
exports.deleteData = async(req,res)=> {

}