const io = require('socket.io-client');

var socketController = {};

socketController.connect = function (req, res, next) {
  'use strict';
  console.log('in socket controller');
  let socketURL = req.rtminfo.url;
  console.log('socketURL',socketURL);
  let socket = io.connect(socketURL);
  console.log('socket',socket);
  socket.on('error', function (error) {
    console.log('error!', error);
  });
  socket.on('open', function() {
    console.log('socket open!');
  });
  socket.on('connect', function() {
    console.log('socket connected!');
  });
  socket.on('data', function() {
    console.log('socket says', data);
  });
}

module.exports = socketController;
