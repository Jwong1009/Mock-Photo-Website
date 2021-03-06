var express = require('express');
var router = express.Router();
var isLoggedIn = require('../public/middleware/routeProtectors').userIsLoggedIn;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html', { root: 'public/html' });
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.sendFile('login.html', {root: 'public/html'});
});

/* GET registration page. */
router.get('/register', function(req, res, next) {
  res.sendFile('registration.html', {root: 'public/html'});
});

router.use('/upload', isLoggedIn);
/* GET uploading image page. */
router.get('/upload', function(req, res, next) {
  res.sendFile('postimage.html', {root: 'public/html'});
});

module.exports = router;
