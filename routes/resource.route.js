const express = require('express');
const app = express();
var mysql = require('mysql');
const con = require('../DB');
const resourceRoutes = express.Router();

// add Resources
resourceRoutes.route('/addResource').post(function (req, res) {
  console.log(req.body);
  var id = req.body.id;
  var type = req.body.type;
  var qty = req.body.qty;
  // var eid = req.body.employeeid;
  var eid = 'e1';
  

  var sql = "INSERT INTO `ums`.`resource` (`resourceId`, `type`, `QTY` , `employeeId`) " +
    "VALUES('" + id + "', '" + type + "', '" + qty + "', '" + eid + "');";

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted, ID: " + result);
    res.json("true");
  });
});

// get Resource
resourceRoutes.route('/getResources').get(function (req, res) {
  console.log("called");
  var sql = "SELECT resourceId as id, type as type, QTY as qty , employeeId as eid " +
    "FROM resource " +
    "ORDER BY resourceId; ";

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.json(result);
  });
});

// update Resource
resourceRoutes.route('/updateResource').post(function (req, res) {
  console.log(req.body);
  var id = req.body.id;
  var type = req.body.type;
  var qty = req.body.qty;
  var eid = 'e1';
 

  var sql = "UPDATE resource " +
    "SET type = '" + type + "', QTY = '" + qty  + "', employeeId = '" + eid  + "' " + 
    "WHERE resourceId='" + id + "';";

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record updated, ID: " + result);
    res.json("true");
  });
});

//delete Resource
resourceRoutes.route('/deleteResource/:id').get(function (req, res) {
  var id = req.params.id;
  console.log(id);
  var sql = "DELETE FROM resource WHERE resourceId='" + id + "'; ";

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record deleted" + result);
    res.json(result);
  });
});

module.exports = resourceRoutes;

 