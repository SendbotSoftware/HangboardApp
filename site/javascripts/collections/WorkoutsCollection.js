define([
    'jquery',
    'handlebars',
    'backbone'
], function($, handlebars, Backbone){
    var WorkoutsCollection = Backbone.Collection.extend({
        url: 'site/javascripts/data/stub.json', // TODO swap out with mongoDB endpoint?

        //TODO @rohanbk, @kerwinloukusa This will need to be fixed when we switch to mongo
        fetch: function (options) {
            var data = {models : [{"date" : "12/11/2014","index": "0", "type" : "volume", "repetitions" : "4", "weight" : 150, "RPE" : 9, "grips" : [{"name" : "half-crimp", "sets" : 5, "resistance" : 0, "1RM" : 200},{"name" : "pinch", "sets" : 3, "resistance" : 5, "1RM" : 200},{"name" : "Middle-three, 2-pad pocket", "sets" : 4, "resistance" : 10, "1RM" : 200}]}
                ,{"date" : "12/12/2014","index": "1", "type" : "volume", "repetitions" : "4", "weight" : 150, "RPE" : 9, "grips" : [{"name" : "half-crimp", "sets" : 6, "resistance" : 5, "1RM" : 200},{"name" : "pinch", "sets" : 3, "resistance" : 5, "1RM" : 200},{"name" : "Middle-three, 2-pad pocket", "sets" : 4, "resistance" : 10, "1RM" : 200}]}
            ]};
            options.success(data);
            return;
        }
    });
    return WorkoutsCollection;
});