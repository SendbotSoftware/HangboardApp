
define([
    'jquery',
    'handlebars',
    'backbone',
    'text!templates/NewWorkoutTemplate.html',
    'collections/WorkoutsCollection',
    'models/WorkoutModel'

], function($, handlebars, Backbone ,NewWorkoutTemplate,WorkoutsCollection,WorkoutModel){
    var NewWorkOutView = Backbone.View.extend({
        el: '.page',
        template: handlebars.compile(NewWorkoutTemplate),
        router: undefined,
        events: {
            'submit .new-workout-form': 'saveUser',
        },
        saveUser: function (ev) {
            var workoutDetails = $(ev.currentTarget).serializeObject(),
                workoutModel = new WorkoutModel(),
                self = this;

            workoutModel.save(workoutDetails, {
                success: function () {
                    self.undelegateEvents();
                    self.router.navigate('', {trigger:true});
                }
            });

            return false;
        },

        initialize: function(router,userEnteredBodyweight) {
            this.render(userEnteredBodyweight);
            this.router = router;
        },

        render: function (userEnteredBodyweight) {
            var self = this,
            workoutsCollection = new WorkoutsCollection(),
            workouts = [];
            workoutsCollection.fetch({
                 success: function (data) {
                     $.each(data.models, function(index, model) {
                     workouts.push(model.attributes);
                     });
                     length = workouts.length;
                     if (length<1){
                        self.$el.html(self.template({workout: [generateInitialWorkout(userEnteredBodyweight)]}));
                     }else{
                        self.$el.html(self.template({workout: [generateWorkout(workoutsCollection,userEnteredBodyweight)]}));
                     }
                 }
            });
        }
    });
    return NewWorkOutView;
});

$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

generateInitialWorkout = function(userEnteredBodyweight){

    var sessionNumberTemp = '1',
    dateTemp = getDate(),
    typeTemp = 'volume',
    repetitionsTemp = calculate_reps("volume"),
    bodyWeightTemp = userEnteredBodyweight,
    effortRatingTemp = calculate_rpe().toString(),
    gripsTemp = ['half crimp','pinch','3FP'],
    setsTemp = ['4', '4', '4'],
    resistanceTemp = ['15', '15', '17'],
    repMaxTemp = ['145', '155' ,'165'];

    workout = {
        sessionNumber: sessionNumberTemp,
        date : dateTemp,
        type : typeTemp,
        repetitions : repetitionsTemp,
        bodyWeight : bodyWeightTemp,
        effortRating : effortRatingTemp,
        grips : gripsTemp,
        sets : setsTemp,
        resistance : resistanceTemp,
        repMax : repMaxTemp
    };
    return workout;
};

getLastWorkout = function(workoutsCollection){
    return [workoutsCollection.where({sessionNumber: workoutsCollection.length.toString()})[0].attributes];
};

generateWorkout = function(workoutsCollection,userEnteredBodyweight){

    //get lastworkout from collection and build new workout variables
    var lastWorkout = getLastWorkout(workoutsCollection),
    workoutType = 'volume',
    repetitions = calculate_reps(workoutType),
    effortRating = calculate_rpe().toString(),
    resistance = [Math.round(100* calculate_resistance(+repetitions, +effortRating, +userEnteredBodyweight, +lastWorkout[0].repMax[0]+wt_increase()))/100,
                  Math.round(100* calculate_resistance(+repetitions, +effortRating, +userEnteredBodyweight, +lastWorkout[0].repMax[1]+wt_increase()))/100,
                  Math.round(100* calculate_resistance(+repetitions, +effortRating, +userEnteredBodyweight, +lastWorkout[0].repMax[2]+wt_increase()))/100],
    repMax = [Math.round(100* calculate_1rm(+repetitions, +effortRating, +userEnteredBodyweight+(+resistance[0])).toString())/100,
              Math.round(100* calculate_1rm(+repetitions, +effortRating, +userEnteredBodyweight+(+resistance[1])).toString())/100,
              Math.round(100* calculate_1rm(+repetitions, +effortRating, +userEnteredBodyweight+(+resistance[2])).toString())/100];

    // build workout object and return to view to be rendered by template
    workout = {
        sessionNumber: (+lastWorkout[0].sessionNumber+1).toString(),
        date : getDate(),
        type : workoutType,
        repetitions : repetitions,
        bodyWeight : userEnteredBodyweight,
        effortRating : effortRating,
        grips : ['half crimp','pinch','3FP'],
        sets : ['','',''],
        resistance : resistance,
        repMax : repMax
    };
    return workout;
};


//calculate RPE number based upon workout type and reps
function calculate_rpe(wo_type, reps) {
//    var rpe = 0;
//    if (wo_type.toUpperCase() == "V") {
//        if (reps > 3) {
//            return 9;
//        } else {
//            return 8;
//        }
//    } else {
//        return 9;
//    }
return 9;
}

//calculate workout Reps based upon workout type
function calculate_reps(wo_type) {

     if (wo_type == 'volume') {
          return (Math.floor(Math.random() * 4) + 3);
      } else {
          return (Math.floor(Math.random() * 3) + 1);
      }
}

//caclulate current date
function getDate() {
    var date = new Date(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        year = date.getFullYear();
    return month + '-' + day + '-' + year;
}

//find right resistance for given rpe, reps
function calculate_resistance(reps, rpe, weight, one_rep_max) {

    var res_min = -100;
    var res_max =  100;
    var diff = 0;
    var res_avg = 0;

    // search pattern chops search interval in half each iteration,
    // adjusting search range -50:50 to -100:100 does not have effect
    // on search time, but changing the diff-criteria does.
    while (true) {
        diff = calculate_1rm(reps, rpe, weight + res_avg) - one_rep_max;
         console.log(diff);
        if ((Math.abs(diff) < .1)) {
            return res_avg;
        }
        // if diff is negative, res_avg is to small, make min_res equal
        // to avg and restart search with new search interval.
        if(diff<0){
           res_min = res_avg;
        }else{
          res_max = res_avg;
        }
        res_avg = (res_min+res_max)/2;

        //if the range is not wide enough, break out instead of crashing instance
        if (Math.abs(res_avg-res_max)<.001){
            return 0;
        }if (Math.abs(res_avg-res_min)<.001){
            return 0;
        }
    }
};

//calculate weight increase from previous sesion.
function wt_increase() {
    return 2;
};

//calculate 1rm
function calculate_1rm(reps, rpe, weight) {
    var array = [
        [62, 66, 71, 74, 77, 80, 85, 90, 95, 100],
        [60, 64, 68, 71, 74, 77, 80, 85, 90, 95],
        [58, 62, 66, 68, 71, 74, 77, 80, 85, 90],
        [56, 60, 64, 66, 68, 71, 74, 77, 80, 85]
    ];
    var row = 10 - rpe;
    var column = 10 - reps;
    var percent = array[row][column];
    return weight / (percent / 100);
};

