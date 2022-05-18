var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root@123",
  database: "Pan_User",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected! to Mysql");
});
// var sql = "CREATE DATABASE Pan_User;";  Creating databases
// var sql =
//   "CREATE TABLE  Data (Sno int, PanCard varchar(12), Name varchar(50), Father's Name varchar(50), DOB varchar(20), Primary Key(Sno))";
// var sql = "select * from PanData;";

// con.query(sql, (err, result) => {
//   if (err) throw err;
//   console.log(result);
// });
module.exports = con;
