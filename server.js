const express = require('express');
const path = require('path');
const request = require('request-json');
const bodyParser = require('body-parser');

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

app.get('/slack-auth-receive', function (req, res, next) {
  'use strict';
  let oauthCode = req.query.code;
  // console.log(oauthCode);
  let oauthAccessUrl = 'oauth.access'
    + '?client_id=21683331090.21683939043'
    + '&client_secret=c478a5c68facce7f5ae1ee6fd5e3622c'
    + '&code=' + oauthCode
    + '&redirect_uri=http://localhost:3030/slack-auth-receive';
  // res.redirect(oauthAccessUrl);

  let client = request.createClient('https://slack.com/api/');
  client.get(oauthAccessUrl, function (err, res, body) {
    if (err) console.log('err', err);
    if (body) authToken = body;
  });

  console.log(authToken);

  // request
  //   .get(oauthAccessUrl)
  //   .on('response', function (response) {
  //     console.log(response.headers);
  //     // response.on('body', function(body) {
  //     //   console.log(body);
  //     // })
  //     console.log('---------------');
  //     console.log(JSON.stringify(response.body));
  //   });
});
