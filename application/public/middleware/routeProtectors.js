const routeProtectors = {};
const errorPrint = require('../../helpers/debug/debughelpers').errorPrint;
const successPrint = require('../../helpers/debug/debughelpers').successPrint;

routeProtectors.userIsLoggedIn = function (req, res, next) {
    if (req.session.username) {
        successPrint("User is logged in");
        next();
    } else {
        errorPrint("User is not logged in, redirect to login page");
        res.redirect('/login');
    }
}

module.exports = routeProtectors;