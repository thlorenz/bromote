'use strict';

var go = module.exports = function (cb) {
  console.log('running ', __filename);
  require('../support/run')(__dirname, { title: 'test remote runnel' }, cb);
};

if (!module.parent) go(function () {
  console.log('done');  
});
