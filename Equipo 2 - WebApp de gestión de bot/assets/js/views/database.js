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