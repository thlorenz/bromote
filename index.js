'use strict';

var genRemote =  require('./gen-remote');
var xtend     =  require('xtend');
var runnel    =  require('runnel');

module.exports = function addRemotes(remotes, cb) {
  if (!remotes.length) return cb(null, []);
  
  var gens = [];
  var tasks = Object.keys(remotes)
    .map(function (k) {
      var remote = remotes[k];
      return function (cb) { 
        genRemote(remote, function (err, gen) {
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
