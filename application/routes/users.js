var express = require('express');
var router = express.Router();
const db = require('../config/database');
const errorPrint = require('../helpers/debug/debughelpers').errorPrint;
const successPrint = require('../helpers/debug/debughelpers').successPrint;
const UserError = require('../helpers/errors/UserError');

const bcrypt = require('bcrypt');


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
  let password2 = req.body.password2;

  db.execute('SELECT * FROM users WHERE username=?', [username]) //check username exists?
    .then(([results, fields]) => {
      if (results && results.length == 0) {
        return db.execute('SELECT * FROM users WHERE email=?', [email]) //username DNE, check email exists?
      } else {
        throw new UserError('username already exists', 400);
      }
    })
    .then(([results, fields]) => {
      if (results && results.length == 0) { //both DNE, check password 
        if (password === password2) {
          return bcrypt.hash(password, 10);  //hash password if matches
        } else {
          throw new UserError('passwords do not match', 400);
        }
      } else {
        throw new UserError('email already exists', 400);
      }
    })
    .then((hashedPassword) => { //add into DB
      return db.execute('INSERT INTO users (username, email, password, created) VALUES (?,?,?, NOW());', [username, email, hashedPassword]);
    })
    .then(([results, fields]) => {
      if (results && results.affectedRows) {
        successPrint('user has been created');
        res.status(200).json({});
      } else {
        throw new UserError('Server Error, user could not be created', 500);
      }
    })
    .catch((err) => {
      if (err instanceof UserError) {
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
