var home = home || {};

define([
  // Require.js text plugin loads the HTML template pages​
  'text!views/home/home.html',
  'jquery',
  'kendo'
], function (template, $, kendo) {

  'use strict';

  template = $.trim(template);

    home.viewModel = kendo.observable({
        title: 'KendoUI Single Page Application.',
        lead: 'A modular project build with Require.js, Handlebars and Toastr. Dealing with common points to SPA.'
    });

    var homeView = new kendo.View(template, { model: home.viewModel });

    return homeView;

});
