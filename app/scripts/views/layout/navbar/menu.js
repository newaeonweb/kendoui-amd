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

    logged: false,

    // local menu items
    menus: [
      {text: "Home", link: ""},
      {text: "Details", link: "/#/details"},
      {text: "Widgets", link: "/#/widgets"},
      {text: "Login", link: "/#/login"},
      {text: "Signup", link: "/#/signup"}

    ],

    // Check login return, if success append logout link to menu
    isLogged: function () {

      if (menu.viewModel.logged === true) {
        menu.viewModel.menus.push(
          {text: "Logout", link: "/api/logout"}
        );
      }

    }

  });

  // Bind the viewModel
  kendo.bind($('#viewModelMenu'), menu.viewModel);

  var menuView = new kendo.View(template, { model: menu.viewModel });

  return menuView;

});
