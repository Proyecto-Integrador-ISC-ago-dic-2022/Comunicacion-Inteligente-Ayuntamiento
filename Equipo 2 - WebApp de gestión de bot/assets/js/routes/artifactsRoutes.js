const router  = require('express').Router();
const controller = require('../controllers/artifactsController');



router.get('/read', controller.readData)

router.post('/create', controller.postData)

router.post('/update', controller.postUpdate)

router.delete('/delete', controller.deleteData)

module.exports = router