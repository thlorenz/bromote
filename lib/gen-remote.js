'use strict';

var handlebars =  require('handlebars');
var path       =  require('path');
var fs         =  require('fs');
var xtend      =  require('xtend');

var templatePath =  path.join(__dirname, 'remote.hbs');
var template     =  fs.readFileSync(templatePath, 'utf8');
var remote       =  handlebars.compile(template);
var genPath      =  path.join(__dirname, '..', 'loaders');

function mapDeps(config) {
  if (!config.deps) return config;

  return xtend(config, {
    deps: Object.keys(config.deps).map(function (k) {
      return { key: k, global: config.deps[k] };
    }),
  });
}

/**
 * Generates file that fetch the remote script asynchronously and call back with the object it exports.
 *
 * @name genRemote
 * @function
 * @param {Object} config  {
 *    key     :  {String}   module name,
 *    deps    :  {[Object]} [ { depname :  'name under which to attach the dependency to global scope' }, ],
 *    exports :  {String}   name under which it is attached to the global scope,
 *    init    :  {Function} to to initialize the module
 *  }
 * @param {Function} cb called back with error or path of generated file
 */
var genRemote = module.exports = function (config, cb) {
  var name = config.key;
  var opts = mapDeps(config);
  opts.exportRemotePath = require.resolve('./export-remote');

  var s = remote(opts);
  var filePath = path.join(genPath, name + '.js');
  fs.writeFile(filePath, s, 'utf8', function (err) {
    if (err) return cb(err);
    cb(null, filePath);
  });
};

