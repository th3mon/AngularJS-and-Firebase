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
  '$location',
  'CommonProp',
  '$firebaseAuth',
  function (
    $scope,
    $location,
    CommonProp,
    $firebaseAuth
  ) {
    var
      firebaseObj = new Firebase('https://blistering-inferno-8085.firebaseio.com'),
      loginObj = $firebaseAuth(firebaseObj);

    $scope.user = {};
    $scope.SignIn = function(e) {
      var
        username = $scope.user.email,
        password = $scope.user.password;

      e.preventDefault();

      loginObj
        .$authWithPassword({
          email: username,
          password: password
        })
        .then(function(user) {
          console.log('Auth success', user);
          $location.path('/welcome');
          CommonProp.setUser(user.password.email);
        }, function(error) {
          console.log('Auth failure', error);
        });
    };
}])

.service('CommonProp', function(){
  var user = '';

  return {
    getUser: function(){
      return user;
    },

    setUser: function(value){
      user = value;
    }
  };
});
