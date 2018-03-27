'use strict';
require('../models/User');

var mongoose = require('mongoose'), User = mongoose.model('User');
var moment = require('moment');
var userController = {};

userController.list = function(req, res) {
  User.find({}).exec(function (err, users) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      console.log(users);
      res.render("../views/users/index", {users: users});
    }
  });
};

userController.view = function(req, res) {
  User.findOne({_id: req.params.id}).exec(function (err, user) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/users/view", {user: user, moment: moment});
    }
  });
};

userController.create = function(req, res) {
  res.render("../views/users/create");
};

userController.save = function(req, res) {
  var birthday = moment(req.body.birthday).unix()*1000;
  var user = new User({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      birthday: birthday,
      favoriteColor: req.body.favoriteColor
    });
  user.save(function(err) {
    if(err) {
      console.log(err);
      res.render("../views/users/create");
    } else {
      console.log("Successfully created an user.");
      res.redirect("/users/view/"+user._id);
    }
  });
};

userController.edit = function(req, res) {
  User.findOne({_id: req.params.id}).exec(function (err, user) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/users/edit", {user: user, moment: moment});
    }
  });
};

userController.update = function(req, res) {
  var birthday = moment(req.body.birthday).unix()*1000;
  User.findByIdAndUpdate(req.params.id, { $set:
    { name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      birthday: moment(birthday),
      favoriteColor: req.body.favoriteColor
    }}, { new: true }, function (err, user) {
    if (err) {
      console.log(err);
      res.render("../views/users/edit", {user: req.body });
    }
    res.redirect("/users/view/"+user._id);
  });
};

userController.delete = function(req, res) {
  User.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("User deleted!");
      res.redirect("/users");
    }
  });
};

module.exports = userController;
