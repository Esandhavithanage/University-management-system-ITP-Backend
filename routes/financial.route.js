const express = require('express');
const app = express();
var mysql = require('mysql');
const con = require('../DB');
const financialRoutes = express.Router();

// get employee salary
financialRoutes.route('/getSalary/:id').get(function(req, res) {
    var id = req.params.id;

    sql = "SELECT s.salaryId as salId, s.basicsalary as basicSal, s.OTAmount as OTAmount, s.EPF as EPF, s.ETF as ETF, e.name as empName " +
        "FROM salary s, employee e " +
        "WHERE s.salaryId = e.salaryId AND e.employeeId = '" + id + "'; ";

    con.query(sql, function(err, result) {
        if (err) {
            console.log(err.code);
        } else {
            console.log(result);
            res.json(result);
        }

    });

});

// cal attendance return OT hours
financialRoutes.route('/getOT/:id/:startDate/:endDate').get(function(req, res) {
    var id = req.params.id;
    var startDate = req.params.startDate;
    var endDate = req.params.endDate;
    var OTMinutes = 0;
    var start = new Date(startDate);
    var end = new Date(endDate);
    //console.log(start + " " + end);

    sql = "SELECT arivaleTime as aTime, exitTime as eTime, date as date, employeeId as empId " +
        "FROM attendance " +
        "WHERE employeeId = '" + id + "';";

    con.query(sql, function(err, result) {
        if (err) {
            console.log(err.code);
        } else {
            if (result == 0) {
                console.log("result" + result);
                res.json("noEmp");
            } else {
                for (var i in result) {

                    // check date range
                    if (new Date(result[i].date) >= start && new Date(result[i].date) <= end) {
                        var eTime1 = new String(result[i].eTime);
                        var hours = eTime1.substring(0, 2);
                        var minutes = eTime1.substring(3, 5) + hours * 60;
                        var offTime = 17 * 60 + 30;

                        // console.log("h-" + hours);
                        // console.log("m-" + minutes);

                        // check timeoff
                        if (minutes > offTime) {
                            OTMinutes += minutes - offTime;
                        } else {
                            OTMinutes += 0;
                        }

                    }

                }
                var totalOT = (OTMinutes / 60);
                console.log("total" + totalOT);
                res.json(totalOT);
            }

        }

    });

});

// get all expenses
financialRoutes.route('/getAllExpences').get(function(req, res) {

    var sql = "SELECT ex.expenseId as expenseId, ex.type as type, ex.amount as amount, ex.date as date, ex.employeeId as employeeId, em.name as employeeName " +
        "FROM extraexpense ex, employee em " +
        "WHERE ex.employeeId = em.employeeId " +
        "ORDER BY ex.expenseId DESC; ";

    con.query(sql, function(err, result) {
        if (err) {
            console.log(err.code);
        } else {
            console.log(result);
            res.json(result);
        }

    });
});

// add expenses
financialRoutes.route('/addExpense').post(function(req, res) {

    console.log(req.body);
    var empId = req.body.id;
    var type = req.body.type;
    var amount = req.body.amount;
    var date = req.body.date;

    var sql = "INSERT INTO `ums`.`extraexpense`(`type`,`amount`,`date`, `employeeId`)" +
        "VALUES('" + type + "','" + amount + "','" + date + "', '" + empId + "');";

    try {
        con.query(sql, function(err, result) {
            if (err) {
                console.log(err.code);
            }
            console.log("1 record inserted, ID: " + result);
            res.json(result);
        });
    } catch (error) {
        console.log(error);

    }



});

// update expences
financialRoutes.route('/updateExpense').post(function(req, res) {
    var empId = req.body.empId;
    var expenseId = req.body.expenseId;
    var date = req.body.date;
    var type = req.body.type;
    var amount = req.body.amount;

    var sql = "UPDATE extraexpense SET type='" + type + "', amount='" + amount + "', date='" + date + "', employeeId='" + empId + "' " +
        "WHERE expenseId='" + expenseId + "'; ";

    try {
        con.query(sql, function(err, result) {
            if (err) {
                console.log(err.code);
                res.json(err.code);
            } else {
                console.log("1 record updated" + result);
                res.json(result);
            }
        });

    } catch (error) {
        console.log(error);
    }

});

// delete expences
financialRoutes.route('/deleteExpense/:id').get(function(req, res) {
    var id = req.params.id;
    console.log(id);

    var sql = "DELETE FROM extraexpense WHERE expenseId=" + id;

    con.query(sql, function(err, result) {
        if (err) {
            console.log(err.code);
        } else {
            console.log("1 record deleted" + result);
            res.json(result);
        }

    });

});

// get filtered incomes
financialRoutes.route('/searchIncome/:fDate/:tDate').get(function(req, res) {
    var fDate = new Date(req.params.fDate);
    var tDate = new Date(req.params.tDate);
    var filteredIncomes = [];

    var sql = "SELECT paymentId as paymentId, amount as amount, date as date, courseId as courseId, courseId as coueseId FROM payment;"
    con.query(sql, function(err, result) {
        if (err) {
            console.log(err.code);
        } else {
            for (var i in result) {
                var date = new Date(result[i].date);

                if (date >= fDate && date <= tDate) {
                    filteredIncomes.push(result[i]);
                }
            }
            console.log(filteredIncomes);
            res.json(filteredIncomes);
        }

    });

});

// get all income
financialRoutes.route('/getAllIncome').get(function(req, res) {

    var sql = "SELECT paymentId as paymentId, amount as amount, date as date, courseId as courseId, courseId as coueseId FROM payment;"
    con.query(sql, function(err, result) {
        if (err) {
            console.log(err.code);
        } else {
            console.log(result);
            res.json(result);
        }

    });

});

// get filtered expenses
financialRoutes.route('/searchExpenses/:fDate/:tDate').get(function(req, res) {
    var fDate = new Date(req.params.fDate);
    var tDate = new Date(req.params.tDate);
    var filteredExpences = [];

    var sql = "SELECT ex.expenseId as expenseId, ex.type as type, ex.amount as amount, ex.date as date, ex.employeeId as employeeId, em.name as employeeName " +
        "FROM extraexpense ex, employee em " +
        "WHERE ex.employeeId = em.employeeId;"
    con.query(sql, function(err, result) {
        if (err) {
            console.log(err.code);
        } else {
            for (var i in result) {
                var date = new Date(result[i].date);

                if (date >= fDate && date <= tDate) {
                    filteredExpences.push(result[i]);
                }
            }
            console.log(filteredExpences);
            res.json(filteredExpences);
        }

    });

});

// delete incomes
financialRoutes.route('/deleteIncome/:paymentId').get(function(req, res) {
    var paymentId = req.params.paymentId;
    var sql = "DELETE FROM payment WHERE paymentId= '" + paymentId + "'; ";

    con.query(sql, function(err, result) {
        if (err) {
            console.log(err.code);
            res.json("error");
        } else {
            console.log(result);
            res.json("success");
        }

    });

});

// get money requests
financialRoutes.route('/getMRequests').get(function(req, res) {
    var sql = "SELECT rq.moneyRequestId as moneyRequestId, rq.date as date, rq.amount as amount, rq.description as description, rq.status as status, em.employeeId as employeeId, em.name as employeeName " +
        "FROM moneyrequest rq, employee em " +
        "WHERE rq.employeeId = em.employeeId; ";
    "ORDER BY rq.moneyRequestId DESC;";

    con.query(sql, function(err, result) {
        if (err) {
            console.log(err.code);
        } else {
            console.log(result);
            res.json(result);
        }
    });

});

// accept money requests
financialRoutes.route('/acceptMRequest').post(function(req, res) {
    var id = req.body.reqId;
    var sql = "UPDATE `moneyrequest` SET `status` = 'accepted' WHERE moneyRequestId = '" + id + "' ";
    // console.log(id);

    con.query(sql, function(err, result) {
        if (err) {
            console.log(err.code);
        } else {
            console.log(result);
            res.json(result);
        }
    });
});

// reject money requests
financialRoutes.route('/rejectMRequest').post(function(req, res) {
    var id = req.body.reqId;
    var sql = "UPDATE `moneyrequest` SET `status` = 'rejected' WHERE moneyRequestId = '" + id + "' ";
    // console.log(id);

    con.query(sql, function(err, result) {
        if (err) {
            console.log(err.code);
        } else {
            console.log(result);
            res.json(result);
        }
    });
});

module.exports = financialRoutes;