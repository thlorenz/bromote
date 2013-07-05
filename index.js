'use strict';

var xtend        =  require('xtend');
var runnel       =  require('runnel');
var cleanLoaders =  require('./lib/clean-loaders');
var genRemote    =  require('./lib/gen-remote');
var genIndex     =  require('./lib/gen-index'); 

/**
 * Generates all remote loaders and adds them to browserify instance if it is given.
 * Calls back with paths to generated loaders.
 *
 * @name exports
 * @function
 * @param bify {Object} browserify instance (optional) but recommended
 * @param remote {Object} hashtable containing information about remote scripts for which to generate and add loaders
 * @param cb {Function} called back with paths to generated loaders
 */
module.exports = function addRemoteScripts(bify, remote, cb) {

  if (typeof remote == 'function') {
    cb = remote;
    remote = bify;
    bify = null;
  }

  cleanLoaders(function (err) {
    if (err) return cb(err);  
    if (!remote) return cb(null, []);

    var keys = Object.keys(remote); 
    if (!keys.length) return cb(null, []);
    
    var gens = [];

    var tasks = keys 
      .map(function (k) {
        var rem = remote[k];
        rem.key = k;

        return function (cb) { 
          genRemote(rem, function (err, gen) {
            if (err) return cb(err);
            gens.push(gen);
            cb();
          });
        };
      })
      .concat(genIndex.bind(null, gens))
      .concat(
        function (err) {
          if (err) return cb(err);
          if (bify) gens.forEach(function (gen) { bify.add(gen); });

          cb(null, gens);
        }
      );

    runnel(tasks);
  });
};
