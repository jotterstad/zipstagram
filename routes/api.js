var express = require('express');
var router = express.Router();
const apiController = require('../controllers/apiController')

router.route('/zip/:zipCode').get(apiController.findByZip)
router.route('/state/:stateAb').get(apiController.findByState)

module.exports = router;