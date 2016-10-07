// Load required packages
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var ejs = require('ejs');
//load config
var config = require('./config');

//connect to db
mongoose.connect(config.database, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('connected to db');
    }
});

//set port
var port = process.env.PORT || config.port;
//create app
var app = express();
//use middleware
app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
//use bodyparser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static('public'));

//passport
app.use(passport.initialize());
app.use(passport.session());
//viewengine
app.set('views', './src/views');
app.set('view engine', 'ejs');
app.set('superSecret', config.secret); // secret variable
//setup passport
var passportConfig = require('./src/config/passportConfig')();
//create router for routes
var loginRouter = require('./src/routes/loginRoute');
var dashboardRouter = require('./src/routes/dashboardRoute');
var slidesViewRouter = require('./src/routes/slidesViewRoute');
var displayRouter = require('./src/routes/displayRoute');
var slideRouter = require('./src/routes/slideRoute');
var userRouter = require('./src/routes/userRoute');
//use routers as middleware
//views
app.use('/', loginRouter(passportConfig));
app.use('/dashboard', dashboardRouter(passportConfig));
app.use('/slides', slidesViewRouter(passportConfig));
app.use('/display', displayRouter(passportConfig));
//api
app.use('/api/slides', slideRouter(passportConfig));
app.use('/api/users', userRouter(passportConfig));

//start server
app.listen(port);
console.log('Create slides on port: ', port);