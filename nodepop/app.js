var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const LoginController = require('./controllers/LoginController');
const jwtAuth = require('./lib/jwtAuthMiddleware');
const isAPIRequest = require('./lib/utils');
const i18n = require('./lib/i18nConfigure');

var indexRouter = require('./routes/index');
var articulosRouter = require('./routes/api/articulos');

var app = express();
var loginController = new LoginController();

require('./lib/connectMongoose');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);

app.locals.title = 'NodeApp';

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Setup de i18n
app.use(i18n.init);

app.use('/api/articulos', jwtAuth, articulosRouter);
app.post('/api/authenticate', loginController.postJWT);

app.use('/', indexRouter);
app.use('/change-locale', require('./routes/change-locale'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);

  // si es un error en el API respondo JSON
  if (isAPIRequest(req)) {
    res.json({ error: err.message });
    return;
  }
  res.render('error');
});

module.exports = app;
