'use strict';
/*jshint asi: true */

var fs     =  require('fs')
  , path   =  require('path')
  , opener =  require('opener')

module.exports = function (root, build) {

  var bundle =  path.join(root, 'bundle.js')
    , index  =  path.join(root, 'index.html')

  build(true, function (err, bundled) {
    if (err) return console.error(err);

    fs.writeFileSync(bundle, bundled, 'utf8');
    fs.writeFileSync(index, '<script src="bundle.js"></script>', 'utf8');
    opener(index)
  });
};
