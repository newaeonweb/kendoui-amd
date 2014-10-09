require.config({
  paths: {
    'text': '../bower_components/requirejs-text/text',
    'jquery': '../bower_components/jquery/jquery.min',
    'kendo': '../bower_components/kendo-ui/js/kendo.web.min'

  },
  // inform requirejs that kendo ui depends on jquery
  shim: {
    "kendo": {
      deps: ["jquery"]
    }
  }
});

require([
  'app'
], function (app, jquery, kendo) {

  app.init();

});
