const express = require('express');
const app = express();
var mysql = require('mysql');
const con = require('../DB');
const employeeRoute = express.Router();

// add attendance
employeeRoute.route('/addAttendance').post(function (req, res) {

    console.log(req.body);
    var id = req.body.emp_id;
    var date = req.body.date;
    var arrivalTime = req.body.arrival_time;
    var exitTime = req.body.exit_time;
    var sql = "INSERT INTO `ums`.`attendance`(`arrivalTime`,`exitTime`,`date`, `employeeId`)"
        + " VALUES('"+arrivalTime+"','"+exitTime+"','"+date+"','"+ id +"');";
    console.log(sql);
  
    con.query(sql,function(err,result){
      if(err) throw err;
      console.log("1 record inserted, ID: " + result.insertId);
      res.json('Successfully added');
    });
  
  });

  module.exports = employeeRoute;