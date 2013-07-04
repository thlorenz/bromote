'use strict';

var scriptjs = require('scriptjs');
var loaded = {};

module.exports = function (asset, cb) {
  if (loaded[asset.url]) 
    return setTimeout(cb.bind(null, loaded[asset.url]), 0);

  if (asset.deps) {
    Object.keys(asset.deps).forEach(function (k) {
      window[asset.deps[k]] = require(k);
    });
  }

  scriptjs(asset.url, function () {
    loaded[asset.url] = window[asset.exports];
    if (typeof asset.init === 'function') asset.init();
    cb(loaded[asset.url]);
  });
};
