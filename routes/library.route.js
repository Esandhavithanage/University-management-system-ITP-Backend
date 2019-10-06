const express = require('express');
const app = express();
var mysql = require('mysql');
const con = require('../DB');
const libraryRoutes = express.Router();

// get books
libraryRoutes.route('/getBooks').get(function(req, res) {
    console.log("called");
    var sql = "SELECT bookId as bookId, title as title, publisher as publisher, ISBM as isbm, autherId as autherId " +
        "FROM book b " +
        "ORDER BY bookId; ";

    con.query(sql, function(err, result) {
        if (err) {
            console.log(err.code);
        } else {
            console.log(result);
            res.json(result);
        }

    });
});

// add book
libraryRoutes.route('/addBook').post(function(req, res) {
    console.log(req.body);
    var bookId = req.body.bookId;
    var title = req.body.title;
    var publisher = req.body.publisher;
    var isbm = req.body.isbm;
    var autherId = req.body.autherId;

    var sql = "INSERT INTO book (`bookId`, `title`, `publisher`, `ISBM`, `autherId`) " +
        "VALUES ('" + bookId + "', '" + title + "', '" + publisher + "', '" + isbm + "', '" + autherId + "') ;";


    con.query(sql, function(err, result) {
        if (err) {
            console.log(err.code);
            res.json(err.code);
        } else {
            console.log("added" + result);
            res.json("success");
        }

    });
});

// update book
libraryRoutes.route('/updateBook').post(function(req, res) {
    console.log(req.body);
    var bookId = req.body.bookId;
    var title = req.body.title;
    var publisher = req.body.publisher;
    var isbm = req.body.isbm;
    var autherId = req.body.autherId;

    var sql = "UPDATE book SET title='" + title + "', publisher='" + publisher + "', ISBM='" + isbm + "', autherId='" + autherId + "' " +
        "WHERE bookId='" + bookId + "'; ";


    con.query(sql, function(err, result) {
        if (err) {
            console.log(err.code);
            res.json(err.code);
        } else {
            console.log("updated" + result);
            res.json("success");
        }

    });
});

// delete book
libraryRoutes.route('/deleteBook/:id').get(function(req, res) {

    var bookId = req.params.id;
    console.log(bookId);

    var sql = "DELETE FROM book WHERE bookId='" + bookId + "'; ";

    con.query(sql, function(err, result) {
        if (err) {
            console.log(err.code);
            res.json(err.code);
        } else {
            console.log("deleted" + result);
            res.json("success");
        }

    });
});

// get borrow records
libraryRoutes.route('/getBorrowRecrods').get(function(req, res) {
    console.log("called");

    var sql = "SELECT studentId as studentId, cBookId as cBookId, borrowDate as borrowDate, returnDate as returnDate, fine as fine " +
        "FROM borrow " +
        "ORDER BY borrowDate ";

    con.query(sql, function(err, result) {
        if (err) {
            console.log(err.code);
        } else {
            console.log(result);
            res.json(result);
        }

    });
});

// add borrow records 1 insert into cBook
libraryRoutes.route('/addTocopybook').post(function(req, res) {
    console.log("called");
    var studentId = req.body.studentId;
    var bookId = req.body.bookId;
    var borrowDate = req.body.borrowDate;
    var returnDate = req.body.returnDate;


    var sql1 = "INSERT INTO copybook (`isBorrowed`, `bookId`) " +
        "VALUES ('true', '" + bookId + "'); ";

    con.query(sql1, function(err, result) {
        if (err) {
            console.log(err.code);
        } else {
            console.log("added to cBook" + JSON.stringify(result));
            //res.json(JSON.stringify(result));
            res.json(result);
        }


    });

});

// add borrow records 2 insert to borrow
libraryRoutes.route('/addToBorrow').post(function(req, res) {
    console.log(req.body);
    var studentId = req.body.studentId;
    var bookId = req.body.bookId;
    var borrowDate = req.body.borrowDate;
    var returnDate = req.body.returnDate;
    var cBookId = req.body.cBookId;

    var sql = "INSERT INTO borrow (`studentId`, `cBookId`, `borrowDate`, `returnDate`) " +
        "VALUES (?, ?, ?, ?); ";

    con.query(sql, [studentId, cBookId, borrowDate, returnDate], function(err, result) {
        if (err) {
            console.log(err.code);
            res.json(err.code);
        } else {
            console.log("added to borrow" + result);
            res.json("success");
        }

    });

});

// delete borrow records
libraryRoutes.route('/deleteBorrowRecord/:id').get(function(req, res) {
    console.log("called");
    var id = req.params.id;

    var sql = "DELETE FROM borrow WHERE cBookId='" + id + "'; ";

    con.query(sql, function(err, result) {
        if (err) {
            console.log(err.code);
            res.json(err.code);
        } else {
            console.log("deleted" + result);
            res.json("success");
        }

    });
});

// get Authers
libraryRoutes.route('/getAuthers').get(function(req, res) {
    console.log("called");
    var sql = "SELECT autherId as autherId, name as name, TP as TP, address as address " +
        "FROM auther " +
        "ORDER BY autherId; ";

    con.query(sql, function(err, result) {
        if (err) {
            console.log(err.code);
        } else {
            console.log(result);
            res.json(result);
        }

    });
});


// add auther
libraryRoutes.route('/addAuther').post(function(req, res) {
    console.log(req.body);
    var name = req.body.name;
    var TP = req.body.TP;
    var address = req.body.address;

    var sql = "INSERT INTO auther (`name`, `TP`, `address`) " +
        "VALUES ('" + name + "', '" + TP + "', '" + address + "') ;";


    con.query(sql, function(err, result) {
        if (err) {
            console.log(err.code);
            res.json(err.code);
        } else {
            console.log("added" + result);
            res.json("success");
        }

    });
});


// update auther
libraryRoutes.route('/updateAuther').post(function(req, res) {
    console.log(req.body);
    var autherId = req.body.autherId;
    var name = req.body.name;
    var TP = req.body.TP;
    var address = req.body.address;

    var sql = "UPDATE auther SET name='" + name + "', TP='" + TP + "', address='" + address + "' " +
        "WHERE autherId='" + autherId + "'; ";


    con.query(sql, function(err, result) {
        if (err) {
            console.log(err.code);
            res.json(err.code);
        } else {
            console.log("updated" + result);
            res.json("success");
        }

    });
});


// delete auther
libraryRoutes.route('/deleteAuther/:id').get(function(req, res) {
    var autherId = req.params.id;
    console.log(autherId);

    var sql = "DELETE FROM auther WHERE autherId='" + autherId + "'; ";

    con.query(sql, function(err, result) {
        if (err) {
            console.log(err.code);
            res.json(err.code);
        } else {
            console.log("deleted" + result);
            res.json("success");
        }

    });
});

module.exports = libraryRoutes;