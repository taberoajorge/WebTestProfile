'use strict';


angular.module('login_app')
  .directive('loginDirective',  function () {
    return {
        restrict: 'E',
        templateUrl: 'partials/register.html'
    };
  })