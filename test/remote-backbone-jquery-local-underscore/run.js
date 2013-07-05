'use strict';

var run = require('../support/run');
var build = require('./build');
var path = require('path');

function test(file, cb) {
  console.error('resolving: ', file);
  
  var p = require.resolve('./' + file);
  run(
      __dirname
    , { build  :  build.bind(null, p)
      , html   :  path.basename(file) + '.html'
      , bundle :  path.basename(file) + '.bundle.js'
      , title  :  file.replace(/-/g, ' ')
      }
    , cb
  );
}

test('test-backbone-and-jquery-and-underscore-in-parallel');

/*test('test-backbone-then-jquery-and-underscore', function () {
  test('test-backbone-then-jquery-then-underscore', function () {
    test('test-backbone-and-jquery-and-underscore-in-parallel');
  });
});*/
