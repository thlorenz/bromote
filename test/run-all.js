'use strict';

require('runnel')(
    require('./remote-backbone-jquery-local-underscore-requirejs/run')
  , require('./remote-backbone-jquery-local-underscore/run')
  , require('./remote-backbone-jquery-underscore/run')
  , require('./remote-runnel/run')
  , function done (err) {
     console.log('please check test output in all browser tabs');
    }
);

