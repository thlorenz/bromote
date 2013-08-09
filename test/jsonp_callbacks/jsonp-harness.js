(function(){
  'use strict';

  var scripts = document.getElementsByTagName('script');
  var script_url = scripts[0].src;

  var qs = {};
  script_url.split('?').slice(1)[0].split('&').map(function(qp){
    var s = qp.split('=').map(decodeURI);
    qs[s[0]] = s[1];
  });

  if(qs.callback){
    window[qs.callback].call(qs.callback);
  }
})();