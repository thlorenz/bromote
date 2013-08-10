'use strict';

var go = module.exports = function (cb) {
  console.log('running ', __filename);
  console.log('  - main test');
  require('../support/run')(__dirname, { title: 'test escaped characters' }, cb);
};

if (!module.parent) go(function () {
  console.log('done');  
});
