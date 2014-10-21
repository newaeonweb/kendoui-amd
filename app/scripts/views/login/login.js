/*global menu */
// Pass menu namespace like global to JSLint
var login = login || {};

define([
  // Require.js text plugin loads the HTML template pages​
  'text!views/login/login.html',
  'jquery',
  'kendo',
  'toastr'
], function (template, $, kendo, toastr) {

  'use strict';

  template = $.trim(template);

  login.viewModel = kendo.observable({
    // ViewModel properties
    email: '',
    password: '',
    urlService: 'http://localhost:3000/api/login/',

    submitLogin: function (e) {
      e.preventDefault();
      // Validate input;
      var validator = $("#loginView").kendoValidator().data("kendoValidator");
      if (validator.validate()) {
        // Send data to the API and process login;
        $.ajax({
          type: 'POST',
          url: login.viewModel.urlService,
          timeout: 30000,
          //dataType: "json",
          data: {email: login.viewModel.email, password: login.viewModel.password },
          beforeSend: function () {
            kendo.ui.progress($("body"), true);
          },
          complete: function () {
            kendo.ui.progress($("body"), false);
          },
          success: function (result) {
            // Check if result have message
            if (result.message) {
              // Show error message from Passport Authentication
              toastr.warning(result.message);
            } else {
              // Set view model to logged
              menu.viewModel.set('logged', true);
              menu.viewModel.isLogged();

              // On success go to panel
              window.location = "/#/widgets";
            }
          },
          error: function (xhr, err) {
            toastr.error(err);
          }
        });
      }
    }
  });

  // Bind the viewModel
  kendo.bind($('#loginView'), login.viewModel);

  var loginView = new kendo.View(template, { model: login.viewModel });

  return loginView;

});
