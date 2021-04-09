const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const connectDB = require('./server/database/connection');
const route = require('./server/routes/router');
const app = express();

//Configurations
const PORT =9000;

//MongoDB Connection
connectDB();

//Body Parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Log Requests
app.use(morgan('short'));

//Set View Engine
app.set("view engine", "ejs");

//Load Assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")));
app.use('/img',express.static(path.resolve(__dirname,"assets/img")));
app.use('/js',express.static(path.resolve(__dirname,"assets/js")));

//Load Routers
app.use('/', require('./server/routes/router'))

//Home Route
app.get('/',(req,res)=>{
    res.status(200);
    res.send("Crud Application");
    res.end();
});

//HTTP Server Setting
app.listen(PORT, ()=>{
    console.log(`Server is running on Port:${PORT}`);
});
