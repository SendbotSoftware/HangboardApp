var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    passport = require('passport'),
    workoutModel = require('../models/workout');

// As with any middleware it is quintessential to call next()
// if the user is authenticated
var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
};

module.exports = function(passport){

    /* GET login page. */
    router.get('/', function(req, res) {
        // Display the Login page with any flash message, if any
        res.render('index', { message: req.flash('message') });
    });

    /* Handle Login POST */
    router.post('/login', passport.authenticate('login', {
        successRedirect: '/home',
        failureRedirect: '/',
        failureFlash : true
    }));

    /* GET Registration Page */
    router.get('/signup', function(req, res){
        res.render('register',{message: req.flash('message')});
    });

    /* Handle Registration POST */
    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/home',
        failureRedirect: '/signup',
        failureFlash : true
    }));

    /* GET Home Page */
    router.get('/home', isAuthenticated, function(req, res){
        res.render('home', { user: req.user });
    });

    /* Handle Logout */
    router.get('/signout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    router.get('/workouts', function(req, res) {
        workoutModel.find(function(err, workouts) {
            res.send(workouts);
        });
    });

    router.post('/update', function (req, res) {
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

    return router;
};
