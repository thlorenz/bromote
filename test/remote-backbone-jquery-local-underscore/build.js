'use strict';

var browserify  =  require('browserify');
var shim        =  require('browserify-shim');
var bromote     =  require('../..');
var bconfig     =  require('bconfig');
var PassThrough =  require('stream').PassThrough;

var fs          =  require('fs');
var path        =  require('path');

var config = { 
  shim:
   { underscore:
      { path: path.join(__dirname, '../../examples/requirejs-project/public/vendor/underscore-min.js'),
        exports: '_' } },
  remote:
   { jquery:
      { exports: '$',
        url: 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js' },
     backbone:
      { deps: { jquery: '$', underscore: '_' },
        exports: 'Backbone',
        url: 'http://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min.js' } } 
};

module.exports = function build (entry, debug) {

  var passThrough = new PassThrough();

  var bify = shim(browserify(), config.shim);

  bromote(config.remote, function (err, gens) {
    if (err) return console.error(err);
    
    gens.forEach(function (gen) { bify.add(gen); });

    bify
      .add(entry, { entry: true })
      .bundle({ debug: debug })
      .pipe(passThrough);
  });
  return passThrough;
};
