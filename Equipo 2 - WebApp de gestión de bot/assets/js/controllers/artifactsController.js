// public instance IP: 35.247.112.172
//const database = require('../views/database');


var mysql = require('mysql')

var conexion = mysql.createConnection({
    host: '35.247.112.172',
    database: 'interacciones',
    user: 'root',
});

//QUE DIOS NOS AMPARE PORQUE NO REVISAMOS QUE SE CONECTE PORQUE ROMPE LA APP Y SI LO ACEMOS SE ROMPE ESTA MADRE

//Read
exports.readData = async(req, res)=> {
    // conexion.connect(function(err) {
    //     if (err) throw err;
    //     console.log("Connected!");
    //   });

    conexion.query('select * from interaccion', (err, rows) => {
        if(err) throw err
        console.log('Datos de la tabla:\n ' + rows);
        rows.forEach(function (rowData){
            console.log(rowData)
        })
        console.log('finished searching.')

    })
    // conexion.end()
    res.status(201)
}

//Create
exports.postData = async(req, res)=>{
    var data = req.body

    // conexion.connect(function(err) {
    //     if (err) throw err;
    //     console.log("Connected!");
    //   });

    //Calcula a cual va a ser el id de la interaccion como llave foranea de  patrones y respuestas
    var intRows = 0
    conexion.query('SELECT * FROM interaccion ORDER BY ID DESC LIMIT 1', (err, rows) => {
        if(err) throw err
        intRows = rows[0]['id'] + 1
    })

    //Obtenemos la lista de los patrones ya agregados
    var lstPatrones = []
    conexion.query('SELECT patron FROM patron', (err, rows) => {
        if(err) throw err
        rows.forEach(function (row){
            lstPatrones.push(row["patron"])

        })
    })

    //Permutaciones si tiene link o sucesor_de; los codigos son iguales solo cambia el insert, si se puede mejorar chido sino no
    if(data.hasOwnProperty("link") && data.hasOwnProperty("sucesor_de")) {

        setTimeout(() => {   //Tenemos que esperar a que los otros querys se completen... hay mejores maneras que esperar pero me da igual
            //Revisamos si hay algun otro patron
            let isRepetido = false
            data['patrones'].forEach(function (patron) {
                if(lstPatrones.indexOf(patron) !== -1) isRepetido = true
            })

            //Condicional si esta repetido
            if(!isRepetido){
                conexion.query(`INSERT INTO interaccion (etiqueta, tipo, categoria, sucesor_de, link) VALUES ('${data['etiqueta']}', ${data['tipo']}, '${data['categoria']}', '${data['sucesor_de']}',  '${data['link']}' ); `, function (err, result) {
                    if (err) throw err;
                    console.log("Agregado con exito en interaccion");
                });

                data['patrones'].forEach(function (patron) {
                    conexion.query(`INSERT INTO patron (id_interaccion, patron) VALUES (${intRows}, '${patron}');`, function (err, result) {
                        if (err) throw err;
                        console.log("se agrrgo patron");
                    });
                })


                data['respuestas'].forEach(function (respuesta) {
                    conexion.query(`INSERT INTO respuesta (id_interaccion, respuesta) VALUES (${intRows}, '${respuesta}');`, function (err, result) {
                        if (err) throw err;
                        console.log("se agrrgo respuesta");
                    });
                })
            } else {
                console.log("NO SE PUEDE AGREGAR PORQUE HAY PATRONES REPETIDOS")
                //TODO: alguna excepcion que mande una alerta al front end para que sepa que el patron esta repetido
            }
    

        }, 500);

    } else if (data.hasOwnProperty("link") && !data.hasOwnProperty("sucesor_de")){

        setTimeout(() => {   //Tenemos que esperar a que los otros querys se completen... hay mejores maneras que esperar pero me da igual
            //Revisamos si hay algun otro patron
            let isRepetido = false
            data['patrones'].forEach(function (patron) {
                if(lstPatrones.indexOf(patron) !== -1) isRepetido = true
            })



            //Condicional si esta repetido
            if(!isRepetido){
                conexion.query(`INSERT INTO interaccion (etiqueta, tipo, categoria, link) VALUES ('${data['etiqueta']}', ${data['tipo']}, '${data['categoria']}', '${data['link']}' ); `, function (err, result) {
                    if (err) throw err;
                    console.log("Agregado con exito en interaccion");
                });

                data['patrones'].forEach(function (patron) {
                    conexion.query(`INSERT INTO patron (id_interaccion, patron) VALUES (${intRows}, '${patron}');`, function (err, result) {
                        if (err) throw err;
                        console.log("se agrrgo patron");
                    });
                })


                data['respuestas'].forEach(function (respuesta) {
                    conexion.query(`INSERT INTO respuesta (id_interaccion, respuesta) VALUES (${intRows}, '${respuesta}');`, function (err, result) {
                        if (err) throw err;
                        console.log("se agrrgo respuesta");
                    });
                })
            } else {
                console.log("NO SE PUEDE AGREGAR PORQUE HAY PATRONES REPETIDOS")
                //TODO: alguna excepcion que mande una alerta al front end para que sepa que el patron esta repetido
            }
    

        }, 500);

    } else if (!data.hasOwnProperty("link") && data.hasOwnProperty("sucesor_de")) {

        setTimeout(() => {   //Tenemos que esperar a que los otros querys se completen... hay mejores maneras que esperar pero me da igual
            //Revisamos si hay algun otro patron
            let isRepetido = false
            data['patrones'].forEach(function (patron) {
                if(lstPatrones.indexOf(patron) !== -1) isRepetido = true
            })



            //Condicional si esta repetido
            if(!isRepetido){
                conexion.query(`INSERT INTO interaccion (etiqueta, tipo, categoria, sucesor_de) VALUES ('${data['etiqueta']}', ${data['tipo']}, '${data['categoria']}', '${data['sucesor_de']}' ); `, function (err, result) {
                    if (err) throw err;
                    console.log("Agregado con exito en interaccion");
                });

                data['patrones'].forEach(function (patron) {
                    conexion.query(`INSERT INTO patron (id_interaccion, patron) VALUES (${intRows}, '${patron}');`, function (err, result) {
                        if (err) throw err;
                        console.log("se agrrgo patron");
                    });
                })


                data['respuestas'].forEach(function (respuesta) {
                    conexion.query(`INSERT INTO respuesta (id_interaccion, respuesta) VALUES (${intRows}, '${respuesta}');`, function (err, result) {
                        if (err) throw err;
                        console.log("se agrrgo respuesta");
                    });
                })
            } else {
                console.log("NO SE PUEDE AGREGAR PORQUE HAY PATRONES REPETIDOS")
                //TODO: alguna excepcion que mande una alerta al front end para que sepa que el patron esta repetido
            }
    

        }, 500);

    } else {
    
        setTimeout(() => {   //Tenemos que esperar a que los otros querys se completen... hay mejores maneras que esperar pero me da igual
            //Revisamos si hay algun otro patron
            let isRepetido = false
            data['patrones'].forEach(function (patron) {
                if(lstPatrones.indexOf(patron) !== -1) isRepetido = true
            })


            //Condicional si esta repetido
            if(!isRepetido){
                conexion.query(`INSERT INTO interaccion (etiqueta, tipo, categoria) VALUES ('${data['etiqueta']}', ${data['tipo']}, '${data['categoria']}' ); `, function (err, result) {
                    if (err) throw err;
                    console.log("Agregado con exito en interaccion");
                });

                data['patrones'].forEach(function (patron) {
                    conexion.query(`INSERT INTO patron (id_interaccion, patron) VALUES (${intRows}, '${patron}');`, function (err, result) {
                        if (err) throw err;
                        console.log("se agrrgo patron");
                    });
                })


                data['respuestas'].forEach(function (respuesta) {
                    conexion.query(`INSERT INTO respuesta (id_interaccion, respuesta) VALUES (${intRows}, '${respuesta}');`, function (err, result) {
                        if (err) throw err;
                        console.log("se agrrgo respuesta");
                    });
                })
            } else {
                console.log("NO SE PUEDE AGREGAR PORQUE HAY PATRONES REPETIDOS")
                //TODO: alguna excepcion que mande una alerta al front end para que sepa que el patron esta repetido
            }
    

        }, 500);
    }


    res.send("recibi el json")
    res.status(201)
    

}
//Update

exports.postUpdate = async(req, res)=>{

}
//Delete
exports.deleteData = async(req,res)=> {

}