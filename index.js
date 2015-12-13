var engines = require('consolidate');
var express = require('express');
var routes = require('./routes');
var mongoose = require('mongoose');
var passport = require('passport');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/psylist_development');

var app = express();

// Auth

app.set('appSecret', process.env.SECRET || 'changethischangethis!');
app.use(passport.initialize());
require('./lib/passportStrategy')(passport);

// Set Dir & View Engine

app.set('build', __dirname + '/build');
app.engine('html', engines.mustache);
app.set('view engine', 'html');
app.use(express.static('build'));

// Router

var psylistRouter = express.Router();
routes(psylistRouter, passport, app.get('appSecret'));
app.use('/', psylistRouter);

app.listen(process.env.PORT || 5000, function() {
  console.log('Node app is running on port 5000');
});