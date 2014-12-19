require.config({
  paths: {
    jquery: 'libs/jquery/jquery-min',
    handlebars: 'libs/handlebars/handlebars',
    underscore: 'libs/underscore/underscore-min',
    backbone: 'libs/backbone/backbone-min',
    templates: '../templates'
  }

});

require(['application'],
    function(Application){
      Application.initialize();
    }
);