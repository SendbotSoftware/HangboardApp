
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
                var workoutDetails = $(ev.currentTarget).serializeObject();
                var workoutModel = new WorkoutModel();
                workoutModel.save(workoutDetails, {
                  success: function () {
                    this.router.navigate('', {trigger:true});

                    }
                });
                console.log('return false');
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
                            self.$el.html(self.template({workouts: [workouts[id]]}));
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