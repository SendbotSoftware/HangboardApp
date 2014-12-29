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
        events: {
            'submit .bodyweight-form': 'saveWeight'
        },
        saveWeight: function (ev) {
            var bodyweight = $(ev.currentTarget).serializeObject(),
            self = this;
            self.router.navigate('/new/'+bodyweight.weight, {trigger:true});
            return false;
        },


        initialize: function(router) {
            this.render();
            this.router = router;
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