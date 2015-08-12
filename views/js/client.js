'use strict';

require('angular/angular');
require('angular-route');

var psylistApp = angular.module('psylistApp', ['ngRoute']);

//controllers
require('./controllers/releases_controller')(psylistApp);