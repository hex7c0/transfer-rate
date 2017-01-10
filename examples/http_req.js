'use strict';
/**
 * 
 * @file http with request example
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
  response: false
});

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
      console.log(req.transferRate); // show transferRate to console
    }
  });
}).listen(3000);
console.log('starting "hello world" on port 3000');
