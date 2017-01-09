'use strict';
/**
 * @file transfer-rate main
 * @module transfer-rate
 * @version 2.0.0
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
    diff = diff[0] * 1e9 + diff[1]; // nanosecond
    var data = (socket._bytesDispatched * __byte) / __denominator;
    return (data / (diff / __time)).toFixed(2) + __out;
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
    diff = diff[0] * 1e9 + diff[1]; // nanosecond
    var data = (socket.bytesRead * __byte) / __denominator;
    return (data / (diff / __time)).toFixed(2) + __out;
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

      if (!req || typeof req !== 'object') {
        throw new TypeError('req required');
      } else if (!res || typeof res !== 'object') {
        throw new TypeError('res required');
      } else if (!start || Array.isArray(start) === false) {
        throw new TypeError('start required');
      }

      /*
       * single request
       */
      if (finished.isFinished(res)) {
        var socket = res.socket || res.req.client;
        var data = response(socket, start);
        req.transferRate = res.transferRate = data;
        return data;
      }

      /*
       * chunk
       */
      /**
       * finish callback
       * 
       * @function finish
       */
      function finish(err, res) {

        if (!err) {
          var socket = res.req.client;
          var data = response(socket, start);
          req.transferRate = res.transferRate = data;
          return data;
        }
      }

      finished(res, finish);
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

      if (!req || typeof req !== 'object') {
        throw new TypeError('req required');
      } else if (!res || typeof res !== 'object') {
        throw new TypeError('res required');
      } else if (!start || Array.isArray(start) === false) {
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
      /**
       * finish callback
       * 
       * @function finish
       */
      function finish(err, req) {

        if (!err) {
          var socket = req.client._handle || req.client.server._handle;
          var data = request(socket, start);
          req.transferRate = res.transferRate = data;
          return data;
        }
      }

      finished(req, finish);
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

  if (options.response === false) {
    my.response = false;
  }

  if (options.output === false) {
    my.out = '';
  }

  return wrapper(my);
}
module.exports = transfer;
