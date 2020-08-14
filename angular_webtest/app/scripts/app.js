'use strict';


angular
  .module('login_app', [
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'loginController'
      })
      .when('/about', {
      })
      .otherwise({
        redirectTo: '/'
      });
  });
