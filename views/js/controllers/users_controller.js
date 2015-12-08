'use strict';

module.exports = function(app) {
  app.controller('usersController', ['$scope', '$http', function($scope, $http) {
    $scope.users = [];

    $scope.getAll = function() {
      $http({
        method: 'GET',
        url: '/users',
      })
      .success(function(data) {
        $scope.users = data;
      })
      .error(function(data, status) {
        console.log(data);
      })
    };

    $scope.create = function(user) {
      $http({
        method: 'POST',
        url: '/users',
        data: user
      })
      .success(function(data) {
        $scope.users.push(data);
      })
      .error(function(data) {
        console.log(data);
      })
    };

    $scope.save = function(user) {
      $http({
        method: 'PUT',
        url: '/users/' + user._id,
        data: user
      })
      .success(function() {
        user.editing = false;
      })
      .error(function(data) {
        console.log(data);
      })
    };

    $scope.editToggle = function(user) {
      if(user.editing) {
        user.username = user.oldusername;
        user.basic.password = user.oldpassword;
        user.editing = false;
      } else {
        user.oldusername = user.username;
        user.oldpassword = user.basic.password;
        user.editing = true;
      }
    };

    $scope.remove = function(user) {
      $http({
        method: 'DELETE',
        url: '/users/' + user._id
      })
      .success(function() {
        $scope.users.splice($scope.users.indexOf(user), 1);
        alert("You just deleted a god damn user!");
      })
      .error(function(data) {
        console.log(data);
      });
    };

  }]);
};