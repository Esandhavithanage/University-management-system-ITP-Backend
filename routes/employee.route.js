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
    + " VALUES('" + arrivalTime + "','" + exitTime + "','" + date + "','" + id + "');";
  console.log(sql);

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted, ID: " + result.insertId);
    res.json('Successfully added');
  });

});

// get attendance
employeeRoute.route('/getAttendance').get(function (req, res) {
  var sql = "SELECT attendanceId as id, arrivalTime as arrivalTime, exitTime as exitTime, date as date, employeeId as empId " +
    "FROM attendance " +
    "ORDER BY attendanceId";

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.json(result);
  });
});

// update attendance
employeeRoute.route('/updateAttendance').post(function (req, res) {
  console.log(req.body);
  var empId = req.body.empId;
  var date = req.body.date;
  var arrivalTime = req.body.arrivalTime;
  var exitTime = req.body.exitTime;
  var attendanceId = req.body.attendanceId;

  var sql = "UPDATE attendance SET arrivalTime='"+arrivalTime+"', exitTime='"+exitTime+"', date='"+date+"', employeeId='"+empId+"' "
    + "WHERE attendanceId='"+attendanceId+"'; ";
  console.log(sql);

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record updated" + result);
    res.json(result);
  });
});

// get employees only admins
employeeRoute.route('/getEmployee').get(function (req, res) {
  var sql = "SELECT employeeId as empId, name as name " +
    "FROM employee " +
    "WHERE type='admin'" +
    "ORDER BY employeeId; ";

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.json(result);
  });

});

// get all employees
employeeRoute.route('/getEmployeeAll').get(function (req, res) {
  var sql = "SELECT employeeId as id, name as name, address as address, gender as gender, NIC as nic, email as email, type as type, title as title, password as pwd, salaryId as salId, timetableId as timetableId, employeecol as employeecol " +
    "FROM employee " +
    "ORDER BY employeeId; ";

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.json(result);
  });

});

// add employee
employeeRoute.route('/addEmployee').post(function (req, res) {
  console.log(req.body);
  var id = req.body.id;
  var name = req.body.name;
  var address = req.body.address;
  var gender = req.body.gender;
  var nic = req.body.nic;
  var email = req.body.email;
  var type = req.body.type;
  var title = req.body.title;
  var pwd = req.body.pwd;
  var salId = req.body.salId;
  var timeTableId = req.body.timeTableId;
  var employeecol = req.body.employeecol;

  var sql = "INSERT INTO employee (`employeeId`, `name`, `address`, `gender`, `NIC`, `email`, `type`, `title`, `password`, `salaryId`, `timetableId`, `employeecol` ) " +
    "VALUES('" + id + "', '" + name + "', '" + address + "', '" + gender + "', '" + nic + "', '" + email + "', '" + type + "', '" + title + "', '" + pwd + "', '" + salId + "', '" + timeTableId + "', '" + employeecol + "') ;";

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted" + result);
    res.json('Successfully added');
  });

});

// update employee
employeeRoute.route('/updateEmployee').post(function (req, res) {
  console.log(req.body);
  var id = req.body.id;
  var name = req.body.name;
  var address = req.body.address;
  var gender = req.body.gender;
  var nic = req.body.nic;
  var email = req.body.email;
  var type = req.body.type;
  var title = req.body.title;
  var pwd = req.body.pwd;
  var salId = req.body.salId;
  var timeTableId = req.body.timeTableId;
  var employeecol = req.body.employeecol;

  var sql = "UPDATE employee SET name='" + name + "', address='" + address + "', gender='" + gender + "', NIC='" + nic + "', email='" + email + "', type='" + type + "', title='" + title + "', password='" + pwd + "', salaryId='" + salId + "', timetableId='" + timeTableId + "', employeecol='" + employeecol + "' " +
    "WHERE employeeId='" + id + "'; ";

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record updated" + result);
    res.json(result);
  });

});

// delete employee
employeeRoute.route('/deleteEmployee/:id').get(function (req, res) {
  var id = req.params.id;

  var sql = "DELETE FROM employee WHERE employeeId='" + id + "' ";

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record deleted" + result);
    res.json(result);
  });
});

// add money requests
employeeRoute.route('/addMRequest').post(function (req, res) {
  console.log(req.body);
  var empId = req.body.employeeId;
  var date = req.body.date;
  var description = req.body.description;
  var amount = req.body.amount;

  var sql = "INSERT INTO moneyrequest (`date`, `amount`, `description`, `employeeId`) " +
    "VALUES ('"+date+"', '"+amount+"', '"+description+"', '"+empId+"'); ";

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record added" + result);
    res.json(result);
  });

});

// update money requests
employeeRoute.route('/updateMRequest').post(function (req, res) {
  console.log(req.body);
  var empId = req.body.employeeId;
  var date = req.body.date;
  var description = req.body.description;
  var amount = req.body.amount;
  var rId = req.body.requestId;

  var sql = "UPDATE moneyrequest SET date='"+date+"', amount='"+amount+"', description='"+description+"' " +
    "WHERE moneyRequestId='"+rId+"'; ";

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record updated" + result);
    res.json(result);
  });

});



module.exports = employeeRoute;