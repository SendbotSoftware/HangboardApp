// Filename: router.js
define([
  'jquery',
  'handlebars',
  'backbone',
  'views/WorkoutListView',
  'views/EditWorkoutView'
], function($, handlebars, Backbone,WorkoutListView,EditWorkoutView) {

  var AppRouter = Backbone.Router.extend({
    routes: {
      '': 'home',
      'edit/:id' : 'edit',
      'new': 'edit'
    }
  });
var initialize = function(){
    var appRouter = new AppRouter();
    appRouter.on('route:home', function() {
        console.log('Going to home route...');
        var workoutListView = new WorkoutListView();
    });
    appRouter.on('route:edit', function(id) {
        console.log('show new workout form');
        if (id) {
            var editWorkoutView = new EditWorkoutView(id, appRouter);
        }
    });
    Backbone.history.start();
  };
  return {
    initialize: initialize
  };
});