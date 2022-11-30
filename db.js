require('dotenv').config;

const mysql = require('mysql2');
module.exports = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'tes', 
    port: 3306
});