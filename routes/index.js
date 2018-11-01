var express = require('express');
var router = express.Router();

router.use("/crawl", require(__dirname + "/crawlYoutube.js"))

router.get('/', function(req, res) {
  res.render('index', { title: 'YOUTUBE WEB API' });
});

module.exports = router;