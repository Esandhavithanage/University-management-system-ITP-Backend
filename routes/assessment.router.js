const express = require('express');
const app = express();
const con = require('../DB');
const fd = require('mkdirp');
const businessRoutes = express.Router();

// Defined store route==================================
businessRoutes.route('/add').post(function (req, res) {

  console.log(req.body);
  
  var tital = req.body.tital;
  var startdate = req.body.startdate;
  var deadline = req.body.deadline;
  var type = req.body.type
  var subject = req.body.subject;
  var id = 'A'+parseInt(new Date().getTime());

   console.log(id);

  if(type == 'Assignment'){
    var filepath = "./Assignment/"+tital;
    fd(filepath,function(err){
      if (err) console.error(err)
      else console.log('pow!');
    });

    var sql = "INSERT INTO `UMS`.`assinment`(`assinmentId`,`title`,`deadline`,`courseId`,`employeeId`,`filePath`,`type`,`startDate`)VALUES(?,?,?,?,?,?,?,?)";
    console.log(sql);
  
    con.query(sql,[id,tital,deadline,subject,"E001",filepath,type,startdate],function(err,result){
      if(err) throw err;
      console.log("1 record inserted, ID: " + result.insertId);
    });
  }else{
    var sql = "INSERT INTO `UMS`.`assinment`(`assinmentId`,`title`,`deadline`,`courseId`,`employeeId`,`type`,`startDate`)VALUES(?,?,?,?,?,?,?)";
    console.log(sql);
  
    con.query(sql,[id,tital,deadline,subject,"E001",type,startdate],function(err,result){
      if(err) throw err;
      console.log("1 record inserted, ID: " + result.insertId);
    });
  }

});

// Defined get data(index or listing) route=====================================
businessRoutes.route('/').get(function (req, res) {
    con.query("SELECT `assinment`.`assinmentId`,`assinment`.`title`,`assinment`.`startDate`,`assinment`.`deadline`,`course`.`name` as courseName,`assinment`.`filePath`,`assinment`.`type`FROM `UMS`.`assinment` inner join `course` on `course`.`courseId`= `assinment`.`courseId`;", function (err, result) {
      if (err) throw err;
      console.log(result);
      res.json(result);
    });
  
});

businessRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  con.query("SELECT `assinment`.`assinmentId`,`assinment`.`title`,`assinment`.`startDate`,`assinment`.`deadline`,`course`.`courseId`,`assinment`.`filePath`,`assinment`.`type`FROM `UMS`.`assinment` inner join `course` on `course`.`courseId`= `assinment`.`courseId` where `assinment`.`assinmentId` =?",[id], function (err, result) {
    if (err) throw err;
    console.log(result);
    res.json(result);
  });

});

businessRoutes.route('/update/:id').post(function (req, res) {

  let id = req.params.id;
  var tital = req.body.tital;
  var startdate = req.body.startdate;
  var deadline = req.body.deadline;
  var type = req.body.type
  var subject = req.body.subject;

  if(type == 'Assignment'){
    var filepath = "./Assignment/"+tital;
    fd(filepath,function(err){
      if (err) console.error(err)
      else console.log('pow!');
    });
    con.query("UPDATE `UMS`.`assinment`SET`title` = ?,`deadline` = ?,`filePath` = ?,`startDate` = ? WHERE `assinmentId` = ?;"
    ,[tital,deadline,filepath,startdate,id], function (err, result) {
      if (err) throw err;
      console.log(result);
      res.json(result);
    });

  }else{
    con.query("UPDATE `UMS`.`assinment`SET`title` = ?,`deadline` = ?,`courseId` = ?,`startDate` = ? WHERE `assinmentId` = ?;"
    ,[tital,deadline,subject,startdate,id], function (err, result) {
      if (err) throw err;
      console.log(result);
      res.json(result);
    });
  }
});


businessRoutes.route('/delete/:id').get(function (req, res) {
  var id = req.params.id;
  var sql ="DELETE FROM `UMS`.`assinment` WHERE `assinmentId`=?";
    console.log(id);
    con.query(sql,[id], function (err, result) {
      if (err) throw err;
      console.log(result);
      res.json('Successfully removed');
    });
});


businessRoutes.route('/subject').get(function (req, res) {
  var sql ="SELECT `course`.`courseId`,`course`.`name`FROM UMS.course;";
  
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result);
      res.json(result);
    });
});

businessRoutes.route('/getAssisment/:subjectid').get(function (req, res) {
  var id = req.params.subjectid;
  var sql ="SELECT `assinment`.`assinmentId`,`assinment`.`title`,`assinment`.`deadline`,`assinment`.`filePath`,`assinment`.`startDate` FROM `UMS`.`assinment` where `assinment`.`courseId`=? AND`assinment`.`type`='Assignment';";
  
    con.query(sql,[id],function (err, result) {
      if (err) throw err;
      console.log(result);
      res.json(result);
    });
});




module.exports = businessRoutes;