
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
            'click .delete': 'deleteUser'
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
    workouts2 = workoutsCollection.where({sessionNumber: '1'});
    return [workouts2[0].attributes];
};

generateWorkout = function(workoutsCollection,userEnteredBodyweight){
    lastWorkout = getLastWorkout(workoutsCollection);

    var sessionNumberTemp = (+lastWorkout[0].sessionNumber+1).toString(),
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
return 99;
}

//calculate workout Reps based upon workout type
function calculate_reps(wo_type) {

     if (wo_type == "volume") {
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

return 100;
//    var res_min = -100;
//    var res_max =  100;
//    var diff = 0;
//    var res_avg = 0;
//
//    // search pattern chops search interval in half each iteration,
//    // adjusting search range -50:50 to -100:100 does not have effect
//    // on search time, but changing the diff-criteria does.
//    while (true) {
//        diff = calculate_1rm(reps, rpe, weight + res_avg) - one_rep_max;
//        if ((Math.abs(diff) < 5)) {
//            return res_avg;
//        }
//        // if diff is negative, res_avg is to small, make min_res equal
//        // to avg and restart search with new search interval.
//        if(diff<0){
//           res_min = res_avg;
//        }else{
//          res_max = res_avg;
//        }
//        res_avg = (res_min+res_max)/2;
//    }
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

//generate inital workout for cycle
function generate_initial() {
    var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
    var input = sheets[0];
    var database = sheets[1];

    var weight = input.getRange("D2").getValue();
    var rpe = 10;
    var reps = 1;

    //if there is no entry on line 9, generate inital entry.
    //if there are already entries find last entry, add empty row,
    // then generate new intial conditions.
    if (database.getRange("A9").getValue() < 1) {
        database.getRange("A9").setValue(getDate());
        database.getRange("B9").setValue("1");
        database.getRange("C9").setValue("v");
        database.getRange("D9").setValue("1");
        database.getRange("E9").setValue(weight);
        database.getRange("F9").setValue("10");
        database.getRange("G9").setValue("=($H9+$E9)/(HLOOKUP(D9,C$1:L$5,11-F9+1, FALSE)/100)");
        database.getRange("H9").setValue(calculate_resistance(reps, rpe, weight, input.getRange("D33").getValue()));
        database.getRange("J9").setValue("=($E9+$K9)/(HLOOKUP(D9,C$1:L$5,11-F9+1, FALSE)/100)");
        database.getRange("K9").setValue(calculate_resistance(reps, rpe, weight, input.getRange("F33").getValue()));
        database.getRange("M9").setValue("=($E9+$N9)/(HLOOKUP(D9,C$1:L$5,11-F9+1, FALSE)/100)");
        database.getRange("N9").setValue(calculate_resistance(reps, rpe, weight, input.getRange("H33").getValue()));
    } else {
        var lRow = database.getLastRow();
        var lCol = database.getLastColumn();
        var range = database.getRange(lRow, 1, 1, lCol);
        database.insertRowsAfter(lRow, 2);
        range.copyTo(database.getRange(lRow + 2, 1, 1, lCol), {
            contentsOnly: false
        });
        database.getRange("A" + (lRow + 2).toString()).setValue(getDate());
        database.getRange("B" + (lRow + 2).toString()).setValue("1");
        database.getRange("C" + (lRow + 2).toString()).setValue("v");
        database.getRange("D" + (lRow + 2).toString()).setValue(reps);
        database.getRange("E" + (lRow + 2).toString()).setValue(weight);
        database.getRange("F" + (lRow + 2).toString()).setValue(rpe);
        database.getRange("H" + (lRow + 2).toString()).setValue(calculate_resistance(reps, rpe, weight, input.getRange("D33").getValue()));
        database.getRange("K" + (lRow + 2).toString()).setValue(calculate_resistance(reps, rpe, weight, input.getRange("F33").getValue()));
        database.getRange("N" + (lRow + 2).toString()).setValue(calculate_resistance(reps, rpe, weight, input.getRange("H33").getValue()));
    }

}
