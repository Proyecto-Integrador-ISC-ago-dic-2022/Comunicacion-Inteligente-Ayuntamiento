const express = require('express')
const path = require("path");
const app = express()
const routeArtifacts = require('./routes/artifactsRoutes')
var mysql = require('mysql')
const cors = require('cors')

/*app.use((req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    next()
})*/
app.use(express.static(path.join(__dirname, 'Backend')))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.use('/artefactos', routeArtifacts)


// var conexion = mysql.createConnection({
//     host: '35.247.112.172',
//     database: 'interacciones',
//     user: 'root',
// });

// conexion.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//   });

app.listen(8080, ()=>{
    console.log('Backend ONline on port 8080')
})