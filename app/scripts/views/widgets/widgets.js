var widgets = widgets || {};

define([
  // Require.js text plugin loads the HTML template pages​
    'text!views/widgets/widgets.html',
  'jquery',
    'kendo',
    'toastr'
], function (template, $, kendo, toastr) {

  'use strict';

    template = $.trim(template);

    widgets.viewModel = kendo.observable({
        // Set viewModel properties
        title: 'Widgets',
        description: 'Some useful widgets and Handlebars templates.',


        username: '',
        firstName: '',
        lastName: '',
        email: '',
      urlService: 'http://localhost:3000/api/widgets/',

      listUsers: new kendo.data.DataSource({
        schema: {
          model: {
            id: "_id"
          }
        },
        batch: true,
        transport: {
          read: {
            url: "http://localhost:3000/api/widgets",
            dataType: "json",
            type: "Get"
          },
          update: {
            url: "http://localhost:3000/api/widgets/:id",
            dataType: "json",
            type: "PUT"
          },
          destroy: {
            url: "http://localhost:3000/api/widgets/:id",
            dataType: "json",
            type: "DELETE",
            data: {}
          },
          create: {
            url: "http://localhost:3000/api/widgets",
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
                    url: widgets.viewModel.urlService,
                timeout: 30000,
                dataType: "json",
                data: {
                    username: widgets.viewModel.username,
                    firstName: widgets.viewModel.firstName,
                    lastName: widgets.viewModel.lastName,
                    email: widgets.viewModel.email
                },
                contentType: 'application/x-www-form-urlencoded; charset=ISO 8859-1',
                beforeSend: function () {

                },
                complete: function () {

                },
                success: function (result) {
                    console.log(result.message);
                    // Update Grid after insert new widgets

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
    kendo.bind($('#addUserForm'), widgets.viewModel);

    var view = new kendo.View(template, { model: widgets.viewModel });

    return view;


});
