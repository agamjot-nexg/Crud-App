"use strict";

var Userdb = require('../model/model'); //Create and Save new user


exports.create = function (req, res) {
  //Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content Can't Be Empty"
    });
    return;
  } //New User


  var user = new Userdb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status
  }); //Save To Database

  user.save(user).then(function (data) {
    res.send(data);
  })["catch"](function (err) {
    res.status(500).send({
      message: err.message || "Some Error Occured While Saving This User!"
    });
  });
}; //Retrieve and Return All Users  //Retrieve and Return Single User


exports.find = function (req, res) {
  if (req.query.id) {
    var id = req.query.id;
    Userdb.findById(id).then(function (data) {
      if (!data) {
        res.status(404);
        res.send({
          message: "Not found user with id:" + id
        });
      } else {
        res.send(data);
      }
    })["catch"](function (err) {
      res.status(500).send({
        message: err.message || "Some Error Occured While Saving This User!"
      });
    });
  } else {
    Userdb.find().then(function (user) {
      res.send(user);
    })["catch"](function (err) {
      res.status(500);
      res.send(err.message) || "Error in loading user information!";
    });
  }
}; //Update a new identified user by user id


exports.update = function (req, res) {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to be update cannot be empty!"
    });
  }

  var id = req.params.id;
  Userdb.findByIdAndUpdate(id, req.body, {
    useFindAndModify: false
  }).then(function (data) {
    if (!data) {
      res.status(404).sebd({
        message: "Cannot update user with ".concat(id, ". User Not Found.")
      });
    } else {
      res.send(data);
    }
  })["catch"](function (err) {
    res.send(500);
    res.send(err.message) || "Error in updating user information.";
  });
}; //Delete a user with specified user id in the request


exports["delete"] = function (req, res) {
  var id = req.params.id;
  Userdb.findByIdAndDelete(id).then(function (data) {
    if (!data) {
      res.status(404);
      res.send({
        mesage: "Cannot Delete User with id:".concat(id, " Wrong ID!")
      });
    } else {
      res.status(200);
      res.send({
        message: "User was deleted successfully "
      });
    }
  })["catch"](function (err) {
    res.status(500);
    res.send({
      message: "Could not delete user with id:" + id
    });
  });
};