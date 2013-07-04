# remote-runnel

## Disclaimer

runnel is published on npm and commonjs compatible.

Therefore you should just `npm install runnel` and the `require` it on the client side. Remember, you are using
browserify and thus have access to all client side modules that are on npm.

The added advantage is that you can control the version of runnel that you are getting.


This example just uses runnel in order to load a remote script asynchronously for demonstration purposes.

However as outlined in the [main readme](https://github.com/thlorenz/bromote/blob/master/README.md#disclaimer), you should avoid
loading scripts from a url if possible.
