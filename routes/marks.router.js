const express = require('express');
const app = express();
var mysql = require('mysql');
const con = require('../DB')
const businessRoutes = express.Router();

// Defined store route==================================
businessRoutes.route('/add').post(function (req, res) {

  console.log(req.body);
  var type = req.body.type;
  var studentno = req.body.studentno;
  var subjectno = req.body.subjectno;
  var marks = req.body.marks;
  if(type == 'finalExam'){
    var sql = "INSERT INTO `UMS`.`examinationMarks`(`examId`,`studentId`,`marks`)VALUES('1','"+studentno+"',"+marks+");";
    console.log(sql);
  
    con.query(sql,function(err,result){
      if(err) throw err;
      console.log("1 record inserted, ID: " + result.insertId)
    });

  }
  else{
    var sql = "INSERT INTO `UMS`.`assinmentMarks`(`assinmentId`,`studentId`,`marks`)VALUES('1','"+studentno+"',"+marks+");";
    console.log(sql);
  
    con.query(sql,function(err,result){
      if(err) throw err;
      console.log("1 record inserted, ID: " + result.insertId)
    });
  }


});

// Defined get data(index or listing) route=====================================
businessRoutes.route('/').get(function (req, res) {

    con.query("SELECT PersonID as business_gst_number,LastName as business_name,FirstName as person_name FROM nodetest.Persons;", function (err, result) {
      if (err) throw err;
      console.log(result);
      res.json(result);
    });
  
});



// Defined edit route======================================================
businessRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  con.query("SELECT PersonID as business_gst_number,LastName as business_name,FirstName as person_name FROM nodetest.Persons where PersonID ="+id, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.json(result);
  });
});



//  Defined update route====================================================================
businessRoutes.route('/update/:id').post(function (req, res) {

        var pname = req.body.person_name;
        var bname = req.body.business_name;
        var id = parseInt(req.body.business_gst_number);

          var sql = "UPDATE `nodetest`.`Persons` SET `LastName` ='"+pname+"',`FirstName` = '"+bname+"' WHERE `PersonID`="+id;
          console.log(sql);
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log(result);
          res.json('Update complete');
        });
});


// Defined delete | remove | destroy route===========================================


businessRoutes.route('/delete/:id').get(function (req, res) {
  var id = parseInt(req.params.id);
  var sql ="DELETE FROM `nodetest`.`Persons` WHERE `PersonID`="+id;
    console.log(sql);
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result);
      res.json('Successfully removed');
    });
});

module.exports = businessRoutes;