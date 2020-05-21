const errorPrint = require('../helpers/debug/debughelpers').errorPrint;
const successPrint = require('../helpers/debug/debughelpers').successPrint;
const UserError = require('../helpers/errors/UserError');
const UserModel = require('../Model/userModel');


const UserController = {

    createUser: function (req, res, next) {
        let username = req.body.username;
        let email = req.body.email;
        let password = req.body.password;
        let password2 = req.body.password2;

        UserModel.usernameExists(username)
            .then((usernameDNE) => {
                if (usernameDNE) {
                    return UserModel.emailExists(email);
                } else {
                    throw new UserError('username already exists', 400);
                }
            })
            .then((emailDNE) => {
                if (emailDNE) {
                    if (password === password2) {
                        return true;
                    } else {
                        throw new UserError('passwords do not match', 400);
                    }
                } else {
                    throw new UserError('email already exists', 400);
                }
            })
            .then((passwordsMath) => {
                return UserModel.create(username, password, email);
            })
            .then((userCreated) => {
                if (userCreated) {
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
    },
    
    login: function (req, res, next) {
        let username = req.body.username;
        let password = req.body.password;
        let userID = req.body.userID;

        UserModel.authenticate(username, password)
            .then((userData) => {
                if (userData) {
                    successPrint("Login Successful");
                    req.session.username = userData.user;
                    req.session.userID = userData.uid;
                    res.status(200).json({});
                } else {
                    throw new UserError("Failed login, username or password incorrect", 400);
                }
            })
            .catch((err) => {
                if (err instanceof UserError) {
                    res.status(err.getStatus());
                    res.json(err.getMessage());
                }
                next(err);
            })
    },

    logout: function (req, res, next) {
        req.session.destroy((err) => {
            if (err) {
                errorPrint("Failed to destroy session");
                next(err);
            } else {
                successPrint("Session was destroyed");
                res.clearCookie('cscid');
                res.redirect('/');
            }
        })
    },
}

module.exports = UserController; 