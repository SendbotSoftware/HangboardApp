require.config({
    baseUrl: ".", //All filepaths are relativet to SpecRunner.js
    urlArgs: 'cb=' + Math.random(),
    paths: {
        jquery: '../javascripts/libs/jquery/jquery-min',
        underscore: '../javascripts/libs/underscore/underscore-min',
        backbone: '../javascripts/libs/backbone/backbone-min',
        'backbone.localStorage': '../javascripts/libs/backbone/backbone-localStorage-min',
        mocha: 'libs/mocha',
        chai: 'libs/chai',
        sinon: 'libs/sinon',
        spec: '../test/spec'
    },
    shim: {
        underscore: {
            exports: "_"
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'backbone.localStorage': {
            deps: ['backbone'],
            exports: 'Backbone'
        },
        mocha: {
            exports: 'mocha'
        },
        chai: {
            exports: 'chai'
        },
        sinon: {
            exports: "sinon"
        }
    }
});

window.store = "TestStore"; // override local storage store name - for testing

require(['underscore', 'jquery', 'mocha', 'chai', 'sinon'], function(_, $, mocha, chai, sinon) {

    // Chai
    this.assert = chai.assert;
    this.expect = chai.expect;

    // Mocha
    mocha.setup({ui: 'bdd', ignoreLeaks: true});

    var specs = [];

    specs.push('spec/models/WorkoutSpec');

    require(specs, function(){
        $(function(){
            mocha.run();//.globals(['Backbone']);
        });
    });

});