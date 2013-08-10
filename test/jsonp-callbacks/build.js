'use strict';

var browserify  =  require('browserify');
var bromote     =  require('../..');
var PassThrough =  require('stream').PassThrough;

var fs          =  require('fs');
var path        =  require('path');

// That API_KEY only works from localhost & 127.0.0.1, so like, don't be a jerk
// and get your own

var config = {
  remote:
   { jsonpTest:
      { exports: 'jsonpTest',
        url: 'jsonp-harness.js?callback=?' }
    }
};

module.exports = function build (entry, debug) {

  var passThrough = new PassThrough();

  var bify = browserify();
  bromote(bify, config.remote, function (err, gens) {
    if (err) return console.error(err);

    bify
      .require(entry, { entry: true })
      .bundle({ debug: debug })
      .pipe(passThrough);
  });
  return passThrough;
};
