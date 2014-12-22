// Filename: router.js
define([
  'jquery',
  'handlebars',
  'backbone',
  'views/WorkoutListView',
  'views/EditWorkoutView',
  'views/NewWorkoutView'
], function($, handlebars, Backbone,WorkoutListView,EditWorkoutView,NewWorkoutView) {

  var AppRouter = Backbone.Router.extend({
    routes: {
      '': 'home',
      'edit/:id' : 'edit',
      'new': 'new'
    }
  });
var initialize = function(){
    var appRouter = new AppRouter();
    appRouter.on('route:home', function() {
        console.log('Going to home route...');
        var workoutListView = new WorkoutListView();
    });
    appRouter.on('route:edit', function(id) {
        console.log('show edit workout form');
        if (id) {
            var editWorkoutView = new EditWorkoutView(id, appRouter);
        }
    });
        appRouter.on('route:new', function() {
            console.log('show new workout form');

                var newWorkoutView = new NewWorkoutView(appRouter);

        });
    Backbone.history.start();
  };
  return {
    initialize: initialize
  };
});