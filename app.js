var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var sass = require('node-sass-middleware');
var mongoose = require('mongoose');

var fs = require('fs');

var app = express();

mongoose.connect('mongodb://localhost/words');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use(sass({
  src: path.join(__dirname, 'client'),
  dest: path.join(__dirname, 'public'),
  debug: true
  // outputStyle: 'compressed'
}));

app.use(express.static(path.join(__dirname, 'public')));



// app.use('/', index);
// app.use('/users', users);


var oxfordList = [];

function readOxford(cb) {
  fs.readFile(path.join(__dirname, '/docs/oxford.json'), 'utf-8',
    function (err, data) {
      if (err) {
        console.log('err', err)
      } else {
        oxfordList = JSON.parse(data);
      }
    });
}

readOxford();

app.get('/', function (req, res) {
  console.log('index');

  res.json(oxfordList);

  // fs.readFile(path.join(__dirname, '/docs/oxford.json'), 'utf-8',
  //   function (err, data) {
  //     console.log('data', data)
  //     if (err) {
  //       console.log('err', err)
  //     } else {
  //       var words = JSON.parse(data);
  //       res.json(words)
  //     }
  //   });

  // readOxford(function (words) {
  //   res.json(words);
  // })
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;