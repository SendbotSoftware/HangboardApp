var express = require('express')
    , path = require('path')
    , favicon = require('serve-favicon')
    , logger = require('morgan')
    , cookieParser = require('cookie-parser')
    , bodyParser = require('body-parser')
    , application_root = __dirname
    , mongoose = require('mongoose')
    , config = require('./config')
    , app = express()
    , Schema = mongoose.Schema
    , flash = require('connect-flash')
    , passport
    , expressSession
    , initPassport
    , routes;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// view engine setup
// TODO refactor node views and use Handlebars instead of Jade
app.set('views', path.join(application_root, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(application_root, 'site'), {index:false}));


if (app.get('env') === 'development') {
    console.log("Attempting to connect to dev environment Mongo instance...");
    // TODO figure out how to use config.js
    mongoose.connect('mongodb://localhost:27017/climb');
}

// Configuring Passport
passport = require('passport');
expressSession = require('express-session');
// TODO - Why Do we need this key ?
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());

// Using the flash middleware provided by connect-flash to store messages in session
// and displaying in templates
app.use(flash());

// Initialize Passport
initPassport = require('./passport/init');
initPassport(passport);

routes = require('./routes/index')(passport);
app.use('/', routes);

module.exports = app;
