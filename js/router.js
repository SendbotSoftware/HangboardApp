// Filename: router.js
define([
  'jquery',
  'handlebars',
  'backbone',
  'views/WorkoutListView'
], function($, handlebars, Backbone, WorkoutListView) {

  var AppRouter = Backbone.Router.extend({
    routes: {
      '': 'home',
      'edit/:id': 'edit',
      'new': 'edit'
    }
  });
var initialize = function(){
     var appRouter = new AppRouter();
      appRouter.on('route:home', function() {
        console.log('Going to home route...');
        var workoutListView = new WorkoutListView();
        workoutListView.render();
      });
      appRouter.on('route:edit', function(id) {

      });
      Backbone.history.start();
  };
  return {
    initialize: initialize
  };
});