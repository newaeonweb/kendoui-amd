var menu = menu || {};

define([
  // Require.js text plugin loads the HTML template pages​
  'text!views/layout/navbar/menu.html',
  'text!views/layout/navbar/menu.js',
  'jquery',
  'kendo'
], function (template) {

  'use strict';

  template = $.trim(template);

  menu.viewModel = kendo.observable({

    title: "Teste",

    menus: [
      {text: "Home", link: ""},
        {text: "Details", link: "details"},
        {text: "Widgets", link: "widgets"},
        {text: "Login", link: "login"},
        {text: "Signup", link: "signup"}
    ]

  });

  // Bind the viewModel
  kendo.bind($('#viewModelMenu'), menu.viewModel);

  var menuView = new kendo.View(template, { model: menu.viewModel });

  return menuView;

});
