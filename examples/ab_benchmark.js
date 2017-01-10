'use strict';
/**
 * 
 * @file ab benchmark
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
var http = require('http');
var finished = require('on-finished');

// customization
var rate = transfer({
  output: false,
  response: false
});

var attempts = 4000;
var total = 0.0;
var i = 0;

// routing
var server = http.createServer(function(req, res) {

  var start = process.hrtime();

  res.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  res.end('ok');
  rate(req, res, start);

  finished(req, function(err) {

    if (!err) {
      if (++i === attempts) {
        console.log((total / attempts).toFixed(2) + ' KB/s');
        total = 0.0;
        i = 0;
      } else {
        total += res.transferRate * 1; // float conversion
      }
    }
  });
}).listen(3000);
console.log('starting "hello world" on port 3000');
