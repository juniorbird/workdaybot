const request = require('request-json');

var oauthController = {}

oauthController.getNewToken = function(req, res, next) {
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
    if (body) {
      req.oauthResponse = body;
      req.oauthToken_bot = body.bot.bot_access_token;
      req.oauthToken_client = body.access_token;
      console.log(req.oauthToken_client);
      next();
    }
  });
}

module.exports = oauthController;
