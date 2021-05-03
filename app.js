var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const user = require('./schemas/user');

const mongoose = require('mongoose');
const uri = "mongodb+srv://isak:isak@cluster0.i6tdm.mongodb.net/newsletter?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');
var subscriptionRouter = require('./routes/subscription');

var app = express();
app.set('view engine', 'ejs');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', indexRouter);
app.use('/subscription', subscriptionRouter);
app.use('/user', usersRouter);

module.exports = app;
