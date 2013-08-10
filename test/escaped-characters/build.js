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
   { google_maps:
      { exports: 'google_maps',
        url: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA3WHUVQvWNydFRagaOiQNVxulLTFtvJOY&sensor=false' }
    }
};

module.exports = function build (debug) {

  var passThrough = new PassThrough();

  var bify = browserify();
  bromote(bify, config.remote, function (err, gens) {
    if (err) return console.error(err);

    bify
      .require(require.resolve('./test'), { entry: true })
      .bundle({ debug: debug })
      .pipe(passThrough);
  });
  return passThrough;
};
