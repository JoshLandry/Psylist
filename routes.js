'use strict';
var Release = require('./models/Release');
var User = require('./models/User');
var eat_auth = require('./lib/eat_auth');
var bodyparser = require('body-parser');

// routes

module.exports = function(router, passport, appSecret) {

  router.get('/', function(request, response) {
    response.render('./Index.html')
    console.log("loaded");
  });

  // Releases Routes

  router.get('/releases', eat_auth(appSecret), function(req,res) {
    Release.find({}, function(err, data) {
      if(err) return res.status(500).send({'msg': 'we cant find yr shit'});
      res.json(data);
    });
  });

  router.post('/releases', eat_auth(appSecret), function(req,res) {

    console.log("this is a post");

    var newRelease = new Release(req.body);
    newRelease.save(function(err, data) {
      if (err) return res.status(500).send({'msg': 'could not save yr shit.'});
      res.json(data);
    });
  });

  router.put('/releases/:id', eat_auth(appSecret), function(req, res) {
    var updatedRelease = req.body;
    delete updatedRelease._id;
    Release.update({_id: req.params.id}, updatedRelease, function(err) {
      if (err) return res.status(500).send({'msg': 'this release has proved resistant to update.'});
      res.json(req.body);
    });
  });

  router.delete('/releases/:id', eat_auth(appSecret), function(req, res) {
    Release.remove({_id: req.params.id}, true);
    res.end();
  });

  // User Routes

  router.get('/users', function(req,res) {
    User.find({}, function(err, data) {
      if(err) return res.status(500).send({'msg': 'we cant find yr shit'});
      res.json(data);
    });
  });

  router.post('/create_user', function(req, res) {
    var newUser = new User();
    newUser.basic.email = req.body.email;
    newUser.basic.password = newUser.generateHash(req.body.password);
    newUser.save(function(err, user) {
      if (err) return res.status(500).send({msg: 'could not create user'});

      newUser.generateToken(appSecret, function(err, token) {
        if (err) return res.status(500).send({msg: 'could not generate token'});
        res.json({eat: token});
      })
    });
  });

  router.get('/sign_in', passport.authenticate('basic', {session: false}), function(req, res) {
    req.user.generateToken(appSecret, function(err, token) {
      if (err) return res.status(500).send({msg: 'could not generate token'});
      res.json({eat: token});
    })
  });

  // app.put('/users/:id', function(req, res) {
  //   var updatedUser = req.body;
  //   delete updatedUser._id;
  //   User.update({_id: req.params.id}, updatedUser, function(err) {
  //     if (err) return res.status(500).send({'msg': 'this release has proved resistant to update.'});
  //     res.json(req.body);
  //   });
  // });

  router.delete('/users/:id', function(req, res) {
    User.remove({_id: req.params.id}, true);
    res.end();
  });
};