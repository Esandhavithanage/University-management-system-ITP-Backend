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
    console.log(studentId);

    var sql = "INSERT INTO studentevent (`studentId`, `eventId`, `date`) " +
        "VALUES ('"+studentId+"', '"+id+"', '"+date+"'); ";

    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("added" + result);
        res.json(result);
    });

});

// get registered students event
eventRoutes.route('/getRStudents').get(function (req, res) {
    console.log(req.body);
    
    var sql = "SELECT se.studentId as studentId, se.eventId as eventId, se.date as date, s.name as studentName, e.title as eventName " +
        "FROM studentevent se, student s, event e " +
        "WHERE se.studentId = s.studentId AND se.eventId = e.eventId " +
        "ORDER BY se.eventId ";

    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
        res.json(result);
    });

});

// delete registered students event
eventRoutes.route('/deleteRStudents/:eventId/:studentId').get(function (req, res) {
    console.log(req.body);
    var eventId = req.params.eventId;
    var studentId = req.params.studentId;
    
    var sql = "DELETE FROM studentevent WHERE eventId='"+eventId+"' AND studentId='"+studentId+"' ";

    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("deleted " + result);
        res.json(result);
    });

});


module.exports = eventRoutes;