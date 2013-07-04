# bromote

Tool to setup and require remote scripts with browserify.

```js
// TODO
```

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

## Status

Alpha -- released `0.0.1`, so if you like to be on the edge, go ahead.

## Installation

    npm install bromote

## API

TODO

## License

MIT
