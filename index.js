'use strict';
/**
 * @file transfer-rate main
 * @module transfer-rate
 * @version 2.1.0
 * @author hex7c0 <hex7c0@gmail.com>
 * @copyright hex7c0 2017
 * @license GPLv3
 */

/*
 * functions
 */
/**
 * starting point
 * 
 * @function wrapper
 * @param {Object} my - user cfg
 * @return {Function}
 */
function wrapper(my) {

  var finished = require('on-finished');

  var __denominator = my.denominator;
  var __byte = my.byte;
  var __time = my.time;
  var __out = my.out;

  /**
   * response
   * 
   * @function wrapper
   * @param {Object} socket - client socket
   * @param {Array} start - start time
   * @return {String}
   */
  function response(socket, start) {

    var diff = process.hrtime(start);
    var nanoseconds = diff[0] * 1e9 + diff[1];
    var bytes = socket.bytesWritten - ~~socket.transferRateBytesWritten;
    var data = (bytes * __byte) / __denominator;

    socket.transferRateBytesWritten = socket.bytesWritten; // keep-alive socket
    return (data / (nanoseconds / __time)).toFixed(2) + __out;
  }

  /**
   * request
   * 
   * @function wrapper
   * @param {Object} socket - client socket
   * @param {Array} start - start time
   * @return {String}
   */
  function request(socket, start) {

    var diff = process.hrtime(start);
    var nanoseconds = diff[0] * 1e9 + diff[1];
    var bytes = socket.bytesRead - ~~socket.transferRateBytesRead;
    var data = (bytes * __byte) / __denominator;

    socket.transferRateBytesRead = socket.bytesRead; // keep-alive socket
    return (data / (nanoseconds / __time)).toFixed(2) + __out;
  }

  if (my.response) {

    /**
     * rate
     * 
     * @function rate
     * @param {Object} req - client request
     * @param {Object} res - client response
     * @param {Array} start - start time
     * @return {String}
     */
    return function rate(req, res, start) {

      if (typeof req !== 'object') {
        throw new TypeError('req required');
      } else if (typeof res !== 'object') {
        throw new TypeError('res required');
      } else if (Array.isArray(start) === false) {
        throw new TypeError('start required');
      }

      /*
       * single request
       */
      if (finished.isFinished(res)) {
        var socket = res.socket || req.socket;
        var data = response(socket, start);
        req.transferRate = res.transferRate = data;
        return data;
      }

      /*
       * chunk
       */
      finished(res, function(err, res) {

        if (!err) {
          var socket = res.req.socket;
          var data = response(socket, start);
          req.transferRate = res.transferRate = data;
        }
      });
    };

  } else {

    /**
     * rate
     * 
     * @function rate
     * @param {Object} req - client request
     * @param {Object} res - client response
     * @param {Array} start - start time
     * @return {String}
     */
    return function rate(req, res, start) {

      if (typeof req !== 'object') {
        throw new TypeError('req required');
      } else if (typeof res !== 'object') {
        throw new TypeError('res required');
      } else if (Array.isArray(start) === false) {
        throw new TypeError('start required');
      }

      /*
       * single request
       */
      if (finished.isFinished(req)) {
        var socket = req.socket;
        var data = request(socket, start);
        req.transferRate = res.transferRate = data;
        return data;
      }

      /*
       * chunk
       */
      finished(req, function(err, req) {

        if (!err) {
          var socket = req.socket;
          var data = request(socket, start);
          req.transferRate = res.transferRate = data;
        }
      });
    };

  }
}

/**
 * option setting
 * 
 * @exports transfer
 * @function transfer
 * @param {Object} opt - various options. Check README.md
 * @return {Object}
 */
function transfer(opt) {

  var options = opt || Object.create(null);
  var my = {
    denominator: 1024,
    byte: 1,
    out: ' KB/s',
    time: 1000000000,
    response: true
  };

  if (options.data === 'Byte') {
    // if (Boolean(options.Bps)) {
    my.denominator = 1;
    my.byte = 1;
    my.out = ' Byte';
  } else if (options.data === 'KB') {
    // } else if (Boolean(options.KBps)) {
    my.denominator = 1024;
    my.byte = 1;
    my.out = ' KB';
  } else if (options.data === 'MB') {
    // } else if (Boolean(options.MBps)) {
    my.denominator = 1048576;
    my.byte = 1;
    my.out = ' MB';
  } else if (options.data === 'bit') {
    // } else if (Boolean(options.bps)) {
    my.denominator = 1;
    my.byte = 8;
    my.out = ' bit';
  } else if (options.data === 'Kb') {
    // } else if (Boolean(options.kbps)) {
    my.denominator = 1000;
    my.byte = 8;
    my.out = ' Kbit';
  } else if (options.data === 'Mb') {
    // } else if (Boolean(options.Mbps)) {
    my.denominator = 1000000;
    my.byte = 8;
    my.out = ' Mbit';
  }

  if (options.time === 'nanosecond') {
    // if (Boolean(options.nanosecond)) {
    my.time = 1;
    my.out += '/ns';
  } else if (options.time === 'millisecond') {
    // } else if (Boolean(options.millisecond)) {
    my.time = 1000000;
    my.out += '/ms';
  } else if (options.time === 'second') {
    // } else if (Boolean(options.second)) {
    my.time = 1000000000;
    my.out += '/s';
  }

  if (options.output === false) {
    my.out = '';
  }

  if (options.response === false) {
    my.response = false;
  }

  return wrapper(my);
}
module.exports = transfer;
