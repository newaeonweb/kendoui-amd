var menu = menu || {};

define([
  'text!views/layout/navbar/menu.html',
  'text!views/layout/navbar/menu.js',
  'jquery',
  'kendo'
], function (template) {

  'use strict';

  template = $.trim(template);

  menu.viewModel = kendo.observable({

    title: "Teste",

    data: ["home", "details", "users", "login"],

    users: [
        {text: "Home", link: "home"},
        {text: "Details", link: "details"},
        {text: "Users", link: "users"},
        {text: "Login", link: "login"}
      ],

    listMenu: new kendo.data.DataSource({
      data: [
        { text: "Home",
          cssClass: "active",
          url: "#/"
        },
        {
          text: "Details",
          cssClass: "active",
          url: "#/details"
        }
      ]
    })

  });

  // Bind the viewModel
  kendo.bind($('#viewModelMenu'), menu.viewModel);

  var menuView = new kendo.View(template, { model: menu.viewModel });

  return menuView;

});
