define([
  'jquery',
  'handlebars',
  'backbone',
  'text!templates/workoutListTemplate.html'
], function($, handlebars, Backbone, workoutListTemplate){
    var WorkoutListView = Backbone.View.extend({

        initialize: function() {
            console.log("Rendering WorkoutListView");
        }
    });
  return WorkoutListView;
});