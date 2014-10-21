var signup = signup || {};

define([
  // Require.js text plugin loads the HTML template pages​
  'text!views/signup/signup.html',
  'jquery',
  'kendo',
  'toastr'
], function (template, $, kendo, toastr) {

  'use strict';

  template = $.trim(template);

  signup.viewModel = kendo.observable({
    email: '',
    password: '',
    urlService: 'http://localhost:3000/api/signup',

    submitSignup: function (e) {
      e.preventDefault();
      // Validate input;
      var validator = $("#signupView").kendoValidator().data("kendoValidator");
      if (validator.validate()) {
        $.ajax({
          type: "POST",
          url: signup.viewModel.urlService,
          timeout: 30000,
          dataType: "json",
          data: {email: signup.viewModel.email, password: signup.viewModel.password },
          beforeSend: function () {
            kendo.ui.progress($("body"), true);
          },
          complete: function () {
            kendo.ui.progress($("body"), false);
          },
          success: function (result) {
            // Show success message
            toastr.info(result.message);
          },
          error: function (xhr, err) {
            toastr.error(err);
          }
        });
      }
    }
  });

  // Bind the viewModel
  kendo.bind($('#signupView'), signup.viewModel);

  var signupView = new kendo.View(template, { model: signup.viewModel });

  return signupView;

});
