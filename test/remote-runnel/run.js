'use strict';
/*jshint asi: true */

var fs     =  require('fs')
  , path   =  require('path')
  , opener =  require('opener')
  , build  =  require('./build')
  , bundle =  path.join(__dirname, 'bundle.js')
  , index  =  path.join(__dirname, 'index.html')

build(true, function (err, bundled) {
  if (err) return console.error(err);

  fs.writeFileSync(bundle, bundled, 'utf8');
  fs.writeFileSync(index, '<script src="bundle.js"></script>', 'utf8');
  opener(index)
});
