// public instance IP: 35.247.112.172
//const database = require('../views/database');

/*
El formato de los json son asi, link y sucesor de son opcionales
{
    "etiqueta": "test", |string
    "tipo": 1, |int
    "categoria": "sapasa",|
    "patrones": ["ghfjgh", "ewtdfgcfgb", "ertyfghbcvgbn"],| array
    "respuestas": ["lorem", "ipsum"],| array
    "link":"www.quierountamal.com",| string
    "sucesor_de": 2| int
}
*/

    // Lista de categorias: ["Soporte", "Innovacion", "Obras públicas", "Servicios Públicos", "SAPASA", "Seguridad Pública", "Desarrollo Urbano", "Contraloría Municipal", "Protección Civil", "Normatividad", "Subdirección de Tránsito", "Desarrollo Social", "Desarrollo Económico", "Derechos Humanos", "Seguridad Pública y Tránsito", "Secretaría General", "Tesoreria", "Servicios Jurídicos", "Instituto de la Mujer", "Educación", "Juventud", "DIF", "Jurídico", "Presidencia"]
        


var mysql = require('mysql')

var conexion = mysql.createConnection({
    host: '35.247.112.172',
    database: 'interacciones',
    user: 'root',
});

    // conexion.connect(function(err) {
    //     if (err) throw err;
    //     console.log("Connected!");
    //   });

//QUE DIOS NOS AMPARE PORQUE NO REVISAMOS QUE SE CONECTE PORQUE ROMPE LA APP Y SI LO ACEMOS SE ROMPE ESTA MADRE

//Read
exports.readData = async(req, res)=> {
    conexion.query('select * from interaccion', (err, rows) => {
        if(err) throw err
        
        rows.forEach(function (rowData){
            console.log(JSON.stringify(rowData))
        })
        console.log('finished searching.')
        console.log('rows: \n', JSON.stringify(rows))
        res.send(JSON.stringify(rows))

    })
    // conexion.end()
}
//Read solo 1 interaccion, tomamos la etiqueta del url
exports.readOneData = async(req, res) => {

    var data = req.params["etiq"]

    var interaccion = new Object()

    var intId = 0

   

    conexion.query(`select * FROM interaccion WHERE etiqueta= '${data}' `, (err, row) => {
        if(err) throw err
        console.log(data)

        intId = row[0]["id"]
        interaccion.etiqueta = row[0]["etiqueta"]
        interaccion.tipo = row[0]["tipo"]
        interaccion.categoria= row[0]["categoria"]
        if (!row["link"]) interaccion.link = row[0]["link"]
        if (!row["sucesor_de"]) interaccion.sucesor_de = row[0]["sucesor_de"]
    })

    


    setTimeout(() => { 
        var patrones = []
        var respuestas = []
        conexion.query(`select patron FROM patron WHERE id_interaccion= '${intId}' `, (err, rows) => {
            if(err) throw err
            console.log()

            rows.forEach(function (row) {
                
                patrones.push(row["patron"])
            })
        })

        conexion.query(`select respuesta FROM respuesta WHERE id_interaccion= '${intId}' `, (err, rows) => {
            if(err) throw err

            rows.forEach(function (row) {
                respuestas.push(row["respuesta"])
            })
        })


        interaccion.patrones = patrones 
        interaccion.respuestas = respuestas



        setTimeout(() => { 
   

            var retJson = JSON.stringify(interaccion)
            res.send(retJson)
        },500)

    }, 200)



}

//Create
//FIXIT: si borran el ultimo elemento es posible que se rompa la base de datos... NMMS ARREGLAR ESTO PUEDE SER UN PEDO...
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
    //TODO: atrapar la excepcion si una etiqueta no es unica (evitar que el progreso del modal desaparezca si se puede); porque no lo hice con los patrones... no se pero ya lo hice joder
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
//ES BUENA PRACTICA HACER UN FAKEDELETE PERO ME VALE
exports.deleteData = async(req,res)=> {
    var data = req.body

    conexion.query(`DELETE FROM interaccion WHERE etiqueta= '${data['etiqueta']}' `, (err) => {
        if(err) throw err
    })

    res.send("borrando")

}