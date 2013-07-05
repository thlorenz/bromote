'use strict';

var browserify  =  require('browserify');
var bromote     =  require('../..');
var PassThrough =  require('stream').PassThrough;

var fs          =  require('fs');
var path        =  require('path');

var config = { 
  remote:
   { jquery:
      { exports: '$',
        url: 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js' },
     backbone:
      { deps: { jquery: '$', underscore: '_' },
        exports: 'Backbone',
        url: 'http://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min.js' },
     underscore: 
       { exports: '_',
         url: 'http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min.js' } }
};

module.exports = function build (entry, debug) {

  var passThrough = new PassThrough();

  var bify = browserify();
  bromote(bify, config.remote, function (err, gens) {
    if (err) return console.error(err);
    
    bify
      .add(entry, { entry: true })
      .bundle({ debug: debug })
      .pipe(passThrough);
  });
  return passThrough;
};
