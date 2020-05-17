var express = require('express');
var router = express.Router();
const db = require('../config/database');
const errorPrint = require('../helpers/debug/debughelpers').errorPrint;
const successPrint = require('../helpers/debug/debughelpers').successPrint;
const UserError = require('../helpers/errors/UserError');


/* GET users listing. */
router.get('/', function (req, res, next) {
  db.query('SELECT * FROM users;', (err, results, fields) => {
    
    res.send(results);
  })
});

/* Register */
router.post('/register', (req, res, next) => {
  debugger
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;

  db.execute('SELECT * FROM users WHERE username=?', [username])
    .then(([results, fields]) => {
      if (results && results.length == 0) {
        return db.execute('SELECT * FROM users WHERE email=?', [email])
      } else {
        throw new UserError('username already exists', '/register', 400);
      }
    })
    .then(([results, fields]) => {
      if (results && results.length == 0) {
        return db.execute('INSERT INTO users (username, email, password, created) VALUES (?,?,?, NOW());', [username, email, password]);
      } else {
        throw new UserError('email already exists', '/register', 400);
      }
    })
    .then(([results, fields]) => {
      if (results && results.affectedRows) {
        successPrint('user has been created');
        res.redirect('/login');
      } else {
        throw new UserError('Server Error, user could not be created', '/register', 500);
      }
    })
    .catch((err) => {
      if (err instanceof UserError) {
        // errorPrint(err.getMessage());
        res.status(err.getStatus());
        res.json(err.getMessage());
      }
      next(err);
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
