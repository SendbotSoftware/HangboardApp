var express = require('express')
    , path = require('path')
    , favicon = require('serve-favicon')
    , logger = require('morgan')
    , cookieParser = require('cookie-parser')
    , bodyParser = require('body-parser')
    , routes = require('./routes/index')
    , application_root = __dirname
    , mongoose = require('mongoose')
    , config = require('./config')
    , app = express()
    , Schema = mongoose.Schema;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(application_root, 'site')));

app.use('/', routes);

if (app.get('env') === 'development') {
    console.log("Attempting to connect to dev environment Mongo instance...");
    // TODO figure out how to use config.js
    mongoose.connect('mongodb://localhost/climbTraining');
}

// TODO this is a temporary schema just to experiment with Mongoose + mongo
var hangboardingSchema = new Schema({
    date: String,
    index: String,
    type: String,
    repetitions: String,
    weight: Number,
    RPE: Number
});
mongoose.model('hangboarding', hangboardingSchema);
var userSchema = new Schema({name : String});
mongoose.model('users', userSchema);

app.get('/hangboarding', function(req, res) {
    mongoose.model('hangboarding').find(function(err, workouts) {
        console.log(workouts);
        res.send(workouts);
    });
});

app.get('/users', function(req, res) {
    mongoose.model('users').find(function(err, foo) {
        res.send(foo);
    });
});

module.exports = app;
