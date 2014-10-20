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
    email: '',
    password: '',
    urlService: 'http://localhost:3000/api/login/',

    submitLogin: function (e) {
      e.preventDefault();
      //console.log('click', login.viewModel.username);
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
          // Show error message from Passport Authentication
          //console.log(result.message.length);

          window.location = "/#/widgets";

          //toastr.warning(result);
        },
        error: function (xhr, err) {
          console.log(xhr);
          console.log(err);
        }
      });
    }
  });

  // Bind the viewModel
  kendo.bind($('#loginView'), login.viewModel);

  var loginView = new kendo.View(template, { model: login.viewModel });

  return loginView;

});
