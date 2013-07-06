'use strict';

var handlebars =  require('handlebars');
var path       =  require('path');
var fs         =  require('fs');
var xtend      =  require('xtend');

var templatePath =  path.join(__dirname, 'index.hbs');
var template     =  fs.readFileSync(templatePath, 'utf8');
var index        =  handlebars.compile(template);
var genPath      =  path.join(__dirname, '..', 'loaders');

/**
 *  Generates an index for all the loader files to allow requiring them like this on the client side:
 *    require('bromote').foo(function (foo) { ... }
 * @name genIndex
 * @function
 * @param fullPaths {Array} of full paths to the loader files
 * @param cb {Function} calls back with error or none and same fullPaths that were passed in
 */
var genIndex = module.exports = function (fullPaths, cb) {
  if (!fullPaths.length) cb(null);

  var keys = fullPaths.map(function (p) {
    var extlen = path.extname(p).length;
    var filename = path.basename(p);
    return extlen ? filename.slice(0, -extlen) : filename;
  });

  var s = index({ keys: keys });

  var filePath = path.join(genPath, 'index.js');
  fs.writeFile(filePath, s, 'utf8',  function (err) {
    cb(err, fullPaths); 
  });
};
