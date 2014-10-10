define([
  'text!views/home/home.html',
  'jquery',
  'kendo'
], function (template) {

  'use strict';

  template = $.trim(template);

    var model = kendo.observable({
      title: 'Home'
    });

  var view = new kendo.View(template, { model: model });

  return view;

});
