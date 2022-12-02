const mysql = require("mysql");
let pool;
pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'manga_rewrite'
})

module.exports = pool;
