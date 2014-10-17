define([
  'jquery',
  'kendo',
  'views/layout/layout',
  'views/home/home',
  'views/details/details',
    'views/widgets/widgets',
  'views/layout/navbar/menu',
    'views/login/login',
    'views/signup/signup'
], function ($, kendo, layout, home, details, widgets, menu, login, signup) {

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

    router.route('/signup', function () {
        layout.showIn('#menu', menu);
        layout.showIn('#content', signup);
    });

  router.route('/details', function () {
    layout.showIn('#menu', menu);
    layout.showIn('#content', details);
  });

    router.route('/widgets', function () {
    layout.showIn('#menu', menu);
        layout.showIn('#content', widgets);
  });


  var init = function() {
    router.start();
  };

  return {
    init: init
  };

});
