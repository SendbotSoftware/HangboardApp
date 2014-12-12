// Filename: router.js
define([
  'jquery',
  'handlebars',
  'backbone'
], function($, handlebars, Backbone) {

  var AppRouter = Backbone.Router.extend({


  });

  var initialize = function(){
    console.log('router initialized');
  };
  return {
    initialize: initialize
  };
});