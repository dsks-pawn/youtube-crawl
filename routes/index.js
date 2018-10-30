var express = require('express');
var router = express.Router();

router.use("/test", require(__dirname + "/testRoutes.js"))

router.get('/', function(req, res) {
  res.render('index', { title: 'YOUTUBE WEB API' });
});

module.exports = router;