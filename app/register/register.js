'use strict';

angular.module('myApp.register', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/register', {
    templateUrl: 'register/register.html',
    controller: 'RegisterCtrl'
  });
}])

.controller('RegisterCtrl',
  [
    '$scope',
    '$location',
    '$firebaseAuth',
    function (
      $scope,
      $location,
      $firebaseAuth
    ) {
      var
        firebaseObj = new Firebase('https://blistering-inferno-8085.firebaseio.com'),
        auth = $firebaseAuth(firebaseObj),
        login = {};

      $scope.login = login;

      $scope.signUp = function() {
        var
          email = $scope.user.email,
          password = $scope.user.password;

        login.loading = true;

        if (email && password) {
          auth
            .$createUser(email, password)
            .then(function() {
              login.loading = false;
              $location.path('/home');
            }, function(error) {
              login.loading = false;
              $scope.regError = true;
              $scope.regErrorMessage = error.message;
            });
        }
      };
    }
  ]
);
