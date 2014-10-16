require.config({
  paths: {
    'text': '../bower_components/requirejs-text/text',
    'jquery': '../bower_components/jquery/jquery.min',
      'kendo': '../bower_components/kendo-ui/js/kendo.web.min',
      'toastr': '../bower_components/toastr/toastr.min'
  },
  // inform requirejs that kendo ui depends on jquery
  shim: {
      "kendo": { deps: ["jquery"] },
      "toastr": { deps: ["jquery"] }
  }
});

require([
  'app'
], function (app) {

  app.init();

});
