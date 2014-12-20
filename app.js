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
    mongoose.connect('mongodb://localhost:27017/climb');
}

// TODO this is a temporary schema just to experiment with Mongoose + mongo
var workoutSchema = new Schema({
        date : String, //TODO @rohanbk, @kerwinloukusa We should be using a JS Date Object, not a String
        index: String,
        type : String,
        repetitions : String,
        weight : Number,
        RPE : Number,
        grips : [{name : String, sets : Number, resistance : Number, RM : Number}]}
);

mongoose.model('workouts', workoutSchema);

app.get('/workouts', function(req, res) {
    mongoose.model('workouts').find(function(err, workouts) {
        console.log(workouts);
        res.send(workouts);
    });
});

module.exports = app;
