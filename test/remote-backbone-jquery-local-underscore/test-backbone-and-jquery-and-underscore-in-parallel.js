'use strict';
/*jshint asi: true */

var test = require('tape')
var bromote = require('../..')

test('\nremote backbone, and jquery and local underscore in parallel', function (t) {
  t.plan(4)
  var $, backbone;

  bromote.jquery(function ($_) {
    $ = $_;
    if (backbone) t.equal(backbone.$, $, 'backbone $ is same as $ we get when we bromote jquery')
    t.equal($().jquery, '1.7.1', 'pulls jquery from remote url')
  })

  bromote.backbone(function (backbone_) {
    backbone = backbone_;
    t.equal(typeof backbone, 'object', 'pulls backbone from remote url')    
    if ($) t.equal(backbone.$, $, 'backbone $ is same as $ we get when we bromote jquery')
  });

  var _ = require('underscore');
  t.equal(typeof _, 'function', 'pulls underscore from local location')
})
