console.log('loading main');

var bromote = require('bromote');

bromote.backbone(function (backbone) {
  console.log('backbone version', backbone.VERSION);  
  console.log('backbone uses jquery version', backbone.$().jquery);  
  console.log('since backbone intialized properly, this means that underscore was added to window in time');
  console.log('window._.VERSION', window._.VERSION);
});
