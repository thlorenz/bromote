console.log('loading main');

var bromote = require('bromote');

bromote.jquery(function ($) {
  console.log('jquery version: ', $().jquery);  
});

bromote.backbone(function (backbone) {
  console.log('backbone', backbone);  
});
