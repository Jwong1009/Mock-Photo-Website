const db = require('../config/database');
const UserError = require('../helpers/errors/UserError');
const bcrypt = require('bcrypt');

const UserModel = {
    create: function (username, password, email) { //when all is has been checked and is good to put into DB
        return bcrypt.hash(password, 10)
            .then((hashedPassword) => {
                return db.execute('INSERT INTO users (username, email, password, created) VALUES (?,?,?, NOW());',
                    [username, email, hashedPassword]);
            })
            .then(([results, fields]) => {
                return Promise.resolve(results && results.affectedRows);
            })
            .catch((err) => {
                throw err;
            })
    },

    authenticate: function (username, password) {
        let userID;
        return db.execute('SELECT id, password FROM users WHERE username=?', [username])
            .then(([results, fields]) => {
                if (results && results.length == 1) {
                    userID = results[0].id;
                    hashed = results[0].password;
                    return bcrypt.compare(password, hashed);
                } else {
                    throw new UserError("Failed login, username or password incorrect", 400);
                }
            })
            .then((hashesMatch) => { //--> RETURNS FALSE FOR NEWLY MADE USERS
                if (hashesMatch) {
                    return Promise.resolve({ user: username, uid: userID });
                } else {
                    return Promise.resolve(false);
                }
            })
            .catch((err) => {
                throw err;
            });
    },

    usernameExists: function (username) { //part of register
        return db.execute('SELECT * FROM users WHERE username=?', [username])
            .then(([results, fields]) => {
                return Promise.resolve((results && results.length == 0));
            })
            .catch((err) => { throw err; });
    },

    emailExists: function (email) {     //part of register
        return db.execute('SELECT * FROM users WHERE email=?', [email])
            .then(([results, fields]) => {
                return Promise.resolve((results && results.length == 0));
            })
            .catch((err) => {
                throw err;
            });
    }

}

module.exports = UserModel;