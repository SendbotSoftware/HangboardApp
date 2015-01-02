var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    workoutModel = require('../models/workoutModel');

router.use(function(req, res, next) {
  next();
});

router.route('/workouts').get(function(req, res) {
    workoutModel.find(function(err, workouts) {
      res.send(workouts);
    });
});

router.route('/update').post(function (req, res) {
  var workout = {
        _id: req.body._id,
        sessionNumber : req.body.sessionNumber,
        date : req.body.date,
        index: req.body.index,
        type : req.body.type,
        repetitions : req.body.repetitions,
        bodyWeight : req.body.bodyWeight,
        effortRating : req.body.effortRating,
        grips : [],
        sets : req.body.sets,
        resistance : req.body.resistance,
        repMax : req.body.repMax
      },
      options = {upsert: true};

  if(!workout['_id']) {
    workout['_id'] = new mongoose.mongo.ObjectID()
  }

  workoutModel.findOneAndUpdate({_id: workout['_id']}, workout, options, function(){
    res.send(true);
  });
});

module.exports = router;
