const express = require('express');
const path = require('path');
const request = require('request-json');
const bodyParser = require('body-parser');
const promise = require('bluebird');

const oauthController = require('./server/auth_controller');
const rtmController = require('./server/rtm_controller');

const myToken = {
  ok: true,
  access_token: "xoxp-21683331090-21683331218-21685438340-3144486cda",
  scope: "identify,bot",
  team_name: "Wade's Test Team",
  team_id: "T0ML39R2N",
  bot: {
    bot_user_id: "U0ML5CWBW",
    bot_access_token: "xoxb-21685438404-QJ3SbK9hSACWG2YC6iFZ3LK3"
  }
}

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
);
