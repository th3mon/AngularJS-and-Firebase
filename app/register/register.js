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
        auth = $firebaseAuth(firebaseObj);

      $scope.signUp = function() {
        var
          email = $scope.user.email,
          password = $scope.user.password;

        if (email && password) {
          auth
            .$createUser(email, password)
            .then(function() {
              $location.path('/home');
            }, function(error) {
              $scope.regError = true;
              $scope.regErrorMessage = error.message;
            });
        }
      };
    }
  ]
);
