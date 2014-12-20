define([
  'jquery',
  'handlebars',
  'backbone',
  'router',
], function($, handlebars, Backbone, Router){
    var initialize = function(){
        console.log('app initialized');
         Router.initialize();
    };

  return {
    initialize: initialize
  };
}



);