var express = require('express');
var mustacheExpress = require('mustache-express');
var path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser');
var parseurl = require('parseurl');
var expressValidator = require('express-validator');
var fs = require('fs');
var middleware = require('./middleware');
var router = require('./router');

var app = express();

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', 'views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(expressValidator());
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'keyboard cats',
  resave: false,
  saveUninitialized: true
}));
/////----------MIDDLEWARE---------
app.use(middleware.checkPathNameAndSession);
// do we have a random word?
app.use(middleware.createWord);
/////----------ENDPOINTS

router(app);
//
app.listen(process.env.PORT ||3000, function(){
  console.log("I'm listening");
});

module.exports = app;
