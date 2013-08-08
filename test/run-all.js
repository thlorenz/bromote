'use strict';

require('runnel')(
    require('./remote-backbone-jquery-local-underscore-requirejs/run')
  , require('./escaped_characters/run')
  , require('./remote-backbone-jquery-local-underscore/run')
  , require('./remote-backbone-jquery-underscore/run')
  , require('./remote-runnel/run')
  , require('./remote-runnel-manual-add-to-browserify/run')
  , function done (err) {
     console.log('please check test output in all browser tabs');
    }
);

