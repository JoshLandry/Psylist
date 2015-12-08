var engines = require('consolidate');
var express = require('express');
// var routes = require('./routes');

var Release = require('./models/Release');
var User = require('./models/User');
var bodyparser = require('body-parser');

var mongoose = require('mongoose');

var app = express();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/psylist_development');

app.set('build', __dirname + '/build');
app.engine('html', engines.mustache);
app.set('view engine', 'html');

app.use(express.static('build'));

app.listen(process.env.PORT || 5000, function() {
  console.log('Node app is running on port 5000');
});

// router

// var psylistRouter = express.Router();
// app.use('/', psylistRouter);

app.use(bodyparser.json());

app.get('/', function(request, response) {
  response.render('./Index.html')
  console.log("loaded");
});

// Releases Routes

app.get('/releases', function(req,res) {
  Release.find({}, function(err, data) {
    if(err) return res.status(500).send({'msg': 'we cant find yr shit'});
    res.json(data);
  });
});

app.post('/releases', function(req,res) {

  console.log("this is a post");

  var newRelease = new Release(req.body);
  newRelease.save(function(err, data) {
    if (err) return res.status(500).send({'msg': 'could not save yr shit.'});
    res.json(data);
  });
});

app.put('/releases/:id', function(req, res) {
  var updatedRelease = req.body;
  delete updatedRelease._id;
  Release.update({_id: req.params.id}, updatedRelease, function(err) {
    if (err) return res.status(500).send({'msg': 'this release has proved resistant to update.'});
    res.json(req.body);
  });
});

app.delete('/releases/:id', function(req, res) {
  Release.remove({_id: req.params.id}, true);
  res.end();
});

// User Routes

app.get('/users', function(req,res) {
  User.find({}, function(err, data) {
    if(err) return res.status(500).send({'msg': 'we cant find yr shit'});
    res.json(data);
  });
});

app.post('/users', function(req,res) {

  console.log("this is a post");

  var newUser = new User(req.body);
  newUser.save(function(err, data) {
    if (err) return res.status(500).send({'msg': 'could not save yr shit.'});
    res.json(data);
  });
});

app.put('/users/:id', function(req, res) {
  var updatedUser = req.body;
  delete updatedUser._id;
  User.update({_id: req.params.id}, updatedUser, function(err) {
    if (err) return res.status(500).send({'msg': 'this release has proved resistant to update.'});
    res.json(req.body);
  });
});

app.delete('/users/:id', function(req, res) {
  User.remove({_id: req.params.id}, true);
  res.end();
});