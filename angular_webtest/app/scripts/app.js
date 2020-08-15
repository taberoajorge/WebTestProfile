'use strict';


angular
  .module('login_app', [
    'ngRoute',
    'pascalprecht.translate'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'loginController',
      })
      .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'myController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
