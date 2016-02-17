const express = require('express');
const path = require('path');
const request = require('request-json');
const bodyParser = require('body-parser');
const promise = require('bluebird');
const io = require('socket.io')


const oauthController = require('./server/auth_controller');
const rtmController = require('./server/rtm_controller');
const socketController = require('./server/socket_controller');

// This is a good token we can use for testing if needed

var authToken;

var app = express();

app.use(bodyParser.json());

app.listen(3030);

app.get('/slack-auth-start', function (req, res, next) {
  'use strict';
  res.sendFile(__dirname + '/client/slack-auth-start.html');
});

app.get('/slack-auth-callback', function (req, res, next) {
  'use strict';
  // console.log('clicked');
  res.redirect('https://slack.com/oauth/authorize?client_id=21683331090.21683939043&scope=bot&redirect_uri=http://localhost:3030/slack-auth-receive');
});

app.post('/slack-auth-receive', function(req, res, next) {
  'use strict';
  // console.log(req.body);
});

app.get('/slack-auth-receive'
  , oauthController.getNewToken
  , rtmController.connect
  , socketController.startconn
);
