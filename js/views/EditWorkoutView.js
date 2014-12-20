
define([
    'jquery',
    'handlebars',
    'backbone',
    'text!templates/editWorkoutTemplate.html',
    'collections/WorkoutsCollection',

], function($, handlebars, Backbone, EditWorkoutTemplate,WorkoutsCollection,id){
    var EditWorkoutView = Backbone.View.extend({
        el: '.page',
        template: handlebars.compile(EditWorkoutTemplate),

        initialize: function(id) {
            this.render(id);
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