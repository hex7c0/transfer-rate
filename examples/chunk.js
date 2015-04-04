'use strict';
/**
 * @file chunk example
 * @module transfer-rate
 * @subpackage examples
 * @version 0.0.1
 * @author hex7c0 <hex7c0@gmail.com>
 * @license GPLv3
 */

/*
 * initialize module
 */
var transfer = require('..'); // use require('transfer-rate') instead
var app = require('express')();

// customization
var rate = transfer();

// routing
app.get('/', function(req, res) {

  var start = process.hrtime();
  rate(req, start);
  res.sendFile(require('path').resolve('a.pdf')); // "a.pdf" is a 12Mb file
  req.socket.once('close', function() {

    if (req.transferRate) {
      console.log(req.transferRate);
    }

  });
}).listen(3000);
console.log('starting "hello world" on port 3000');
