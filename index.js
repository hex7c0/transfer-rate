'use strict';
/**
 * @file transfer-rate main
 * @module transfer-rate
 * @subpackage main
 * @version 1.2.0
 * @author hex7c0 <hex7c0@gmail.com>
 * @copyright hex7c0 2014
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

  /**
   * response
   * 
   * @function wrapper
   * @param {Object} req - client request socket
   * @param {Array} start - start time
   * @param {Boolean} clean - clean var
   * @return {String}
   */
  function response(req, start, clean) {

    var diff = process.hrtime(start);
    diff = diff[0] * 1e9 + diff[1]; // nanosecond
    var data = (req._bytesDispatched * my.byte) / my.misura;
    if (clean === true) {
      first = new Array(2);
      story._bytesDispatched = 0;
    }
    return (data / (diff / my.time)).toFixed(1) + my.out;
  }

  /**
   * request
   * 
   * @function wrapper
   * @param {Object} req - client request socket
   * @param {Array} start - start time
   * @param {Boolean} clean - clean var
   * @return {String}
   */
  function request(req, start, clean) {

    var diff = process.hrtime(start);
    diff = diff[0] * 1e9 + diff[1]; // nanosecond
    var data = (req.bytesRead * my.byte) / my.misura;
    if (clean === true) {
      first = new Array(2);
      story.bytesRead = 0;
    }
    return (data / (diff / my.time)).toFixed(1) + my.out;
  }

  var oi = response;
  if (!my.response) {
    oi = request;
  }
  var first = new Array(2);
  var story = {
    _bytesDispatched: 0,
    bytesRead: 0
  };

  /**
   * rate
   * 
   * @function rate
   * @param {Object} req - client request socket
   * @param {Array} start - start time
   * @return {String}
   */
  return function rate(req, start) {

    if (!req || typeof req !== 'object') {
      throw new TypeError('req required');
    }
    if (!start || Array.isArray(start) === false) {
      throw new TypeError('start required');
    }

    var res = req.res;
    if (!first[1]) {
      first = start;
    }

    // single
    if (res.finished === true) {
      req.transferRate = oi(req.socket, first);
      return req.transferRate;
    }

    // chunk
    var soc = req.socket;
    /**
     * close callback
     * 
     * @function close
     */
    function close() {

      story._bytesDispatched += soc._bytesDispatched;
      story.bytesRead += soc.bytesRead;
      return;
    }

    /**
     * finish callback
     * 
     * @function finish
     */
    function finish() {

      cleanup();
      if (first[1]) {
        story._bytesDispatched += soc._bytesDispatched;
        story.bytesRead += soc.bytesRead;
        req.transferRate = oi(story, first, true);
        return req.transferRate;
      }
      return;
    }

    /**
     * clear listener
     * 
     * @function cleanup
     */
    function cleanup() {

      // soc.removeListener('finish', finish);
      soc.removeListener('close', close);
      return;
    }

    soc.once('close', finish);
    // soc.once('finish', finish);
    return;
  };
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
    misura: 1024,
    byte: 1,
    out: ' KB/s',
    time: 1000000000,
    response: true
  };

  // if (Boolean(options.Bps)) {
  if (options.data == 'Byte') {
    my.misura = 1;
    my.byte = 1;
    my.out = ' Byte';
  } else if (options.data == 'KB') {
    // } else if (Boolean(options.KBps)) {
    my.misura = 1024;
    my.byte = 1;
    my.out = ' KB';
  } else if (options.data == 'MB') {
    // } else if (Boolean(options.MBps)) {
    my.misura = 1048576;
    my.byte = 1;
    my.out = ' MB';
  } else if (options.data == 'bit') {
    // } else if (Boolean(options.bps)) {
    my.misura = 1;
    my.byte = 8;
    my.out = ' bit';
  } else if (options.data == 'Kb') {
    // } else if (Boolean(options.kbps)) {
    my.misura = 1000;
    my.byte = 8;
    my.out = ' Kbit';
  } else if (options.data == 'Mb') {
    // } else if (Boolean(options.Mbps)) {
    my.misura = 1000000;
    my.byte = 8;
    my.out = ' Mbit';
  }

  if (options.time == 'nanosecond') {
    // if (Boolean(options.nanosecond)) {
    my.time = 1;
    my.out += '/ns';
  } else if (options.time == 'millisecond') {
    // } else if (Boolean(options.millisecond)) {
    my.time = 1000000;
    my.out += '/ms';
  } else if (options.time == 'second') {
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
