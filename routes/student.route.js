const express = require('express');
const app = express();
var mysql = require('mysql');
const con = require('../DB');
const studentRoutes = express.Router();

// add student
studentRoutes.route('/addStudent').post(function (req, res) {
  console.log(req.body);
  var id = req.body.id;
  var name = req.body.name;
  var address = req.body.address;
  var batchId = req.body.batchId;
  var email = req.body.email;
  var nic = req.body.nic;
  var pwd = req.body.pwd;
  var gender = req.body.gender;

  var sql = "INSERT INTO `ums`.`student`(`studentId`,`name`,`NIC`, `gender`, `address`, `email`, `password`, `batchId`) " +
    "VALUES('" + id + "','" + name + "','" + nic + "', '" + gender + "', '" + address + "', '" + email + "', '" + pwd + "', '" + batchId + "');";

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted, ID: " + result);
    res.json("true");
  });
});

// get student
studentRoutes.route('/getStudent').get(function (req, res) {
  var sql = "SELECT studentId as id, name as name, NIC as nic, gender as gender, address as address, email as email, password as pwd, batchId as batchId " +
    "FROM student " +
    "ORDER BY studentId; ";

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.json(result);
  });
});

// update student
studentRoutes.route('/updateStudent').post(function (req, res) {
  console.log(req.body);
  var id = req.body.id;
  var name = req.body.name;
  var address = req.body.address;
  var batchId = req.body.batchId;
  var email = req.body.email;
  var nic = req.body.nic;
  var pwd = req.body.pwd;
  var gender = req.body.gender;

  var sql = "UPDATE student " +
    "SET name = '" + name + "', NIC = '" + nic + "', gender = '" + gender + "', address = '" + address + "', email = '" + email + "', password = '" + pwd + "', batchId = '" + batchId + "' " +
    "WHERE studentId='" + id + "';";

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record updated, ID: " + result);
    res.json("true");
  });
});

//delete student
studentRoutes.route('/deleteStudent/:id').get(function (req, res) {
  var id = req.params.id;
  console.log(id);
  var sql = "DELETE FROM student WHERE studentId='" + id + "'; ";

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record deleted" + result);
    res.json(result);
  });
});

studentRoutes.route('/getCourses').get(function (req, res) {
  var sql = "SELECT c.courseId as id, c.name as name, c.year as year, c.gpa as gpa, c.employeeId as empId, e.name as empName, c.departmentId as dId, d.name as dName  " +
    "FROM course c, department d, employee e " +
    "WHERE c.employeeId = e.employeeId AND c.departmentId = d.departmentId " +
    "ORDER BY c.courseId; ";

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.json(result);
  });
});

// insert courses
studentRoutes.route('/addCourses').post(function (req, res) {
  console.log(req.body);
  var id = req.body.id;
  var name = req.body.name;
  var year = req.body.year;
  var gpa = req.body.gpa;
  var empName = req.body.empName;
  var dName = req.body.dName;
  var empId;
  var dId;

  // get employee id
  var sql1 = "SELECT employeeId as empId FROM employee WHERE name='" + empName + "';";
  con.query(sql1, function (err, result) {
    if (err) throw err;
    for (var i in result) {
      empId = result[i].empId;
    }

    // get department id
    var sql2 = "SELECT departmentId as dId FROM department WHERE name='" + dName + "';";
    con.query(sql2, function (err, result) {
      if (err) throw err;
      for (var i in result) {
        dId = result[i].dId;
      }

      // insert course
      var sql3 = "INSERT INTO `ums`.`course`(`courseId`,`name`, `year`, `GPA`, `employeeId`, `departmentId`) " +
        "VALUES('" + id + "','" + name + "','" + year + "', '" + gpa + "', '" + empId + "', '" + dId + "');";

      con.query(sql3, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted" + result);
        res.json("true");
      });

    });

  });

});

// update course
studentRoutes.route('/updateCourses').post(function (req, res) {
  console.log(req.body);
  var id = req.body.id;
  var name = req.body.name;
  var year = req.body.year;
  var gpa = req.body.gpa;
  var empName = req.body.empName;
  var dName = req.body.dName;
  var empId;
  var dId;

  // get employee id
  var sql1 = "SELECT employeeId as empId FROM employee WHERE name='" + empName + "';";
  con.query(sql1, function (err, result) {
    if (err) throw err;
    for (var i in result) {
      empId = result[i].empId;
    }

    // get department id
    var sql2 = "SELECT departmentId as dId FROM department WHERE name='" + dName + "';";
    con.query(sql2, function (err, result) {
      if (err) throw err;
      for (var i in result) {
        dId = result[i].dId;
      }

      // update course
      var sql3 = "UPDATE course SET name = '" + name + "', year = '" + year + "', GPA = '" + gpa + "', employeeId = '" + empId + "', departmentId = '" + dId + "' " +
        "WHERE courseId = '" + id + "';";

      con.query(sql3, function (err, result) {
        if (err) throw err;
        console.log("1 record updated" + result);
        res.json(result);
      });

    });

  });
});

// delete course
studentRoutes.route('/deleteteCourse/:id').get(function (req, res) {
  var id = req.params.id;
  // console.log(id);
  var sql = "DELETE FROM course WHERE courseId='" + id + "'; ";

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record deleted" + result);
    res.json(result);
  });
});

// get payments
studentRoutes.route('/getPayments').get(function (req, res) {
  var sql = "SELECT paymentId as payId, amount as amount, date as date, courseId as courseId " +
    "FROM payment " +
    "ORDER BY paymentId;";

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.json(result);
  });

});

// add payments
studentRoutes.route('/addPayments').post(function (req, res) {
  console.log(req.body);
  var amount = req.body.amount;
  var date = req.body.date;
  var courseId = req.body.courseId;
  var title = req.body.title;

  var sql = "INSERT INTO payment (`amount`, `date`, `courseId`, `title`) " +
    "VALUES ('" + amount + "', '" + date + "', '" + courseId + "', '" + title + "'); ";

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.json(result);
  });

});

// update payments
studentRoutes.route('/updatePayments').post(function (req, res) {
  console.log(req.body);
  var payId = req.body.payId;
  var amount = req.body.amount;
  var date = req.body.date;
  var courseId = req.body.courseId;
  var title = req.body.title;

  var sql = "UPDATE payment SET amount='"+amount+"', date='"+date+"', courseId='"+courseId+"', title='"+title+"' " +
    "WHERE paymentId='"+payId+"';";

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.json(result);
  });

});

module.exports = studentRoutes;