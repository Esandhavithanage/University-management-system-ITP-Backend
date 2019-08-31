const express = require('express');
const app = express();
var mysql = require('mysql');
const con = require('../DB')
const quizrout = express.Router();

quizrout.route('/add').post(function (req, res) {

        var question = req.body.question;
        var Option1 = req.body.Option1;
        var Option2 = req.body.Option2;
        var Option3 = req.body.Option3;
        var Option4 = req.body.Option4;
        var answer = parseInt(req.body.answer);
        var assinmentId = req.body.assinmentId
     
          con.query("INSERT INTO `UMS`.`quiz`(`question`,`option1`,`option2`,`option3`,`option4`,`answer`,`assinmentId`)VALUES(?,?,?,?,?,?,?);"
          ,[question,Option1,Option2,Option3,Option4,answer,assinmentId], function (err, result) {
            if (err) throw err;
            console.log(result);
            res.json(result);
          });
  });

  quizrout.route('/:id').get(function (req, res) {
    let id = req.params.id;
      con.query("SELECT `quiz`.`quizId`,`quiz`.`question`,`quiz`.`option1`,`quiz`.`option2`,`quiz`.`option3`,`quiz`.`option4`,`quiz`.`answer` FROM `UMS`.`quiz` where `quiz`.`assinmentId`= ?",[id], function (err, result) {
        if (err) throw err;
        console.log(result);
        res.json(result);
      });
    
  });

  quizrout.route('/edit/:id').get(function (req, res) {
    let id = req.params.id;
    con.query("SELECT `quiz`.`quizId`,`quiz`.`question`,`quiz`.`option1`,`quiz`.`option2`,`quiz`.`option3`,`quiz`.`option4`,`quiz`.`answer` FROM `UMS`.`quiz` where `quiz`.`quizId`=?",[id], function (err, result) {
      if (err) throw err;
      console.log(result);
      res.json(result);
    });
  
  });


  quizrout.route('/update/:id').post(function (req, res) {
    let id = parseInt(req.params.id);
    var question = req.body.question;
    var Option1 = req.body.Option1;
    var Option2 = req.body.Option2;
    var Option3 = req.body.Option3;
    var Option4 = req.body.Option4;
    var answer = parseInt(req.body.answer);
 
      con.query("UPDATE `UMS`.`quiz` SET `question` = ?,`option1` = ?,`option2` = ?,`option3` = ?,`option4` = ?,`answer` = ? WHERE `quizId` = ?;"
      ,[question,Option1,Option2,Option3,Option4,answer,id], function (err, result) {
        if (err) throw err;
        console.log(result);
        res.json(result);
      });

  });
  
  
  quizrout.route('/delete/:id').get(function (req, res) {
    var id = parseInt(req.params.id);
    var sql ="DELETE FROM `UMS`.`quiz` WHERE `quizId` = ?";
      console.log(id);
      con.query(sql,[id], function (err, result) {
        if (err) throw err;
        console.log(result);
        res.json('Successfully removed');
      });
  });

  module.exports = quizrout;