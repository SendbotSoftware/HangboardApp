define([
    'jquery',
    'handlebars',
    'backbone'
], function($, handlebars, Backbone){
    var WorkoutsCollection = Backbone.Collection.extend({
        url: '/workouts'
    });
    return WorkoutsCollection;
});