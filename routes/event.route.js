const express = require('express');
const app = express();
var mysql = require('mysql');
const con = require('../DB');
const eventRoutes = express.Router();

// get events
eventRoutes.route('/getEvents').get(function (req, res) {
    var sql = "SELECT eventId as eventId, title as title, description as description, date as date, employeeId " +
        "FROM event " +
        "ORDER BY date DESC; ";

    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
        res.json(result);
    });

});

// add events
eventRoutes.route('/addEvents').post(function (req, res) {
    var id = req.body.id;
    var title = req.body.title;
    var description = req.body.description;
    var date = req.body.date;
    var empId = req.body.employeeId;

    var sql = "INSERT INTO event (`eventId`, `title`, `description`, `date`, `employeeId`) " +
        "VALUES ('"+id+"', '"+title+"', '"+description+"','"+date+"','"+empId+"');";

    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("added" + result);
        res.json(result);
    });

});

// update events
eventRoutes.route('/updateEvents').post(function (req, res) {
    var id = req.body.eventId;
    var title = req.body.title;
    var description = req.body.description;
    var date = req.body.date;
    var empId = req.body.employeeId;

    var sql = "UPDATE event SET title='"+title+"', description='"+description+"', date='"+date+"', employeeId='"+empId+"' " +
        "WHERE eventId='"+id+"'; ";

    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("updated" + result);
        res.json(result);
    });

});

// delete events
eventRoutes.route('/deleteEvents/:id').get(function (req, res) {
    var id = req.params.id;
    console.log(id);

    var sql = "DELETE FROM `ums`.`event` WHERE (`eventId` = '"+id+"'); ";

    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("deleted" + result);
        res.json(result);
    });

});

// register events
eventRoutes.route('/registerEvent').post(function (req, res) {
    console.log(req.body);
    var id = req.body.eventId;
    var studentId = req.body.studentId;
    var date = req.body.date;

    var sql = "INSERT INTO (`studentId`, `eventId`, `date`) " +
        "VALUES ('"+id+"', '"+studentId+"', '"+date+"'); ";

    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("added" + result);
        res.json(result);
    });

});



module.exports = eventRoutes;