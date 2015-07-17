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
        fb = $firebase(firebaseObj),
        addPost = {};

      $scope.addPost = addPost;

      $scope.AddPost = function() {
        var
          title = $scope.article.title,
          post = $scope.article.post,
          user = CommonProp.getUser();

        addPost.loading = true;

        fb.$push({
          title: title,
          post: post,
          emailId: user,
          '.priority': user
        }).then(function(ref) {
          $location.path('/welcome');
          console.log(ref);
          addPost.loading = false;
        }, function(error) {
          console.log('Error:', error);
          addPost.loading = false;
        });
      };
    }
  ]
);
