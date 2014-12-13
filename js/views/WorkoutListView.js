define([
  'jquery',
  'handlebars',
  'backbone',
  'text!templates/workoutListTemplate.html'
], function($, handlebars, Backbone, workoutListTemplate){
    var WorkoutListView = Backbone.View.extend({

        initialize: function() {
            console.log("Rendering WorkoutListView");
        },

        el: '.page',
        render: function () {
        console.log("rendering")
            var that = this;
            var template = handlebars.compile(workoutListTemplate);
            var workouts = [{"date" : "12/11/2014","index": "0", "type" : "volume", "repetitions" : "4", "weight" : 150, "RPE" : 9, "grips" : [{"name" : "half-crimp", "sets" : 5, "resistance" : 0, "1RM" : 200},{"name" : "pinch", "sets" : 3, "resistance" : 5, "1RM" : 200},{"name" : "Middle-three, 2-pad pocket", "sets" : 4, "resistance" : 10, "1RM" : 200}]},
            {"date" : "12/11/2014","index": "1", "type" : "volume", "repetitions" : "4", "weight" : 150, "RPE" : 9, "grips" : [{"name" : "half-crimp", "sets" : 6, "resistance" : 5, "1RM" : 200},{"name" : "pinch", "sets" : 3, "resistance" : 5, "1RM" : 200},{"name" : "Middle-three, 2-pad pocket", "sets" : 4, "resistance" : 10, "1RM" : 200}]}];
            var html    = template({workouts:workouts});
            that.$el.html(html);
        }
    });
  return WorkoutListView;
});