'use strict';


angular.module('login_app')
  .controller('loginController',  function ($scope, $http) {
    
    $scope.loginError = false;
    $scope.passError = false;
    
    $scope.login = function () {
      const URL_LOGIN = `http://localhost:3000/login`
      var username = $scope.username;
      var password = $scope.password;

      var dataUser = {
          username,
          password
      }

      $http.post(URL_LOGIN, dataUser)
          .then(
              (response) => {
                  console.log("el estatus es: ", response.status);
                  if (response.status === 200) {
                      $scope.loginError = false;
                      location.href = "/#!/home";
                  }
              },
              (response) => {
                  if (response.status === 402) {
                      $scope.loginError = true;
                  } else if (response.status === 401) {
                      $scope.passError = true;
                  }

              });
  }

  
  });
