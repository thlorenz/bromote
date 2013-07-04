'use strict';

console.log('loaded main');

require('bromote').runnel(function (runnel) {
  runnel(
    function (cb) {
      setTimeout(cb.bind(null, null, 1), 500);
    }
  , function (one, cb) {
      setTimeout(cb.bind(null, null, one + 1), 500);
    }
  , function (err, two) {
      if (err) return console.error(err);
      console.log('The result is ', two);  
  });
});
