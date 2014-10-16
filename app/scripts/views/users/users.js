var user = user || {};

define([
  // Require.js text plugin loads the HTML template pages​
  'text!views/users/users.html',
  'jquery',
    'kendo',
    'toastr'
], function (template, $, kendo, toastr) {

  'use strict';

    template = $.trim(template);

    user.viewModel = kendo.observable({

        // Set viewModel properties
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        urlService: 'http://localhost:3000/api/users/',

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

      }),

        // Event
        submitForm: function (e) {
            e.preventDefault();
            // Using kendoUI Form Validator
            var validator = $("#addUserForm").kendoValidator().data("kendoValidator");
            //console.log('click', login.viewModel.username);
            if (validator.validate()) {
                $.ajax({
                type: 'POST',
                url: user.viewModel.urlService,
                timeout: 30000,
                dataType: "json",
                data: {
                    username: user.viewModel.username,
                    firstName: user.viewModel.firstName,
                    lastName: user.viewModel.lastName,
                    email: user.viewModel.email
                },
                contentType: 'application/x-www-form-urlencoded; charset=ISO 8859-1',
                beforeSend: function () {

                },
                complete: function () {

                },
                success: function (result) {
                    console.log(result.message);
                    // Update Grid after insert new user

                    toastr.success(result.message);
                    $("#gridRestful").data("kendoGrid").dataSource.read();
                },
                error: function (xhr) {
                    $('#show_combo').html('<p class="destaque">Lamento! Ocorreu um erro. Por favor tente mais tarde.');
                    console.log(xhr);
                }
            });
            }
        },

        editDetails: function (e) {
            e.preventDefault();
            var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
            console.log(dataItem._id);
        }

    });

    // Bind the viewModel
    kendo.bind($('#addUserForm'), user.viewModel);

    var view = new kendo.View(template, { model: user.viewModel });

    return view;


});
