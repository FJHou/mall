var express = require('express');
var router = express.Router();
const User = require('../models/users');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' , times: '1th'});
});

module.exports = router;
