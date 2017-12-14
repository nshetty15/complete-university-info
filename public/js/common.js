var $ = require('jquery');
// var bootstrap = require('bootstrap'); 



console.log("hello");
$("h1").append("hello");












// register the service worker if available
/* 
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(function(reg) {
      console.log('Successfully registered service worker', reg);
  }).catch(function(err) {
      console.warn('Error whilst registering service worker', err);
  });
}

window.addEventListener('online', function(e) {
  console.log("You are online");
}, false);

window.addEventListener('offline', function(e) {
  console.log("You are offline");
}, false);
*/