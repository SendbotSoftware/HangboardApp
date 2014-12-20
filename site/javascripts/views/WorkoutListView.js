define([
    'jquery',
    'handlebars',
    'backbone',
    'text!templates/workoutListTemplate.html',
    'collections/WorkoutsCollection'

], function($, handlebars, Backbone, WorkoutListTemplate, WorkoutsCollection){
    var WorkoutListView = Backbone.View.extend({
        el: '.page',
        template: handlebars.compile(WorkoutListTemplate),

        initialize: function() {
            this.render();
        },

        render: function () {
            var self = this,
                workoutsCollection = new WorkoutsCollection(),
                workouts = [];

            workoutsCollection.fetch({
                success: function (data) {
                    $.each(data.models, function(index, model) {
                        workouts.push(model.attributes);
                    });

                    self.$el.html(self.template({workouts: workouts}));
                }
            });
        }
    });
  return WorkoutListView;
});