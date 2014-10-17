var signup = signup || {};

define([
    // Require.js text plugin loads the HTML template pages​
    'text!views/signup/signup.html',
    'jquery',
    'kendo'
], function (template, $, kendo) {

    'use strict';

    template = $.trim(template);

    signup.viewModel = kendo.observable({
        username: '',
        password: '',
        urlService: 'http://localhost:3000/api/signup/',

        submitSignup: function (e) {
            e.preventDefault();
            //console.log('click', login.viewModel.username);
            $.ajax({
                type: 'POST',
                url: signup.viewModel.urlService,
                timeout: 30000,
                dataType: "json",
                data: {username: signup.viewModel.username, firstName: signup.viewModel.password },
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
    kendo.bind($('#signupView'), signup.viewModel);

    var signupView = new kendo.View(template, { model: signup.viewModel });

    return signupView;

});
