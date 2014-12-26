
define([
    'jquery',
    'handlebars',
    'backbone',
    'text!templates/editWorkoutTemplate.html',
    'collections/WorkoutsCollection',
    'models/WorkoutModel'

], function($, handlebars, Backbone ,EditWorkoutTemplate,WorkoutsCollection,WorkoutModel){
    var EditWorkoutView = Backbone.View.extend({
        el: '.page',
        template: handlebars.compile(EditWorkoutTemplate),
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
        deleteUser: function (ev) {
            this.user.destroy({
                success: function () {
                    console.log('destroyed');
                    router.navigate('', {trigger:true});
                }
            });
            return false;
        },

        initialize: function(id,router) {
            this.render(id);
            this.router = router;
        },

render: function (id) {
            var self = this,
                workoutsCollection = new WorkoutsCollection(),
                workouts = [];

            workoutsCollection.fetch({
                success: function (data) {
                    $.each(data.models, function(index, model) {
                        workouts.push(model.attributes);
                    });

                    workouts2 = workoutsCollection.where({sessionNumber: '1'});
                    workouts3 = workouts2[0];
                    workouts3 = [workouts3.attributes];
                    self.$el.html(self.template({workouts3: workouts3}));
                }
            });
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

findWorkout = function(workoutsCollection,id){
    var self = this,
                    workoutsCollection = new WorkoutsCollection(),
                    workouts = [];

                workoutsCollection.fetch({
                    success: function (data) {
                        $.each(data.models, function(index, model) {
                            workouts.push(model.attributes);
                        });

                        workouts2 = workoutsCollection.where({sessionNumber: id.toString()});
                        workouts3 = workouts2[0];
                        return [workouts3.attributes];
                    }
                });

};