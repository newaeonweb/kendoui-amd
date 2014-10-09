define([
  'jquery',
  'kendo',
  'views/layout/layout',
  'views/home/home',
  'views/details/details',
  'views/users/users',
  'views/layout/navbar/menu',
  'views/login/login'
], function ($, kendo, layout, home, details, users, menu, login) {

  var router = new kendo.Router({
    init: function () {
      layout.render('#root');
    }
  });

  router.route('/', function () {
    layout.showIn('#menu', menu);
    layout.showIn('#content', home);
  });

  router.route('/login', function () {
    layout.showIn('#menu', menu);
    layout.showIn('#content', login);
  });

  router.route('/details', function () {
    layout.showIn('#menu', menu);
    layout.showIn('#content', details);
  });

  router.route('/users', function () {
    layout.showIn('#menu', menu);
    layout.showIn('#content', users);
  });


  var init = function() {
    router.start();
  };

  return {
    init: init
  };

});
