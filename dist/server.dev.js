"use strict";

var express = require('express');

var dotenv = require('dotenv');

var mongoose = require('mongoose');

var morgan = require('morgan');

var path = require('path');

var connectDB = require('./server/database/connection');

var route = require('./server/routes/router');

var app = express(); //Configurations

var PORT = 3000; //MongoDB Connection

connectDB(); //Body Parser

app.use(express.json());
app.use(express.urlencoded({
  extended: false
})); //Log Requests

app.use(morgan('short')); //Set View Engine

app.set("view engine", "ejs"); //Load Assets

app.use('/css', express["static"](path.resolve(__dirname, "assets/css")));
app.use('/img', express["static"](path.resolve(__dirname, "assets/img")));
app.use('/js', express["static"](path.resolve(__dirname, "assets/js"))); //Load Routers

app.use('/', require('./server/routes/router')); //HTTP Server Setting

app.listen(PORT, function () {
  console.log("Server is running on Port:".concat(PORT));
});