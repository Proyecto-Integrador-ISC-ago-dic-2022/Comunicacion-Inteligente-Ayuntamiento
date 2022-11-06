const router  = require('express').Router();
const controller = require('../controllers/artifactsController');



router.get('/readCat/:categ', controller.readData)

router.get('/readCount', controller.readCount)

router.get('/readone/:etiq', controller.readOneData)

router.post('/create', controller.postData)

router.post('/update', controller.postUpdate)

router.delete('/delete', controller.deleteData)

module.exports = router