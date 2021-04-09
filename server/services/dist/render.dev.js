"use strict";

exports.homeRoutes = function (req, res) {
  res.render('index', {
    users: "New Data"
  });
};

exports.add_user = function (req, res) {
  res.render('add_user');
};

exports.update_user = function (req, res) {
  res.render('update_user');
};