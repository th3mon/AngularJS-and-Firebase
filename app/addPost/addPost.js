'use strict';

angular.module('myApp.addPost', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/addPost', {
    templateUrl: 'addPost/addPost.html',
    controller: 'AddPostCtrl'
  });
}])

.controller('AddPostCtrl',
  [
    '$scope',
    '$firebase',
    '$location',
    'CommonProp',
    function(
      $scope,
      $firebase,
      $location,
      CommonProp
    ){
      var
        firebaseObj = new Firebase('https://blistering-inferno-8085.firebaseio.com/Articles'),
        fb = $firebase(firebaseObj);

      $scope.AddPost = function() {
        var
          title = $scope.article.title,
          post = $scope.article.post;

        fb.$push({
          title: title,
          post: post,
          emailId: CommonProp.getUser()
        }).then(function(ref) {
          $location.path('/welcome');
          console.log(ref);
        }, function(error) {
          console.log('Error:', error);
        });
      };
    }
  ]
);
