const router = require('express').Router();
const dashboardController = require('../controllers/dashboardController');

router.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'dashboard.html'))
})

module.exports = router;
