'use strict';

module.exports = function(app) {
  app.controller('releasesController', ['$scope', '$http', function($scope, $http) {
    $scope.releases = [];

    // CRUD Functions

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
        var submissions = angular.element( document.querySelector( '#submissions' ) );
        submissions.append(release.year + ' ' + release.artistName + ' - ' + release.albumName + ' [' + release.review + '] <br/>');
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

    // Non-CRUD functions

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

    $scope.outputSubmissionstoHTML = function() {
      console.log($scope.releases);
    };

    $scope.expandToggle = function(release) {
      if(release.expanded) {

        release.expanded = false;
      } else {

        release.expanded = true;
      }
    };

    $scope.saveToPC = function (data, filename) {

      var today = new Date();
      var yyyy = today.getFullYear();
      var mm = today.getMonth()+1;
      var dd = today.getDate();

      filename = yyyy + "-" + mm + "-" + dd + " Psylist.json";

      if (!data) {
        console.error('No data');
        return;
      }

      if (typeof data === 'object') {
        data = JSON.stringify(data, undefined, 2);
      }

      var blob = new Blob([data], {type: 'text/json'}),
        e = document.createEvent('MouseEvents'),
        a = document.createElement('a');

      a.download = filename;
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
      e.initMouseEvent('click', true, false, window,
          0, 0, 0, 0, 0, false, false, false, false, 0, null);
      a.dispatchEvent(e);
    };

  }]);
};