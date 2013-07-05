'use strict';
/*jshint asi: true */

var fs     =  require('fs')
  , path   =  require('path')
  , opener =  require('opener')

module.exports = function (root) {

  var bundle =  path.join(root, 'bundle.js')
    , index  =  path.join(root, 'index.html')
    , build  =  require(path.join(root, 'build'))

  build(true)
    .on('error', console.error)
    .on('end', function () {
      fs.writeFileSync(index, '<script src="bundle.js"></script>', 'utf8');
      opener(index)
    })
    .pipe(fs.createWriteStream(bundle, 'utf8'));
};
