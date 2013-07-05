'use strict';

var scriptjs = require('scriptjs');
var bromote = require('../loaders');
var loaded = {};

function attachDep(windowKey, requireKey, cb) {
  try {
    window[windowKey] = require(requireKey);
    setTimeout(cb, 0);
  } catch (reqerr) {
    // not in the bundle, lets hope it's a remote
    if (typeof bromote[requireKey] !== 'function') 
      return cb(new Error(requireKey + ' was neither included in the bundle, nor as a remote script!'));

    bromote[requireKey](function (dep) {
      window[windowKey] = dep;
      cb(); 
    });
  }
}

function attachDepsToWindow(deps, cb) {
  if (!deps) return setTimeout(cb, 0);

  var keys = Object.keys(deps)
    , tasks = keys.length
    , error;

  if (!tasks) return setTimeout(cb, 0);

  keys.forEach(function (k) {
    attachDep(deps[k], k, function (err) {
      if (error) return;
      if (err) return cb(error = err);  
      if (!--tasks) cb();
    });
  });
}

function loadScript (asset, cb) {
  scriptjs(asset.url, function () {
    loaded[asset.url] = window[asset.exports];
    if (typeof asset.init === 'function') asset.init();
    cb(loaded[asset.url]);
  });
}

module.exports = function (asset, cb) {
  if (loaded[asset.url]) 
    return setTimeout(cb.bind(null, loaded[asset.url]), 0);

  attachDepsToWindow(asset.deps, function (err) {
    if (err) return (console.error(err.message), console.error(err.stack));
    
    loadScript(asset, cb);
  });
};
