const express = require('express');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
// const logger = require('morgan');
const logger = require('./log/logger').logerMiddleware
// router
const blockRouter = require('./routes/block');
const nodeRouter = require('./routes/node');
const groupRouter = require('./routes/group');
const transactionRouter = require('./routes/transaction');
const contractRouter = require('./routes/contract');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use((req, res, next) => { logger.logerMiddleware(req, res, next) });

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Credentials', "true");
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE,OPTIONS');
  if (req.method == 'OPTIONS') {
    res.sendStatus(200);
  }
  else {
    next();
  }
});


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//rotues
// app.use(logger)
app.use('/block', blockRouter);
app.use('/node', nodeRouter);
app.use('/group', groupRouter);
app.use('/transaction', transactionRouter);
app.use('/contract', contractRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  let errJson = err;
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  if (typeof (err.message) == 'string' && err.message.indexOf("Not Found") !== -1) {
    errJson = { code: 404, message: "Not Found" };
  }
  res.status(err.status || 500);
  res.json({
    code: errJson.code,
    msg: errJson.message,
    data: null
  });
});

module.exports = app;
