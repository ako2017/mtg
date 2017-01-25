var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/createDeck', function(req, res, next) {
  res.render('createDeck', { title: 'Express' });
});

router.get('/play', function(req, res, next) {
  res.render('play', { title: 'Express' });
});

router.get('/connexion', function(req, res, next) {
  var name = req.param('name') || 'Somebody';
  var respondWith = '<?xml version="1.0" encoding="UTF-8"?>';
  respondWith += "<h1>Hello " + name + "!</h1>";
  res.status(200);
  res.setHeader('Content-type', 'text/xml');
  return res.send(respondWith);
});
 

module.exports = router;
