var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html');
});
/* GET login page. */
router.get('/login', function(req, res, next) {
  res.sendFile('login.html', {root: 'public/'});
});

/* GET registration page. */
router.get('/register', function(req, res, next) {
  res.sendFile('registration.html', {root: 'public/'});
});

/* GET uploading image page. */
router.get('/upload', function(req, res, next) {
  res.sendFile('postimage.html', {root: 'public/'});
});
/* GET single page. */
router.get('/photo', function(req, res, next) {
  res.sendFile('singleimg.html', {root: 'public/'});
});

/* GET error page. */
// router.get('/error', function(req, res, next) {
//   res.sendFile('errpage.html', {root: 'public/'});
// });
module.exports = router;
