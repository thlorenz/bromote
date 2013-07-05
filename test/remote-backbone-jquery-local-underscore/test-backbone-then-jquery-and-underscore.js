'use strict';
/*jshint asi: true */

var test = require('tape')
var bromote = require('../..')

test('\nremote backbone, then jquery and local underscore', function (t) {
  t.plan(3)

  bromote.backbone(function (backbone) {
    t.equal(typeof backbone, 'object', 'pulls backbone from remote url')    
    bromote.jquery(function ($) {
      t.equal(backbone.$, $, 'backbone $ is same as $ we get when we bromote jquery')
    })
    var _ = require('underscore');
    t.equal(typeof _, 'function', 'pulls underscore from local location')
  });
})
