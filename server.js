const express = require('express');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json())

app.listen(3030);

app.get('/slack-auth-start', function (req, res, next) {
  'use strict';
  res.sendFile(__dirname + '/client/slack-auth-start.html');
});

app.get('/slack-auth-callback', function (req, res, next) {
  'use strict';
  console.log('clicked');
  res.redirect('https://slack.com/oauth/authorize?client_id=21683331090.21683939043&scope=bot&redirect_uri=http://localhost:3030/slack-auth-receive');
});

app.post('/slack-auth-receive', function(req, res, next) {
  'use strict';
  console.log(req.body);
});

app.get('/slack-auth-receive', function (req, res, next) {
  'use strict';
  let oauthCode = req.query.code;
  // console.log(oauthCode);
  // let oauthAccessUrl = 'https://slack.com/api/oauth.access'
  //   + '?client_id=21683331090.21683939043'
  //   + '&client_secret=c478a5c68facce7f5ae1ee6fd5e3622c'
  //   + '&code=' + oauthCode
  //   + '&redirect_uri=http://localhost:3030/slack-auth-receive';
  // res.redirect(oauthAccessUrl);
  let oauthAccessPOST = {
    client_id : "21683331090.21683939043",
    client_secret : "c478a5c68facce7f5ae1ee6fd5e3622c",
    code : "oauthCode",
    redirect_uri : "http://localhost:3030/slack-auth-receive"
  }

  request
    .post('https://slack.com/api/oauth.access')
    .form(oauthAccessPOST, function (err, httpresponse, body) {
      console.log('response',httpresponse);
      console.log('body',body);
    });
});
