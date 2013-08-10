# bromote

Tool to setup and require remote scripts with browserify.

### Server Side

```js
var browserify  =  require('browserify');
var bromote     =  require('bromote');
var PassThrough =  require('stream').PassThrough;

var remote =
  { jquery:
    { exports: '$',
      url: 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js' },
    backbone:
    { deps: { jquery: '$', underscore: '_' },
      exports: 'Backbone',
      url: 'http://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min.js' },
    underscore: 
      { exports: '_',
        url: 'http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min.js' } };

var passThrough = new PassThrough();
var bify = browserify();

bromote(bify, remote, function (err) {
  if (err) return console.error(err);
  
  bify
    .require('./main.js', { entry: true })
    .bundle()
    .pipe(passThrough);
});
return passThrough;
```

### Client Side

```js
var bromote = require('bromote');

bromote.backbone(function (backbone) {
  console.log(backbone.$().jquery); // =>  '1.7.1'
});

bromote.jquery(function ($) {
  console.log($().jquery); // =>  '1.7.1'
})
```

Example derived from [this test](https://github.com/thlorenz/bromote/tree/master/test/remote-backbone-jquery-underscore)

For more examples see [examples](https://github.com/thlorenz/bromote/tree/master/examples) and [tests](https://github.com/thlorenz/bromote/tree/master/test).

## JSONP support 

Providing a url causes bromote to generate a JSONP callback function and wait for it to be invoked instead of calling
back when the script is loaded.

```js
var remote = 
  { jsonpfn: { 
        exports: 'jsonpfn'
      , url: 'http://url/to/jsonp-provider?callback=?' 
    }
  };
```

## Disclaimer

Since you are already using browserify and thus can pull in modules via npm in a version controlled manner, **you better
have a damn good reason to load scripts from a url**.

You loose versioning and are opening your app up to lots of unknowns. **Bad things will happen!**

If any of the scripts pulled in via a url has a bug, it could potentially crash your app. Since you are loading it
dynamically, you have no control over when that happens, i.e. the script could change months after you deployed
your app.

So in general **please don't do this**.

However if you pull in a very large and trusted library like jquery and want to do this via a cdn which hosts specific
versions of it, it may be advisable to do so via a script tab or bromote

## Why bromote then?

I created bromote to allow people to still use browserify, even if they find themselves in a situation where they are
forced to load scripts from urls for whatever reason that is out of their control.

## Installation

    npm install bromote

## Features

- load dependencies from any url
- you may use bromote to load external browserify bundles **on demand**
- bromote properly resolves and loads nested dependencies in correct order (see example)

## API

### Server side: ***bromote(bify, remote, cb)***
```
/**
 * Generates all remote loaders and adds them to browserify instance if it is given.
 * Calls back with paths to generated loaders.
 *
 * @name exports
 * @function
 * @param bify {Object} browserify instance (optional) but recommended
 * @param remote {Object} hashtable containing information about remote scripts for which to generate and add loaders
 * @param cb {Function} called back with paths to generated loaders
 */
```

### Client side: ***bromote.foo(function (foo) { ... })***

Assuming that `foo` was included as a remote server side, this will resolve it from the remote url and call back with
its export once it is loaded.

## License

MIT
