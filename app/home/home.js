'use strict';

angular.module('myApp.home', ['ngRoute', 'firebase'])
.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl', [
  '$scope',
  '$firebaseSimpleLogin',
  function (
    $scope,
    $firebaseSimpleLogin
  ) {
    var
      firebaseObj = new Firebase('https://blistering-inferno-8085.firebaseio.com');
      // loginObj = $firebaseSimpleLogin(firebaseObj);

    function authHandler(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
      }
    }


    $scope.user = {};
    $scope.SignIn = function(e) {
      var
        username = $scope.user.email,
        password = $scope.user.password;

      e.preventDefault();
      firebaseObj.authWithPassword({
        email    : username,
        password : password
      }, authHandler);

      // loginObj.$login('password', {
      //   email: username,
      //   password: password
      // });
      // .then(function authDataCallback (user) {
      //   console.log('Auth success');
      // }, function(error) {
      //   console.log('Auth failure');
      // });
    };
}]);
