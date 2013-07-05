'use strict';

var browserify  =  require('browserify');
var bromote     =  require('../..');

var remote = {
  runnel:
    { exports: 'runnel',
      url: 'https://raw.github.com/thlorenz/runnel/master/index.js' } 
};

var build = module.exports = function (debug, cb) {

  var bify = browserify();

  bromote(remote, function (err, gens) {
    if (err) return console.error(err);
    
    gens.forEach(function (gen) { bify.add(gen); });

    bify
      .add(require.resolve('./test'), { entry: true })
      .bundle({ debug: debug }, cb);
  });
};
