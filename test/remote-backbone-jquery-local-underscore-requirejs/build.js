'use strict';

var browserify  =  require('browserify');
var shim        =  require('browserify-shim');
var bromote     =  require('../..');
var bconfig     =  require('bconfig');
var PassThrough =  require('stream').PassThrough;

var fs          =  require('fs');
var path        =  require('path');

var config = bconfig(require.resolve('./requirejs-config'));

module.exports = function build (debug) {

  var passThrough = new PassThrough();

  var bify = shim(browserify(), config.shim);

  bromote(bify, config.remote, function (err, gens) {
    if (err) return console.error(err);
    
    bify
      .require(config.entry, { entry: true })
      .bundle({ debug: debug })
      .pipe(passThrough);
  });
  return passThrough;
};
