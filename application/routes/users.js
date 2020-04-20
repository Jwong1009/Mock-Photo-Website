var express = require('express');
var router = express.Router();
const db = require('../config/database');


/* GET users listing. */
router.get('/', function (req, res, next) {
  db.query('SELECT * FROM users;', (err, results, fields) => {
    res.send(results);
  })
});

/* Register */
router.post('/register', (req, res, next) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  //need to: HASH PASSWORD TO MAKE IT ENCRYPTED
  let baseSQL = 'INSERT INTO users (username, email, password, created) VALUES (?, ?, ?, now())';
  db.query(baseSQL, [username, email, password]).then(([results, fields]) => {
    if (results && results.affectedRows) {
      res.redirect('/');
    } else {
      res.redirect('/error');
    }
  })
    .catch(error => {
      res.redirect("/error");
      console.log(error.message);
    })
});

/* Login */
router.post('/login', (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;

  let baseSQL = 'SELECT * FROM Users WHERE Username=? AND Password=?;';
  db.query(baseSQL, [username, password]).then(([results, fields]) => {
    if (results.length === 1) {
      res.redirect('/');
    } else {
      res.redirect('/error');
    }
  })
    .catch(error => {
      res.redirect("/error");
    })
});


module.exports = router;
