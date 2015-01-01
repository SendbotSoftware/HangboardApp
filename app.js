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

var mongooseWorkoutModel = mongoose.model('workouts', new Schema({
        sessionNumber: String,
        date : String, //TODO @rohanbk, @kerwinloukusa We should be using a JS Date Object, not a String
        type : String,
        repetitions : String,
        bodyWeight : Number,
        effortRating : Number,
        grips : [],
        sets : [],
        resistance : [],
        repMax : []
    })
);

app.get('/workouts', function(req, res) {
    mongooseWorkoutModel.find(function(err, workouts) {
        res.send(workouts);
    });
});

app.post('/update', function (req, res) {
    var workout = {
            _id: req.body._id,
            sessionNumber : req.body.sessionNumber,
            date: req.body.date,
            index: req.body.index,
            type: req.body.type,
            repetitions: req.body.repetitions,
            bodyWeight: req.body.bodyWeight,
            effortRating: req.body.effortRating,
            grips: [],
            sets: req.body.sets,
            resistance: req.body.resistance,
            repMax: req.body.repMax
        },
        options = {upsert: true};

    if(!workout['_id']) {
        workout['_id'] = new mongoose.mongo.ObjectID()
    }

    mongooseWorkoutModel.findOneAndUpdate({_id: workout['_id']}, workout, options, function(){
        res.send(true);
    });
});



module.exports = app;
