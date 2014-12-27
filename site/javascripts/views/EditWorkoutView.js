
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
        workoutsCollection : undefined,
        events: {
            'submit .edit-workout-form': 'saveUser',
        },
        _getWorkout : function(workoutsCollection,workoutID){


            return workoutsCollection.findWhere({_id: workoutID});
        },

        saveUser: function (ev) {
            var workoutDetails = $(ev.currentTarget).serializeObject(),
            workoutModel = this._getWorkout(this.workoutsCollection,this.id),
            self = this;


            workoutModel.save(workoutDetails, {
                success: function () {
                     self.undelegateEvents();
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
            this.id = id;

        },

        render: function (id) {
            var self = this,
            workoutsCollection = new WorkoutsCollection();
            workoutsCollection.fetch({
                success: function (data) {
                    self.$el.html(self.template({workout: [workoutsCollection.where({_id: id})[0].attributes]}));
                    self.workoutsCollection = workoutsCollection;
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


