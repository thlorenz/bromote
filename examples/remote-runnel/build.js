'use strict';

var browserify  =  require('browserify');
var bromote     =  require('bromote');
var PassThrough =  require('stream').PassThrough;

var fs          =  require('fs');
var path        =  require('path');

var remote = {
  runnel:
    { exports: 'runnel',
      url: 'https://raw.github.com/thlorenz/runnel/master/index.js' } 
};

function build (debug) {

  var passThrough = new PassThrough();
  var bify = browserify();

  bromote(remote, function (err, gens) {
    if (err) return console.error(err);
    
    gens.forEach(function (gen) { bify.add(gen); });

    bify
      .add(require.resolve('./main'), { entry: true })
      .bundle({ debug: debug })
      .pipe(passThrough);
  });

  return passThrough;
}

var bundlePath = path.join(__dirname, 'bundle.js');
build(true).pipe(fs.createWriteStream(bundlePath, 'utf8'));
