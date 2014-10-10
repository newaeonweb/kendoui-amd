define([
  'text!views/details/details.html',
  'jquery',
  'kendo'
], function (template) {

  'use strict';

  template = $.trim(template);

  var model = kendo.observable({
    title: 'Details',
	description: 'Testing kendo-ui SPA'
  });

  var view = new kendo.View(template, { model: model });

  return view;

});
