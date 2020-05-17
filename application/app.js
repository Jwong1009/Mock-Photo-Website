var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require('express-session');
var mysqlStore = require('express-mysql-session')(session);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

var sessionStore = new mysqlStore({/* using default options*/ }, require('./config/database'));

var sessionOptions = {
    key: "cscid",
    secret: "secret code",
    store: sessionStore,
    cookie: { secure: false, httpOnly: false, maxAge: 900000 },
    resave: false, 
    saveUninitialized: false
}

app.use((session)(sessionOptions));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// app.use((err, req, res, next) => {
//     console.log(err);
//     res.sendFile("errpage.html", { root: "public" });
// });


module.exports = app;

