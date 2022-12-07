require('dotenv').config;

const mysql = require('mysql2');
module.exports = mysql.createPool({
    host: process.env.dbhost,
    user: process.env.dbuser,
    database: process.env.dbdatabase, 
    password: process.env.dbpassword,
    port: 3306
});