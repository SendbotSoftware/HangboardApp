define([
    'jquery',
    'handlebars',
    'backbone'
], function($, handlebars, Backbone){
    var WorkoutModel = Backbone.Model.extend({
        urlRoot: '/update'
    });
    return WorkoutModel;
});