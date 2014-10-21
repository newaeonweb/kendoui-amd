var detail = detail || {};

define([
  // Require.js text plugin loads the HTML template pages​
  'text!views/details/details.html',
  'jquery',
  'kendo'
], function (template) {

  'use strict';

  template = $.trim(template);

    detail.viewModel = kendo.observable({
    title: 'Details',
        description: 'KendoUI - AMD is a simple Single Page Application facing some trivial task for aingle page application using KendoUI - Widgets. Learn how to use KendoUI and Require together to create modular applications.'
  });

    var detailView = new kendo.View(template, { model: detail.viewModel });

    return detailView;

});
