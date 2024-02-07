// db.js
const mysql = require('mysql2');
const chalk = require('chalk');

// สร้างการเชื่อมต่อกับ MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123123123',
  database: 'teachingschedule',
  port:6000,
});
connection.connect((err)=>{
  if(err){
    console.log("Error connnect databases ->",err);
  }else{
    console.log(chalk.yellow("Connected Database",connection.config.database,connection.config.host,connection.config.port,"\n"))
  }
});
module.exports = connection;
