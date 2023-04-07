const mysql = require('mysql2')


const connection = mysql.createConnection({
    host : 'localhost',
    user: 'root',
    password: 'root',
    database: 'project_book'
});

module.exports = connection;