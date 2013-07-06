'use strict';

var path   =  require('path');
var fs     =  require('fs');
var runnel =  require('runnel');

var loadersDir = path.join(__dirname, '..', 'loaders');

var cleanLoaders = module.exports = function (cb) {

  // we'll only ever put files in there, so we don't need to filter and save a call to fs.stat
  fs.readdir(loadersDir, function (err, files) {
    if (err) return cb(err);  

    var tasks = files
      .filter(function (file) { return file !== '.gitignore' && file !== '.npmignore'; })
      .map(function (file) {
        return function rm (cb_) {
          fs.unlink(path.join(loadersDir, file), cb_);
        };
      });

    if (!tasks.length) return cb();

    runnel(tasks.concat(cb));
  });
};
