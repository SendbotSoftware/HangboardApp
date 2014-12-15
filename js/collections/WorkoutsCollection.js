define([
    'jquery',
    'handlebars',
    'backbone'
], function($, handlebars, Backbone){
    var WorkoutsCollection = Backbone.Collection.extend({
        url: 'js/data/stub.json' // TODO swap out with mongoDB endpoint?
    });
    return WorkoutsCollection;
});