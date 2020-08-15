'use strict';


angular.module('login_app')
  .directive('loginDirective',  function () {
    return {
        restrict: 'E',
        templateUrl: 'partials/register.html'
    };
  })
  .directive('logOut',  function () {
    return {
        restrict: 'E',
        templateUrl: 'partials/log_Out.html'
    };
  })
