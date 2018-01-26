import 'bootstrap';
import '../styles/site.css';

var $ = require('jquery');
var LazyLoad = require('vanilla-lazyload');

// Lazy load images 
var myLazyLoad = new LazyLoad({
  elements_selector: ".img-lazy"
});

// show share
$(window).scroll(function () {
  var scrollPos = $(this).scrollTop();
  scrollPos > 500 ? $('#socialShare').fadeIn() : $('#socialShare').fadeOut();
});

// register the service worker if available
// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('/sw.js').then(function (reg) {
//     //console.log('Successfully registered service worker', reg);
//   }).catch(function (err) {
//     //console.warn('Error whilst registering service worker', err);
//   });
// }
