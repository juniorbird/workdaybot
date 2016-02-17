// const io = require('socket.io-client');

var socketController = {};

socketController.connect = function (req, res, next) {
  'use strict';
  console.log('in socket controller');
  let socketURL = req.rtminfo.url;
  var socket = require('socket.io-client')(socketURL);
  console.log('connecting to', socketURL);
  socket.connect();
  console.log(socket);
  // let socket = io.connect(socketURL);
  socket.on('error', function(error) {
    console.log('error', error);
  });
  socket.on('connect', function() {
    console.log('connected');
  });
}

module.exports = socketController;
