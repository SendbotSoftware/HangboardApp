var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    workoutSchema = new Schema({
        sessionNumber: String,
        date: String,
        type: String,
        repetitions: String,
        bodyWeight: Number,
        effortRating: Number,
        grips: [],
        sets: [],
        resistance: [],
        repMax: [],
        _userID: Schema.ObjectId
    });

module.exports = mongoose.model('workouts', workoutSchema);