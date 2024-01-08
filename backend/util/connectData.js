const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    port: '3306',
    user: 'root',
    database: 'node-complete',
    password: 'Mysql123@'
});
const promisePool = pool.promise();

module.exports = {
    db: promisePool
}