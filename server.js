const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors');

const employeeRoute = require('./routes/employee.route');
const financialRoute = require('./routes/financial.route');
const studentRoute = require('./routes/student.route');
const otherRoute = require('./routes/other.route');
const eventRoute = require('./routes/event.route');
const libraryRoute = require('./routes/library.route');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/employee', employeeRoute);
app.use('/financial', financialRoute);
app.use('/student', studentRoute);
app.use('/other', otherRoute);
app.use('/event', eventRoute);
app.use('/library', libraryRoute);
const port = process.env.PORT || 4001;

const server = app.listen(port, function(){
  console.log('Listening on port ' + port);
});