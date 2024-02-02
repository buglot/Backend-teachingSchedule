// db.js
const mysql = require('mysql2');


// สร้างการเชื่อมต่อกับ MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123123123',
  database: 'teachingschedule',
  port:6000,
});

module.exports = connection;
