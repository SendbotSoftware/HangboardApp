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
      'new/:userEnteredBodyweight': 'new'
    }
  });
var initialize = function(){
    var appRouter = new AppRouter();
    appRouter.on('route:home', function() {
        var workoutListView = new WorkoutListView(appRouter);
    });
    appRouter.on('route:edit', function(id) {
        if (id) {
            var editWorkoutView = new EditWorkoutView(id, appRouter);
        }
    });
    appRouter.on('route:new', function(userEnteredBodyweight) {
       var newWorkoutView = new NewWorkoutView(appRouter,userEnteredBodyweight);
    });
    Backbone.history.start();
  };
  return {
    initialize: initialize
  };
});