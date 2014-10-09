define([
  'text!views/layout/layout.html',
  'jquery',
  'kendo'
], function (template) {

  var layout = new kendo.Layout(template);

  return layout;

});
