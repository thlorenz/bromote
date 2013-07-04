'use strict';

var browserify  =  require('browserify');
var shim        =  require('browserify-shim');
var bromote     =  require('bromote');
var bconfig     =  require('bconfig');
var PassThrough =  require('stream').PassThrough;

var fs          =  require('fs');
var path        =  require('path');

var config = bconfig(require.resolve('./requirejs-config'));

function build (debug) {

  var passThrough = new PassThrough();

  var bify = shim(browserify(), config.shim);

  bromote(config.remote, function (err, gens) {
    if (err) return console.error(err);
    console.error('gens: ', gens);
    
    gens.forEach(function (gen) { bify.add(gen); });

    bify
      .add(config.entry, { entry: true })
      .bundle({ debug: debug })
      .pipe(passThrough);
  });
  return passThrough;
}

var bundlePath = path.join(__dirname, 'public', 'bundle.js');
build(true).pipe(fs.createWriteStream(bundlePath, 'utf8'));
