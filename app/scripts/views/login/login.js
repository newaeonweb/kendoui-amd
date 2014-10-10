var login = login || {};

define([
  'text!views/login/login.html',
  'jquery',
  'kendo'
], function (template, $, kendo) {

  'use strict';

  template = $.trim(template);

  login.viewModel = kendo.observable({
    username: '',
    password: '',
    urlService: 'http://localhost:3000/api/users/',

    submitLogin: function (e) {
      e.preventDefault();
      //console.log('click', login.viewModel.username);
      $.ajax({
        type: 'POST',
        url: login.viewModel.urlService,
        timeout: 30000,
        dataType: "json",
        data: {username: login.viewModel.username, firstName: login.viewModel.password },
        contentType: 'application/x-www-form-urlencoded; charset=ISO 8859-1',
        beforeSend: function () {

        },
        complete: function () {

        },
        success: function (result) {
          console.log(result.message);
        },
        error: function (xhr) {
          $('#show_combo').html('<p class="destaque">Lamento! Ocorreu um erro. Por favor tente mais tarde.');
          console.log(xhr);
        }
      });
    }
  });

  // Bind the viewModel
  kendo.bind($('#loginView'), login.viewModel);

  var loginView = new kendo.View(template, { model: login.viewModel });

  return loginView;

});
