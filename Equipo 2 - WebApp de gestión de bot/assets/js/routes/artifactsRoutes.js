const router = require('express').Router();
const controller = require('../controllers/artifactsController');


//SE DEBERIA USAR SOLO UNA VEZ CUANDO SE CREA LA BASE DE DATOS
//router.get('/addCategories', controller.temAddCategories)


router.get('/readCat/:categ', controller.readData)

router.get('/readCatStatus', controller.readCatStatus)

router.post('/changeCatStatus', controller.changeCatStatus)

router.get('/readCount', controller.readCount)

router.get('/read', controller.readTest)

router.get('/readone/:etiq', controller.readOneData)

router.get('/readForAI', controller.readForAI)

router.post('/create', controller.postData)

router.post('/update', controller.postUpdate)

router.delete('/delete', controller.deleteData)

module.exports = router