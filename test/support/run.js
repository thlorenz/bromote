'use strict';
/*jshint asi: true */

var fs     =  require('fs')
  , path   =  require('path')
  , opener =  require('opener')

function html(bundle, title) {
  return [
    '<!DOCTYPE html>'
    , '<html>'
    , '<head>'
    , '<script src="' + bundle + '"></script>'
    , '  <title>' + title + '</title>'
    , '</head>'
    , '<body>'
    , ' <h3>' + title + '</h3>'
    , '</body>'
    , '</html>'
    ].join('\n');
}

module.exports = function (root, opts, cb) {

  opts = opts || {}
  cb = cb || function () {}

  var bundle =  path.join(root, opts.bundle || 'bundle.js')
    , index  =  path.join(root, opts.html   || 'index.html')
    , title  =  opts.title || opts.html     || 'bromote test'
    , build  =  opts.build || require(path.join(root, 'build'))
    ;

  build(true)
    .on('error', console.error)
    .on('end', function () {
      fs.writeFileSync(index, html(opts.bundle || 'bundle.js', title), 'utf8');

      // passing cb directly to opener doesn't work for whatever reason
      opener(index, function (err) {
        if (err) console.error(err);
        cb();
      });
    })
    .pipe(fs.createWriteStream(bundle, 'utf8'));
};
