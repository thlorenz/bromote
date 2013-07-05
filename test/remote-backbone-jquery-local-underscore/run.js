'use strict';

var run = require('../support/run');
var build = require('./build');
var path = require('path');
var runnel = require('runnel');

function test(file, cb) {
  var p = require.resolve('./' + file);
  var title = 'jquery and backbone remote ' + file.replace(/-/g, ' ');
  console.log('  - ', title);
  run(
      __dirname
    , { build  :  build.bind(null, p)
      , html   :  path.basename(file) + '.html'
      , bundle :  path.basename(file) + '.bundle.js'
      , title  :  title 
      }
    , cb
  );
}

var go = module.exports = function (cb) {
  console.log('running ', __filename);

  runnel(
      test.bind(null, 'test-backbone-then-jquery-and-underscore')
    , test.bind(null, 'test-backbone-then-jquery-then-underscore')
    , test.bind(null, 'test-backbone-and-jquery-and-underscore-in-parallel')
    , cb
  );
};

if (!module.parent) go(function () {
  console.log('done');  
});
