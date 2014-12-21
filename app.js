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
        bodyWeight : Number,
        effortRating : Number,
        grips : [{name : String, sets : Number, resistance : Number, repMax : Number}]}
);

mongoose.model('workouts', workoutSchema);

app.get('/workouts', function(req, res) {
    mongoose.model('workouts').find(function(err, workouts) {
        console.log(workouts);
        res.send(workouts);
    });
});

app.post('/update', function (req, res) {
  mongoose.model('workouts').insert('{date : "12/12/2014",index: "1", type : "volume", repetitions : "3", bodyWeight : 149, effortRating : 9, grips : [{name : "half-crimp", sets : 4, resistance : 0, repMax : 200},{name : "pinch", sets : 2, resistance : 5, repMax : 200},{name : "Middle-three, 2-pad pocket", sets : 5, resistance : 10, repMax : 200}]}');

});


module.exports = app;
