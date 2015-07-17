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
      loginObj = $firebaseAuth(firebaseObj),
      login = {};

    $scope.login = login;

    $scope.user = {};
    $scope.SignIn = function(e) {
      var
        username = $scope.user.email,
        password = $scope.user.password;

      e.preventDefault();

      login.loading = true;

      loginObj
        .$authWithPassword({
          email: username,
          password: password
        })
        .then(function(user) {
          login.loading = false;
          console.log('Auth success', user);
          $location.path('/welcome');
          CommonProp.setUser(user.password.email);
        }, function(error) {
          login.loading = false;
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
})

.directive('laddaLoading', [function(){
  return {
    link: function($scope, element, attrs, controller) {
      var
        Ladda = window.Ladda,
        ladda;
      ladda = Ladda.create(element[0]);

      $scope.$watch(attrs.laddaLoading, function(newVal, oldVal) {
        if (newVal) {
          ladda.start();
        } else {
          ladda.stop();
        }
      });
    }
  };
}]);
