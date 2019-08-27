const express = require('express');
const app = express();
var mysql = require('mysql');
const con = require('../DB');
const otherRoute = express.Router();

otherRoute.route('/getDepartments').get(function (req, res) {
  var sql = "SELECT departmentId as id, name as name FROM department ORDER BY departmentId; ";

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.json(result);
  });
});

module.exports = otherRoute;