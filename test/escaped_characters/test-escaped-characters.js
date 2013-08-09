'use strict';
/*jshint asi: true */

var test = require('tape')
var bromote = require('../..')

test('\ntest google maps loading', function (t) {
  t.plan(3);
  var failed = false;

  window.alert = function(){
    failed = true;
  };

  bromote.google_maps(function (google) {
    t.equal(failed, false, 'successfully loaded google maps');
  });
})
