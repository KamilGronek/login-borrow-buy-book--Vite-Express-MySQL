import mysql from 'mysql2';


const connection = mysql.createConnection({
    host : 'localhost',
    user: 'root',
    password: 'root',
    database: 'project_book'
});

export default connection;
