'use strict';
/*jshint asi: true */

var test = require('tape')
var bromote = require('../..')

test('\nremote runnel remotes manually added to browserify', function (t) {
  t.plan(1)

  bromote.runnel(function (runnel) {
    t.equal(typeof runnel, 'function', 'pulls runnel from remote url')    
  });
})
