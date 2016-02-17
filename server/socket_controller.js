const io = require('socket.io-client');

var socketController = {};

socketController.startconn = function (req, res, next) {
  'use strict';
  let socketURL = req.rtminfo.url;
  let socket = io(socketURL);
  socket.on('connect', function() {
    console.log('connect');
  });
  socket.on('error', function(error) {
    console.log('error', error);
  });

}

module.exports = socketController;
