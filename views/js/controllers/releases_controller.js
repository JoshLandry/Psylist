'use strict';

module.exports = function(app) {
  app.controller('releasesController', ['$scope', '$http', function($scope, $http) {
    $scope.releases = [];

    $scope.testText = "Casting magick";

    $scope.getAll = function() {
      $http({
        method: 'GET',
        url: '/releases',
      })
      .success(function(data) {
        $scope.releases = data;
      })
      .error(function(data, status) {
        console.log(data);
      })
    };

    $scope.create = function(release) {
      $http({
        method: 'POST',
        url: '/releases',
        data: release
      })
      .success(function(data) {
        $scope.releases.push(data);
      })
      .error(function(data) {
        console.log(data);
      })
    };

    $scope.save = function(release) {
      $http({
        method: 'PUT',
        url: '/releases/' + release._id,
        data: release
      })
      .success(function() {
        release.editing = false;
      })
      .error(function(data) {
        console.log(data);
      })
    };

    $scope.editToggle = function(release) {
      if(release.editing) {
        release.albumName = release.oldAlbumName;
        release.artistName = release.oldArtistName;
        release.editing = false;
      } else {
        release.oldAlbumName = release.albumName;
        release.oldArtistName = release.artistName;
        release.editing = true;
      }
    };

    $scope.remove = function(release) {
      $http({
        method: 'DELETE',
        url: '/releases/' + release._id
      })
      .success(function() {
        $scope.releases.splice($scope.releases.indexOf(release), 1);
        alert("THAT was the tastiest goat!");
      })
      .error(function(data) {
        console.log(data);
      });
    };

  }]);
};