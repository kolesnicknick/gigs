const passport = require('passport');
const createError = require('http-errors');
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const indexRouter = require('./modules/routes/index');
const usersRouter = require('./modules/routes/users');
const gigsRouter = require('./modules/routes/gigs');
const jwtAuth = require('./common/passport/jwt-auth');

const app = express();
require('./config/database');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users',  usersRouter);
app.use('/gigs', jwtAuth, gigsRouter);
app.use(bodyParser.urlencoded({extended: false}));

//HandleBars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started at port: ${PORT}`));

module.exports = app;

