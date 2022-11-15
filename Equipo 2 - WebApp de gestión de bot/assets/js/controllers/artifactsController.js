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

//ESTA FUNCION SE USA PARA PROBAR LA CONEXION CON LA BASE DE DATOS
/*
conexion.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
*/

//QUE DIOS NOS AMPARE PORQUE NO REVISAMOS QUE SE CONECTE PORQUE ROMPE LA APP Y SI LO ACEMOS SE ROMPE ESTA MADRE

//ESTE SE USA PARA AGREGAR LAS CATEGORIAS, SOLO DEBERIA UTILIZARSE UNA VEZ
/*
const lstCat = ["Soporte", "Innovacion", "Obras públicas", "Servicios Públicos", "SAPASA", "Seguridad Pública", "Desarrollo Urbano", "Contraloría Municipal", "Protección Civil", "Normatividad", "Subdirección de Tránsito", "Desarrollo Social", "Desarrollo Económico", "Derechos Humanos", "Seguridad Pública y Tránsito", "Secretaría General", "Tesoreria", "Servicios Jurídicos", "Instituto de la Mujer", "Educación", "Juventud", "DIF", "Jurídico", "Presidencia"]

exports.temAddCategories = async (req, res) => {
    lstCat.forEach(function (cat) {
        conexion.query(`INSERT INTO categoria (categoria) VALUES ('${cat}');`, function (err, result) {
            if (err) throw err
        })
    })

    res.status(201)
}
*/

function recTree(array) {
    function getChildren(parents, db, lst) {

        parents.forEach(function (dad) {


            const children = db.filter((x) => x.sucesor_de === dad.id)

            if (children.length == 0) {
                lst.push(dad)

            } else {
                children.map((inter) => {
                    inter['nivel']++
                })

                getChildren(children, db, dad.children)
                lst.push(dad)

            }

        })

    }

    const heads = array.filter((x) => x.sucesor_de === 0);
    var lstRet = []
    getChildren(heads, array, lstRet)
    return lstRet
}

exports.readForAI = async (req, res) => {

    const sql = 'SELECT * FROM interaccion WHERE categoria IN (SELECT categoria FROM categoria WHERE isOn = true)'

    function getInts() {
        var allDB = []
        return new Promise((resolve, reject) => {
            conexion.query(sql, (err, rows) => {
                if (err) throw err
        
                rows.forEach(function (row) {
        
                    var interaccion = new Object()
                    var intId = 0
        
                    interaccion.id = row["id"]
        
                    interaccion.etiqueta = row["etiqueta"]
                    interaccion.tipo = row["tipo"]
                    interaccion.categoria = row["categoria"]
                    interaccion.link = row["link"]
                    interaccion.sucesor_de = row["sucesor_de"]
                    interaccion.nivel = 0
                    interaccion.children = []
    
                    allDB.push(interaccion)
    
                })

                resolve(allDB)
            })
        })
        


    }

    function getPatResp(db) {
        return new Promise((resolve, reject) => {
            conexion.query(`select patron, id_interaccion FROM patron`, (err, patrones) => {
                if (err) throw reject(err)
    
    
                db.forEach(function (inte) {
                    inte.patrones = []
                    patrones.forEach(function (p) {
                        if (p['id_interaccion'] == inte.id) inte.patrones.push(p['patron'])
                    })
                })
    
                
                conexion.query(`select respuesta, id_interaccion FROM respuesta`, (err, resp) => {
                    if (err) reject(err)
    
                    db.forEach(function (inte) {
                        inte.respuestas = []
                        resp.forEach(function (r) {
                            if (r['id_interaccion'] == inte.id) inte.respuestas.push(r['respuesta'])
                        })
                    })

                    resolve(db)
                })
            })
    
        })
       
    }

    var jsonRet = {
        "interacciones": recTree(await getPatResp(await getInts()))
    }
    res.send(JSON.stringify(jsonRet))
}


exports.readCatStatus = async (req, res) => {
    conexion.query('SELECT categoria FROM interaccion GROUP BY categoria', (err, ints) => {
        if (err) throw err
        var diccs = {}
        var sql = "SELECT categoria, isOn FROM categoria WHERE categoria = ''"

        ints.forEach(function (inte) {
            sql += ` OR categoria= '${inte['categoria']}'`
        })


        conexion.query(sql, (err, cats) => {
            if (err) throw err
            cats.forEach(function (cat) {
                diccs[cat['categoria']] = cat['isOn']
            })
            res.send(JSON.stringify(diccs))
        })

    })
}




//Read
exports.readCount = async (req, res) => {
    conexion.query('SELECT categoria, COUNT(id) AS total FROM interaccion GROUP BY categoria', (err, rows) => {
        if (err) throw err
        var diccs = {}

        rows.forEach(function (row) {
            diccs[row['categoria']] = row['total']
        })

        res.send(JSON.stringify(diccs))
    })
}

exports.readTest = async (req, res) => {

    conexion.query('SELECT * from interaccion', (err, rows) => {
        if (err) throw err
        res.send(JSON.stringify(rows))
    })
}



exports.readData = async (req, res) => {
    var data = req.params["categ"]
    conexion.query(`SELECT etiqueta, tipo, sucesor_de, link FROM interaccion WHERE categoria= '${data}'`, (err, rows) => {
        if (err) throw err
        res.send(JSON.stringify(rows))
    })
}

exports.changeCatStatus = async (req, res) => {
    var data = req.body
    conexion.query('UPDATE categoria SET isOn=0', (err) => {
        if (err) throw err
    })

    setTimeout(() => {
        var sql = 'UPDATE categoria SET isOn=1 WHERE '
        for (const [key] of Object.entries(data)) {
            sql += `categoria= '${key}' OR `
        }

        const sqlRet = sql.slice(0, sql.length-4)

        conexion.query(sqlRet, (err, rows) => {
            if (err) throw err
        })

        setTimeout(() => {
            res.send('todo cool')
        }, 500);
        
    }, 500)

}



function getOneInter(data) {
    var interaccion = new Object()
    var intId = 0

    return new Promise((resolve, reject) => {
        conexion.query(`select * FROM interaccion WHERE etiqueta= '${data}' `, (err, row) => {
            if (err) treject(err)

            intId = row[0]["id"]
            interaccion.id = row[0]["id"]

            interaccion.etiqueta = row[0]["etiqueta"]
            interaccion.tipo = row[0]["tipo"]
            interaccion.categoria = row[0]["categoria"]
            if (!row["link"]) interaccion.link = row[0]["link"]
            if (!row["sucesor_de"]) interaccion.sucesor_de = row[0]["sucesor_de"]
        })

        setTimeout(() => {
            var patrones = []
            var respuestas = []
            conexion.query(`select patron FROM patron WHERE id_interaccion= '${intId}' `, (err, rows) => {
                if (err) throw reject(err)

                rows.forEach(function (row) {
                    patrones.push(row["patron"])
                })
            })

            conexion.query(`select respuesta FROM respuesta WHERE id_interaccion= '${intId}' `, (err, rows) => {
                if (err) reject(err)

                rows.forEach(function (row) {
                    respuestas.push(row["respuesta"])
                })
            })


            interaccion.patrones = patrones
            interaccion.respuestas = respuestas

            setTimeout(() => {
                resolve(interaccion)
            }, 500)

        }, 500)
    })

}


//Read solo 1 interaccion, tomamos la etiqueta del url
exports.readOneData = async (req, res) => {

    var data = req.params["etiq"]

    const rets = await getOneInter(data)

    delete rets.id
    var retJson = JSON.stringify(rets)
    res.send(retJson)

}

function addPreguntasRespuestas(patrones, respuestas) {

    //Calcula a cual va a ser el id de la interaccion como llave foranea de  patrones y respuestas
    var intRows = 0
    conexion.query('SELECT * FROM interaccion ORDER BY ID DESC LIMIT 1', (err, rows) => {
        if (err) throw err
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

function getDadsId(id, inDb) {
    var lstDads = []
    var db = inDb

    function findDad(dadId) {
        lstDads.push(dadId)
        var abuelo = 0


        //buscar su papa
        db.forEach(function (i) {
            if (i['id'] == dadId) {
                abuelo = i['sucesor_de']
            }
        })

        //si su papa tiene otro papa, recurrir, de lo contrario terminar
        if (abuelo != 0) {
            findDad(abuelo)
        }
    }

    findDad(id)

    return lstDads

}


//Create
exports.postData = async (req, res) => {
    var data = req.body
    var lstPatrones = []

    if (data["sucesor_de"] != 0) {
        conexion.query(`SELECT id, sucesor_de FROM interaccion`, (err, rows) => {
            if (err) throw err
            var lstIdDads = getDadsId(data["sucesor_de"], rows)

            var sql = "SELECT patron from patron WHERE id_interaccion=0 "

            lstIdDads.forEach(function (i) {
                let str = "OR id_interaccion=" + i + " "
                sql += str
            })

            conexion.query(sql, (err, rows) => {
                if (err) throw err
                rows.forEach(function (row) {
                    lstPatrones.push(row['patron'])
                })

            })


        })
    }


    //Permutaciones si tiene link o sucesor_de; los codigos son iguales solo cambia el insert, si se puede mejorar chido sino no
    //TODO: atrapar la excepcion si una etiqueta no es unica (evitar que el progreso del modal desaparezca si se puede); porque no lo hice con los patrones... no se pero ya lo hice joder
    if (data.hasOwnProperty("link")) {
        setTimeout(() => {

            var isRepetido = false
            data['patrones'].forEach(function (patron) {

                if (lstPatrones.indexOf(patron) !== -1) isRepetido = true
            })

            //Condicional si esta repetido
            if (!isRepetido) {
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

    } else {
        setTimeout(() => {

            var isRepetido = false
            data['patrones'].forEach(function (patron) {
                console.log(patron)
                if (lstPatrones.indexOf(patron) !== -1) isRepetido = true
            })

            //Condicional si esta repetido
            if (!isRepetido) {

                conexion.query(`INSERT INTO interaccion (etiqueta, tipo, categoria, sucesor_de) VALUES ('${data['etiqueta']}', ${data['tipo']}, '${data['categoria']}', '${data['sucesor_de']}' ); `, function (err, result) {
                    if (err) throw err;
                    console.log("Agregado con exito en interaccion");
                });

                setTimeout(() => {
                    addPreguntasRespuestas(data['patrones'], data['respuestas'])
                }, 500)

            } else {
                console.log("NO SE PUEDE AGREGAR PORQUE HAY PATRONES REPETIDOS")
            }

        }, 500);

    }


    res.send("Agregado todo exitosamente")
    res.status(201)

}

//Update
exports.postUpdate = async (req, res) => {
    this.deleteData(req, res)
    this.postData(req, res)
    res.status(201)
}

//Delete
//ES BUENA PRACTICA HACER UN FAKEDELETE PERO ME VALE
exports.deleteData = async (req, res) => {
    var data = req.body

    conexion.query(`DELETE FROM interaccion WHERE etiqueta= '${data['etiqueta']}' `, (err) => {
        if (err) throw err
    })

    res.status(201)
    //res.send("Se borro con exito")

}