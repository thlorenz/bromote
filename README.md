# bromote

Tool to setup and require remote scripts with browserify.

```js
var config = { 
  remote:
   { jquery:
      { exports: '$',
        url: 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js' },
     backbone:
      { deps: { jquery: '$', underscore: '_' },
        exports: 'Backbone',
        url: 'http://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min.js' },
     underscore: 
       { exports: '_',
         url: 'http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min.js' } }
};
```

**build:**

```js
var passThrough = new PassThrough();

var bify = browserify();
bromote(bify, config.remote, function (err, gens) {
  if (err) return console.error(err);
  
  bify
    .add(entry, { entry: true })
    .bundle({ debug: debug })
    .pipe(passThrough);
});
return passThrough;
```

**client side:**

```js
bromote.backbone(function (backbone) {
  console.log(backbone.$().jquery); // =>  '1.7.1'
});

bromote.jquery(function ($) {
  console.log($().jquery); // =>  '1.7.1'
})
```

Example derived from [this test](https://github.com/thlorenz/bromote/tree/master/test/remote-backbone-jquery-underscore)

For more examples see [examples](https://github.com/thlorenz/bromote/tree/master/examples) and [tests](https://github.com/thlorenz/bromote/tree/master/test).

## Disclaimer

Since you are already using browserify and thus can pull in modules via npm in a version controlled manner, **you better
have a damn good reason to load scripts from a url**.

You loose versioning and are opening your app up to lots of unknowns. **Bad things will happen!**

If any of the scripts pulled in via a url has a bug, it could potentially crash your app. Since you are loading it
dynamically, you have no control over when that could happen, i.e. it the script could change months after you deployed
your app.

So in general **please don't do this**.

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

### Server side ***bromote(bify, remote, cb)***
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

### Client side ***bromote.foo(function (foo) { ... })***

Assuming that `foo` was included as a remote server side, this will resolve it from the remote url and call back with
its export once it is loaded.

## License

MIT
