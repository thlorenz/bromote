'use strict';

var genRemote =  require('./gen-remote');
var xtend     =  require('xtend');
var runnel    =  require('runnel');

module.exports = function addRemoteScripts(remote, cb) {
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

    });

  tasks.push(function (err) {
    if (err) return cb(err);
    cb(null, gens);
  });

  runnel(tasks);
};
