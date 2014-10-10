define([
  'text!views/layout/navbar/menu.html',
  'text!views/layout/navbar/menu.js',
  'jquery',
  'kendo'
], function (template) {

  'use strict';

  template = $.trim(template);

  var menuModel = kendo.observable({

    listMenu: new kendo.data.DataSource({
      dataSource: [
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
  kendo.bind($('#viewModelMenu'), menuModel);

  var menuView = new kendo.View(template, { model: menuModel });

  return menuView;

});
