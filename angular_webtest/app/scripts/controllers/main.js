'use strict';


angular.module('login_app')
  .controller('loginController', function ($scope, $http) {

    $scope.registerButton = false;
    $scope.loginError = false;
    $scope.passError = false;
    $scope.registerError = false;

    $scope.login = function () {
      const URL_LOGIN = `http://localhost:3000/login`
      var username = $scope.username;
      var password = $scope.password;

      var dataUser = {
        username,
        password
      }
      console.log(dataUser);

      $http.post(URL_LOGIN, dataUser)
        .then(
          (response) => {
            console.log("el estatus es: ", response.status);
            $scope.userData = response.data;
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

    $scope.register = function () {
      const URL_SIGNIN = `http://localhost:3000/register`;
      var username = $scope.username;
      var password = $scope.password;

      var dataUser = {
        username,
        password
      }

      console.log(dataUser);

      $http.post(URL_SIGNIN, dataUser)
        .then(
          (response) => {
            console.log("el estatus es: ", response.status);
            if (response.status === 200) {
              $scope.loginError = false;
              location.href = "/#!/home";
            }
          },
          (response) => {
            if (response.status === 401) {
              $scope.registerError = true;
            }

          });
    }

  });


angular.module('login_app')
  .controller("myController", function ($scope, $http, $window) {


    const GET_USER = `http://localhost:3000/getuser`;
    $http.get(GET_USER)
      .then(
        (response) => {
          $scope.user = response.data;
        });

    $scope.selectUser = function (user) {


      $scope.clickedUser = user.iduser;
      $scope.clickedUser1 = $scope.email;
      $scope.clickedUser2 = $scope.username;

      var iduser = $scope.clickedUser;
      var emailUser = $scope.clickedUser1;
      var userName = $scope.clickedUser2;

      var objectUser = {
        iduser,
        emailUser,
        userName
      }

      $scope.deleteUser = function () {

        const DEL_USER = `http://localhost:3000/deleteUser`;
        $http.post(DEL_USER, objectUser)
          .then(
            (reponse) => {
              if (reponse.status === 200) {
                $window.location.reload();
              }

            })
      };

      $scope.saveUpdate = function () {

        var contEmailUpdate = $scope.emailUpdate;
        var contUserUpdate  = $scope.usernameUpdate;

        var contDateToUpdate = {
          iduser,
          contEmailUpdate,
          contUserUpdate
        }

        console.log(contDateToUpdate);

        const UP_USER = `http://localhost:3000/updateUser`;

        $http.post(UP_USER, contDateToUpdate)
          .then(
            (reponse) => {
              if (reponse.status === 200) {
                $window.location.reload();
              }

            })
      };


    };
  });

  angular.module('login_app')  
  .controller('ctrlLenguage', function ($scope, $translate) {
    $scope.changeLanguage = function (key) {
      $translate.use(key);
    };
  })
