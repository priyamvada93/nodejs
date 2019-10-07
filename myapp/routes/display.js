var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/display', function(req, res, next) {
  res.send('I am on display');
});
router.post('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
