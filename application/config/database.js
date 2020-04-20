const mysql = require('mysql2');


const pool = mysql.createPool({
    host: "localhost",
    user: "photoapp",
    password: "20001009",
    database: "csc317db",
    connectionLimit: 50,
    debug: false,
});

const promisePool = pool.promise();
module.exports = promisePool;