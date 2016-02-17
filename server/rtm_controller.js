const request = require('request-json');

var rtmController = {}

rtmController.connect = function (req, res, next) {
  'use strict';

  let client = request.createClient('https://slack.com/api/');

  let rtmURL = 'rtm.start?token=' + req.oauthToken_bot + '&scope=bot';
  client.get(rtmURL, function (err, res, body) {
    if (err) console.log('err', err);
    if (body) {
      // console.log(body);
      let rtmInfo = {};
      rtmInfo.self_id = body.self.id;
      rtmInfo.self_name = body.self.name;
      rtmInfo.team_id = body.team.id;
      rtmInfo.team_name = body.team.name;
      rtmInfo.channels = body.channels;
      rtmInfo.ims = body.ims;
      rtmInfo.users = body.users;
      rtmInfo.url = body.url;
      req.rtminfo = rtmInfo;
      console.log(req.rtminfo);

      next();
    }
  });
}

module.exports = rtmController;
