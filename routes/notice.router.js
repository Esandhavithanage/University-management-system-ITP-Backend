const express = require('express');
const app = express();
const con = require('../DB');
const notice = express.Router();

notice.route('/add').post(function(req,res){
let title = req.body.title;
let description = req.body.description;
let employeeId = req.body.employeeId;
let id = 'N'+parseInt(new Date().getTime());

console.log(id+" "+title+" "+description+" "+employeeId)

con.query("INSERT INTO `UMS`.`notice`(`noticeId`,`title`,`description`,`employeeId`)VALUES(?,?,?,?);"
,[id,title,description,employeeId], function (err, result) {
  if (err) throw err;
  console.log(result);
  res.json(result);
});

});

notice.route('/').get(function(req,res){
  con.query("SELECT `noticeId`,`title`,`description` FROM `UMS`.`notice`;"
  ,function (err, result) {
    if (err) throw err;
    console.log(result);
    res.json(result);
  });
  
  });

  notice.route('/edit/:id').get(function(req,res){
    let id = req.params.id;
    console.log(id);
    con.query("SELECT `noticeId`,`title`,`description` FROM `UMS`.`notice` WHERE noticeId = ?;",[id]
    ,function (err, result) {
      if (err) throw err;
      console.log(result);
      res.json(result);
    });
    
    });

    notice.route('/update').post(function(req,res){
      let id = req.body.id;
      let title = req.body.title;
      let description = req.body.description;
      con.query("UPDATE `UMS`.`notice` SET`title` = ?,`description` = ? WHERE `noticeId` = ?;",[title,description,id]
      ,function (err, result) {
        if (err) throw err;
        console.log(result);
        res.json(result);
      });
      
      });

      notice.route('/delete/:id').get(function(req,res){
        let id = req.params.id;
        con.query("DELETE FROM `UMS`.`notice` WHERE noticeId=?;",[id]
        ,function (err, result) {
          if (err) throw err;
          console.log(result);
          res.json(result);
        });
        
        });

module.exports = notice;