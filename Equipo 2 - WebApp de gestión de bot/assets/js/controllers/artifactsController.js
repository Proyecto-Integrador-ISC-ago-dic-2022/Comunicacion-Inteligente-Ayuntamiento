// public instance IP: 35.247.112.172

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

//const lstCat = ["Soporte", "Innovacion", "Obras públicas", "Servicios Públicos", "SAPASA", "Seguridad Pública", "Desarrollo Urbano", "Contraloría Municipal", "Protección Civil", "Normatividad", "Subdirección de Tránsito", "Desarrollo Social", "Desarrollo Económico", "Derechos Humanos", "Seguridad Pública y Tránsito", "Secretaría General", "Tesoreria", "Servicios Jurídicos", "Instituto de la Mujer", "Educación", "Juventud", "DIF", "Jurídico", "Presidencia"]

function recursiveTree(array) {
    function getChildren(parents, input) {
      return parents.map((parent) => {
        const children = input.filter((x) => x.sucesor_de === parent.id);// agarra todos sus relacionados
        parent.children = children;
        if (children.length == 0) {

          return parent;
        } else {
          parent.children = getChildren(children, input);
          return parent;
        }
      });
    }

    const roots = array.filter((x) => x.sucesor_de == 0);

    return getChildren(roots, array);
  }

function recTree(array){
    function getChildren(parents, db, lst) {

        parents.forEach(function (dad) {


            const children = db.filter((x) => x.sucesor_de === dad.id)

            if(children.length == 0){  
                console.log('------hoja:'+ dad.id)
              
                lst.push(dad)

            } else {
                children.map((inter) =>{
                    inter['nivel']++
                })

                getChildren(children, db, dad.children)
                lst.push(dad)
                console.log('------rama:'+ dad.id)

            }

        })

    }

    const heads = array.filter((x) => x.sucesor_de === 0);
    var lstRet = []
    getChildren(heads, array, lstRet)
    return lstRet
}

exports.readForAI = async(req, res)=> {

    var allDB = []


    conexion.query('SELECT * from interaccion', (err, rows) => {
        if(err) throw err



        rows.forEach(function (row) {

            var interaccion = new Object()
            var intId = 0

            interaccion.id = row["id"]

            interaccion.etiqueta = row["etiqueta"]
            interaccion.tipo = row["tipo"]
            interaccion.categoria= row["categoria"]
            interaccion.link = row["link"]
            interaccion.sucesor_de = row["sucesor_de"]
            interaccion.nivel = 0
            interaccion.children = []

            var patrones = []
            var respuestas = []

            conexion.query(`select patron FROM patron WHERE id_interaccion= '${interaccion.id}' `, (err, rows) => {
                if(err) throw reject(err)

                rows.forEach(function (row) {
                    patrones.push(row["patron"])
                })
            })

            conexion.query(`select respuesta FROM respuesta WHERE id_interaccion= '${interaccion.id}' `, (err, rows) => {
                if(err) reject(err)

                rows.forEach(function (row) {
                    respuestas.push(row["respuesta"])
                })
            })


            interaccion.patrones = patrones
            interaccion.respuestas = respuestas

            setTimeout(() => {
                allDB.push(interaccion)
            },500)


        })

        setTimeout(() => {
          res.send(JSON.stringify(recTree(allDB)))
        },2500)



    })
}




//Read
exports.readCount = async(req, res)=> {
    conexion.query('SELECT categoria, COUNT(id) AS total FROM interaccion GROUP BY categoria', (err, rows) => {
        if(err) throw err
        var diccs = {}

        rows.forEach(function (row) {
            diccs[row['categoria']] = row['total']

        })
        res.send(JSON.stringify(diccs))
    })

}

exports.readTest = async(req, res)=> {

    conexion.query('SELECT * from interaccion', (err, rows) => {
        if(err) throw err
        res.send(JSON.stringify(rows))
    })
}



exports.readData = async(req, res)=> {
    var data = req.params["categ"]

    conexion.query(`SELECT etiqueta, tipo, sucesor_de, link FROM interaccion WHERE categoria= '${data}'`, (err, rows) => {
        if(err) throw err
        res.send(JSON.stringify(rows))
    })

}



function getOneInter(data) {
    var interaccion = new Object()
    var intId = 0

    return new Promise((resolve, reject) => {
        conexion.query(`select * FROM interaccion WHERE etiqueta= '${data}' `, (err, row) => {
            if(err) treject(err)

            intId = row[0]["id"]
            interaccion.id = row[0]["id"]

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
                if(err) throw reject(err)

                rows.forEach(function (row) {
                    patrones.push(row["patron"])
                })
            })

            conexion.query(`select respuesta FROM respuesta WHERE id_interaccion= '${intId}' `, (err, rows) => {
                if(err) reject(err)

                rows.forEach(function (row) {
                    respuestas.push(row["respuesta"])
                })
            })


            interaccion.patrones = patrones
            interaccion.respuestas = respuestas

            setTimeout(() => {
                resolve(interaccion)
            },500)

        }, 500)
    })

}


//Read solo 1 interaccion, tomamos la etiqueta del url
exports.readOneData = async(req, res) => {

    var data = req.params["etiq"]


    const rets = await getOneInter(data)

    delete rets.id
    var retJson = JSON.stringify(rets)
    res.send(retJson)




}

function addPreguntasRespuestas(patrones, respuestas){

    //Calcula a cual va a ser el id de la interaccion como llave foranea de  patrones y respuestas
    var intRows = 0
    conexion.query('SELECT * FROM interaccion ORDER BY ID DESC LIMIT 1', (err, rows) => {
        if(err) throw err
        intRows = rows[0]['id']
    })


    setTimeout(() => {
        patrones.forEach(function (patron) {
            conexion.query(`INSERT INTO patron (id_interaccion, patron) VALUES (${intRows}, '${patron}');`, function (err, result) {
                if (err) throw err;
                console.log("se agrego patron");
            });
        })


        respuestas.forEach(function (respuesta) {
            conexion.query(`INSERT INTO respuesta (id_interaccion, respuesta) VALUES (${intRows}, '${respuesta}');`, function (err, result) {
                if (err) throw err;
                console.log("se agrego respuesta");
            });
        })
    }, 500)
}


//Create
exports.postData = async(req, res)=>{
    var data = req.body

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

        setTimeout(() => {

            var isRepetido = false
            data['patrones'].forEach(function (patron) {
                if(lstPatrones.indexOf(patron) !== -1) isRepetido = true
            })

            //Condicional si esta repetido
            if(!isRepetido){
                conexion.query(`INSERT INTO interaccion (etiqueta, tipo, categoria, sucesor_de, link) VALUES ('${data['etiqueta']}', ${data['tipo']}, '${data['categoria']}', '${data['sucesor_de']}',  '${data['link']}' ); `, function (err, result) {
                    if (err) throw err;
                    console.log("Agregado con exito en interaccion");
                });


                setTimeout(() => {
                    addPreguntasRespuestas(data['patrones'], data['respuestas'])
                }, 500)

            } else {
                console.log("NO SE PUEDE AGREGAR PORQUE HAY PATRONES REPETIDOS")
                //TODO: alguna excepcion que mande una alerta al front end para que sepa que el patron esta repetido
            }

        }, 500);

    } else if (data.hasOwnProperty("link") && !data.hasOwnProperty("sucesor_de")){
        setTimeout(() => {

            var isRepetido = false
            data['patrones'].forEach(function (patron) {
                if(lstPatrones.indexOf(patron) !== -1) isRepetido = true
            })

            //Condicional si esta repetido
            if(!isRepetido){
                conexion.query(`INSERT INTO interaccion (etiqueta, tipo, categoria, link) VALUES ('${data['etiqueta']}', ${data['tipo']}, '${data['categoria']}', '${data['link']}' ); `, function (err, result) {
                    if (err) throw err;
                    console.log("Agregado con exito en interaccion");
                });



                setTimeout(() => {
                    addPreguntasRespuestas(data['patrones'], data['respuestas'])
                }, 500)

            } else {
                console.log("NO SE PUEDE AGREGAR PORQUE HAY PATRONES REPETIDOS")
                //TODO: alguna excepcion que mande una alerta al front end para que sepa que el patron esta repetido
            }

        }, 500);

    } else if (!data.hasOwnProperty("link") && data.hasOwnProperty("sucesor_de")) {
        setTimeout(() => {

            var isRepetido = false
            data['patrones'].forEach(function (patron) {
                if(lstPatrones.indexOf(patron) !== -1) isRepetido = true
            })

            //Condicional si esta repetido
            if(!isRepetido){

                conexion.query(`INSERT INTO interaccion (etiqueta, tipo, categoria, sucesor_de) VALUES ('${data['etiqueta']}', ${data['tipo']}, '${data['categoria']}', '${data['sucesor_de']}' ); `, function (err, result) {
                    if (err) throw err;
                    console.log("Agregado con exito en interaccion");
                });

                setTimeout(() => {
                    addPreguntasRespuestas(data['patrones'], data['respuestas'])
                }, 500)

            } else {
                console.log("NO SE PUEDE AGREGAR PORQUE HAY PATRONES REPETIDOS")
                //TODO: alguna excepcion que mande una alerta al front end para que sepa que el patron esta repetido
            }

        }, 500);

    } else {
        setTimeout(() => {

            var isRepetido = false
            data['patrones'].forEach(function (patron) {
                if(lstPatrones.indexOf(patron) !== -1) isRepetido = true
            })

            //Condicional si esta repetido
            if(!isRepetido){
                conexion.query(`INSERT INTO interaccion (etiqueta, tipo, categoria) VALUES ('${data['etiqueta']}', ${data['tipo']}, '${data['categoria']}' ); `, function (err, result) {
                    if (err) throw err;
                    console.log("Agregado con exito en interaccion");
                });

                setTimeout(() => {
                    addPreguntasRespuestas(data['patrones'], data['respuestas'])
                }, 500)

            } else {
                console.log("NO SE PUEDE AGREGAR PORQUE HAY PATRONES REPETIDOS")
                //TODO: alguna excepcion que mande una alerta al front end para que sepa que el patron esta repetido
            }

        }, 500);
    }


    res.send("Agregado todo exitosamente")
    res.status(201)

}

//Update
exports.postUpdate = async(req, res)=>{
    this.deleteData(req, res)
    this.postData(req, res)
    res.status(201)
}

//Delete
//ES BUENA PRACTICA HACER UN FAKEDELETE PERO ME VALE
exports.deleteData = async(req,res)=> {
    var data = req.body

    conexion.query(`DELETE FROM interaccion WHERE etiqueta= '${data['etiqueta']}' `, (err) => {
        if(err) throw err
    })

    res.status(201)
    //res.send("Se borro con exito")

}