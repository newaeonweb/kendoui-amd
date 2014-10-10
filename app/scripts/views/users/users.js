define([
  'text!views/users/users.html',
  'jquery',
  'kendo'
], function (template) {

  'use strict';

    template = $.trim(template);

    var userModel = kendo.observable({


      listUsers: new kendo.data.DataSource({
        schema: {
          model: {
            id: "_id"
          }
        },
        batch: true,
        transport: {
          read: {
            url: "http://localhost:3000/api/users",
            dataType: "json",
            type: "Get"
          },
          update: {
            url: "http://localhost:3000/api/users/:id",
            dataType: "json",
            type: "PUT"
          },
          destroy: {
            url: "http://localhost:3000/api/users/:id",
            dataType: "json",
            type: "DELETE",
            data: {}
          },
          create: {
            url: "http://localhost:3000/api/users",
            dataType: "json",
            type: "POST"
          }
        }

      })

    });

    // Bind the viewModel
    kendo.bind($('#viewModelRemote'), userModel);

    var view = new kendo.View(template, { model: userModel });

    return view;


});
