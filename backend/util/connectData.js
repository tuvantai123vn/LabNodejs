const mysql = require('mysql2');
const Sequelize = require("sequelize");

// const pool = mysql.createPool({
//     host: 'localhost',
//     port: '3306',
//     user: 'root',
//     database: 'node-complete',
//     password: 'Mysql123@'
// });
// const promisePool = pool.promise();

const sequelize = new Sequelize('node-complete', 'root', 'Mysql123@', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = {
    sequelize
}