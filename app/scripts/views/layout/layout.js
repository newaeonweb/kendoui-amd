define([
  'text!views/layout/layout.html',
  'jquery',
  'kendo'
], function (template) {

  'use strict';

  var layout = new kendo.Layout(template);

  return layout;

});
