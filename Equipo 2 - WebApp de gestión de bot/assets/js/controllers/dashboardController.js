var mysql = require('mysql')

var conexion = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    database: 'chatbot',
    user: 'root',
    password: 'admin'
});

conexion.connect((err)=>{
    if(err){
        console.log('Error en la conexion' + err);
        throw err;
        
    } else {
        console.log('Conexion exitosa')
    }
})

conexion.query('select * from reportes', (err, rows) => {
    if(err) throw err
    console.log('Datos de la tabla:\n ' + rows);

})

conexion.end