'use strict';
/*jshint asi: true */

var test = require('tape')
var bromote = require('../..')

test('\ntest jsonp script loading', function (t) {
  t.plan(3);

  bromote.jsonpTest(function () {
    t.ok(true, 'callback called');
  });
})
