const mysql = require("mysql");

var mysqlconnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "test_node",
    multipleStatements: true,
  });
  mysqlconnection.connect((err)=>{
      if(!err){
          console.log("Connected . . .");
      }
      else{
          console.log("Connection Failed!");
      }
  });

  module.exports = mysqlconnection;