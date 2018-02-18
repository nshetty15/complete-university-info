import 'bootstrap';
import '../styles/site.css';

var $ = require('jquery');
var LazyLoad = require('vanilla-lazyload');
var FontFaceObserver = require('fontfaceobserver');

// Lazy load images 
var myLazyLoad = new LazyLoad({
  elements_selector: ".img-lazy"
});

// lazy load fonts
var font = new FontFaceObserver('FontAwesome');

font.load().then(function () {
  $("body").addClass("fonts");
});

// register the service worker if available
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(function (reg) {
    //console.log('Successfully registered service worker', reg);
  }).catch(function (err) {
    //console.warn('Error whilst registering service worker', err);
  });
}
