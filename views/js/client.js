'use strict';

require('angular/angular');
require('angular-route');

var psylistApp = angular.module('psylistApp', ['ngRoute']);

//controllers
require('./controllers/releases_controller')(psylistApp);
require('./controllers/users_controller')(psylistApp);

psylistApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/angular', {
    templateUrl: 'templates/psylistAngular.html'
  })
  .when('/original', {
    templateUrl: 'templates/psylistHTML.html'
  })
  .otherwise({
    templateUrl: 'templates/rubric.html'
  })
}]);