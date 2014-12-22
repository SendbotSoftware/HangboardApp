
define([
    'jquery',
    'handlebars',
    'backbone',
    'text!templates/NewWorkoutTemplate.html',
    'collections/WorkoutsCollection',
    'models/WorkoutModel'

], function($, handlebars, Backbone ,NewWorkoutTemplate,WorkoutsCollection,WorkoutModel){
    var EditWorkoutView = Backbone.View.extend({
        el: '.page',
        template: handlebars.compile(NewWorkoutTemplate),
        router: undefined,
        events: {
            'submit .edit-workout-form': 'saveUser',
            'click .delete': 'deleteUser'
        },
        saveUser: function (ev) {
            var workoutDetails = $(ev.currentTarget).serializeObject(),
                workoutModel = new WorkoutModel(),
                self = this;

            workoutModel.save(workoutDetails, {
                success: function () {
                    self.router.navigate('', {trigger:true});
                }
            });

            return false;
        },

        initialize: function(router) {
            this.render();
            this.router = router;
        },

        render: function () {
                    var self = this,
                        workouts2 = [generateWorkout()];
                        self.$el.html(self.template({workouts: workouts2}));

                }
    });
    return EditWorkoutView;
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

generateWorkout = function(){
    workout = {
        sessionNumber: '1',
        date : '12/14/204',
        type : 'volume',
        repetitions : '2',
        bodyWeight : '175',
        effortRating : '9',
        grips : ['half crimp','pinch','3FP'],
        sets : ['4', '4', '4'],
        resistance : ['10', '15', '17'],
        repMax : ['145', '155' ,'165']
    };
    return workout;
};