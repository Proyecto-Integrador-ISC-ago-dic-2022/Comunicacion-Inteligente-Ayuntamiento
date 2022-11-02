
var mysql = require('mysql');

const config = {
  database: 'interacciones',
  username: 'root',
  password: '',
  host: '35.247.112.172',
  //port: '5001',
  dialect: 'mysql'
}

var connection = mysql.createConnection({
  host: config.host,
  user: config.username,
  password: config.password,
  database: config.database
})

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql_insert = `insert into interacciones (id, etiqueta, tipo, categoria, preguntas, respuestas, sucesor_de, link)
                    values (37, "hoja33", "link", "cat6", '[{"pregunta1":"Fernando Palomo", "pregunta2":"Andres Agulla"}]', '[{"respuesta":"Amigos del Futbol"}]', 5, "https://www.youtube.com/watch?v=ZBOPMHzqZ78&ab_channel=AmigosdelF%C3%BAtbol");`
  connection.query(sql_insert, function(err, result){
    if(err) throw err;
    console.log(result)
  });
  var sql_get = "select * from interacciones"
  connection.query(sql_get, function(err, result){
    if(err) throw err;
    console.log(result)
  });
});



