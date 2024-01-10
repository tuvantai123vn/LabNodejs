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
  host: 'localhost',
  logging: false, 
});

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database: ', error);
});

module.exports = {
    sequelize
}