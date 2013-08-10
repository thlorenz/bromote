'use strict';

var browserify  =  require('browserify');
var bromote     =  require('../..');
var PassThrough =  require('stream').PassThrough;

var fs          =  require('fs');
var path        =  require('path');

// That API_KEY only works from localhost & 127.0.0.1, so like, don't be a jerk
// and get your own

var remote = { 
  jsonpTest: { 
      exports: 'jsonpTest'
    , url: 'jsonp-harness.js?callback=?' 
  }
};

var build = module.exports = function (debug) {

  var passThrough = new PassThrough();
  var bify = browserify();

  bromote(bify, remote, function (err, gens) {
    if (err) return console.error(err);
    
    bify
      .require(require.resolve('./test'), { entry: true })
      .bundle({ debug: debug })
      .pipe(passThrough);
  });

  return passThrough;
};
