const mysql = require('mysql');

// connection to the db=======================================
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "ums"
});

con.connect((err) => {
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});

module.exports = con;