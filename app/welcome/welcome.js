'use strict';

angular.module('myApp.welcome', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/welcome', {
    templateUrl: 'welcome/welcome.html',
    controller: 'WelcomeCtrl'
  });
}])

.controller('WelcomeCtrl', [
  '$scope',
  '$firebase',
  'CommonProp',
  function(
    $scope,
    $firebase,
    CommonProp
  ) {
    var
      firebaseObj = new Firebase('https://blistering-inferno-8085.firebaseio.com/Articles'),
      sync = $firebase(firebaseObj.startAt($scope.username).endAt($scope.username));

    $scope.articles = sync.$asArray();
    $scope.username = CommonProp.getUser();

    $scope.editPost = function(id) {
      var
        firebaseObj = new Firebase('https://blistering-inferno-8085.firebaseio.com/Articles/' + id),
        sync = $firebase(firebaseObj);

      $scope.postToUpdate = sync.$asObject();
      $('#editModal').modal();
    };

    $scope.update = function() {
      var
        firebaseObj = new Firebase('https://blistering-inferno-8085.firebaseio.com/Articles/' + $scope.postToUpdate.$id),
        article = $firebase(firebaseObj);

        article.$update({
          title: $scope.postToUpdate.title,
          post: $scope.postToUpdate.post,
          emailId: $scope.postToUpdate.emailId
        }).then(function(ref) {
          $('#editModal').modal('hide');
        }, function(error) {
          console.log('Error:', error);
        });
    };

    $scope.confirmDelete = function(id) {
      var
        firebaseObj = new Firebase('https://blistering-inferno-8085.firebaseio.com/Articles/' + id),
        article = $firebase(firebaseObj);

      $scope.postToDelete = article.$asObject();
      $('#deleteModal').modal();
    };

    $scope.deletePost = function() {
      var
        firebaseObj = new Firebase('https://blistering-inferno-8085.firebaseio.com/Articles/' + $scope.postToDelete.$id),
        article = $firebase(firebaseObj);

        article.$remove().then(function(ref) {
          $('#deleteModal').modal('hide');
        }, function(error) {
          console.log('Error:', error);
        });
    };
  }
]);
