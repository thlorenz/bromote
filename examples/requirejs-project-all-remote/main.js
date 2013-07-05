var bromote = require('bromote');

bromote.backbone(function (backbone) {
  console.log('backbone version', backbone.VERSION);  
  console.log('backbone uses jquery version', backbone.$().jquery);  
  console.log('since backbone intialized properly, this means that underscore was added to window in time');
  console.log('window._.VERSION', window._.VERSION);

  bromote.jquery(function ($) {
    console.log('loading jquery again just pulls it from the bromote cache instead of making another request');
    console.log('check your Network tab to confirm ;), also ... ');
    console.log('$ === backbone.$ => ', $ === backbone.$);
  });
});
