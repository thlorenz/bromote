'use strict';

var browserify  =  require('browserify');
var bromote     =  require('../..');
var PassThrough =  require('stream').PassThrough;

var remote = {
  runnel:
    { exports: 'runnel',
      url: 'https://raw.github.com/thlorenz/runnel/master/index.js' } 
};

var build = module.exports = function (debug) {

  var passThrough = new PassThrough();
  var bify = browserify();

  bromote(remote, function (err, gens) {
    if (err) return console.error(err);
    
    // not passing bify, but adding generated loaders manually instead
    gens.forEach(function (gen) { bify.add(gen); });

    bify
      .add(require.resolve('./test'), { entry: true })
      .bundle({ debug: debug })
      .pipe(passThrough);
  });

  return passThrough;
};
