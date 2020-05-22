var express = require('express');
var router = express.Router();
const UserController = require('../Controller/userController');

/* Register */
router.post('/register', (req, res, next) => {
  UserController.createUser(req, res, next);
});

/* Login */
router.post('/login', (req, res, next) => {
  UserController.login(req, res, next);
});

/* Logout */
router.post('/logout', (req, res, next) => {
  UserController.logout(req, res, next);
});

module.exports = router;
