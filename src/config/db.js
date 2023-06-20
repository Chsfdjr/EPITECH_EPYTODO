const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database : process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
});

module.exports = db;