import '../styles/site.css';

import 'bootstrap'; // bootstrap js


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

// Program search

var collapsed = true;
$('#searchProgram').on('keyup', function () {
	var value = $(this).val();
	var $heading;
	// Expand when start typing
	if (collapsed && value.length) {
		$("#subjects ul").css('display', 'block');
		$("#subjects h3, #subjects h4, #subjects h5").removeClass('to-expand').addClass('to-collapse');
		collapsed = false;
		// $("#subjects h3, #subjects h4, #subjects h5").trigger("click");
	}
	// hide when empty
	if (!collapsed && !value.length) {
		collapsed = true;
		// $("#subjects h3, #subjects h4, #subjects h5").trigger("click");
	}

	$('#subjects li').hide().each(function () {
		var $this = $(this);
		if ($this.text().toLowerCase().search(value) > -1) {
			$this.show();
		} else {
			$this.hide();
		}
	});
});

// hide UL's & add class to each UL
// $("#subjects ul").css('display','none');

$("#subjects h3, #subjects h4, #subjects h5").each(function (index, item) {
	var $ul = $(this).next('ul').length,
		$this = $(this);
	if ($ul) {
		$(this).next('ul').css('display', 'none');
		$this.addClass('to-expand');
	}
});

// expand collapse
$("#subjects h3, #subjects h4, #subjects h5").click(function () {
	var $ul = $(this).next('ul'),
		$this = $(this);
	if ($ul) {

		$ul.slideToggle(200, function () {
			if ($this.hasClass('to-expand')) {
				$this.removeClass('to-expand').addClass('to-collapse');
			} else {
				$this.removeClass('to-collapse').addClass('to-expand');
			}
		});
	}
});

/****Accept Cookie policy */
// remove if available
if (typeof (Storage) !== "undefined") {
	if (localStorage.getItem("cookie") !== null) {
		$("#privacyAcpt").remove();
	}
}
// on accept
$("#btnConsent").click(function (e) {
	e.preventDefault();
	if (typeof (Storage) !== "undefined") {
		localStorage.setItem("cookie", "true");
	}
	$("#privacyAcpt").fadeOut();
});


/*! loadCSS. [c]2017 Filament Group, Inc. MIT License */
/* This file is meant as a standalone workflow for
- testing support for link[rel=preload]
- enabling async CSS loading in browsers that do not support rel=preload
- applying rel preload css once loaded, whether supported or not.
*/
(function (w) {
	"use strict";
	// rel=preload support test
	if (!w.loadCSS) {
		w.loadCSS = function () { };
	}
	// define on the loadCSS obj
	var rp = loadCSS.relpreload = {};
	// rel=preload feature support test
	// runs once and returns a function for compat purposes
	rp.support = (function () {
		var ret;
		try {
			ret = w.document.createElement("link").relList.supports("preload");
		} catch (e) {
			ret = false;
		}
		return function () {
			return ret;
		};
	})();

	// if preload isn't supported, get an asynchronous load by using a non-matching media attribute
	// then change that media back to its intended value on load
	rp.bindMediaToggle = function (link) {
		// remember existing media attr for ultimate state, or default to 'all'
		var finalMedia = link.media || "all";

		function enableStylesheet() {
			link.media = finalMedia;
		}

		// bind load handlers to enable media
		if (link.addEventListener) {
			link.addEventListener("load", enableStylesheet);
		} else if (link.attachEvent) {
			link.attachEvent("onload", enableStylesheet);
		}

		// Set rel and non-applicable media type to start an async request
		// note: timeout allows this to happen async to let rendering continue in IE
		setTimeout(function () {
			link.rel = "stylesheet";
			link.media = "only x";
		});
		// also enable media after 3 seconds,
		// which will catch very old browsers (android 2.x, old firefox) that don't support onload on link
		setTimeout(enableStylesheet, 3000);
	};

	// loop through link elements in DOM
	rp.poly = function () {
		// double check this to prevent external calls from running
		if (rp.support()) {
			return;
		}
		var links = w.document.getElementsByTagName("link");
		for (var i = 0; i < links.length; i++) {
			var link = links[i];
			// qualify links to those with rel=preload and as=style attrs
			if (link.rel === "preload" && link.getAttribute("as") === "style" && !link.getAttribute("data-loadcss")) {
				// prevent rerunning on link
				link.setAttribute("data-loadcss", true);
				// bind listeners to toggle media back
				rp.bindMediaToggle(link);
			}
		}
	};

	// if unsupported, run the polyfill
	if (!rp.support()) {
		// run once at least
		rp.poly();

		// rerun poly on an interval until onload
		var run = w.setInterval(rp.poly, 500);
		if (w.addEventListener) {
			w.addEventListener("load", function () {
				rp.poly();
				w.clearInterval(run);
			});
		} else if (w.attachEvent) {
			w.attachEvent("onload", function () {
				rp.poly();
				w.clearInterval(run);
			});
		}
	}


	// commonjs
	if (typeof exports !== "undefined") {
		exports.loadCSS = loadCSS;
	}
	else {
		w.loadCSS = loadCSS;
	}
}(typeof global !== "undefined" ? global : this));

/********* Show/hide social share************/
var like = true;
$(document).scroll(function () {
	var y = $(this).scrollTop();
	if (y > 600) {
		$('#socialShare').fadeIn();
		if (like) {
			like = false;
			fbLike(document, 'script', 'facebook-jssdk');
		}
	} else {
		$('#socialShare').fadeOut();
	}
});

/***** FB lIke widget ***** */
function fbLike(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.12&appId=1950322238562764&autoLogAppEvents=1';
	fjs.parentNode.insertBefore(js, fjs);
}

// register the service worker if available
if ('serviceWorker' in navigator) {

	navigator.serviceWorker.register('/sw.js').then(function (reg) {
		//console.log('Successfully registered service worker', reg);
	}).catch(function (err) {
		//console.warn('Error whilst registering service worker', err);
	});

	// unregister service worker
	// if(window.navigator && navigator.serviceWorker) {
	//   navigator.serviceWorker.getRegistrations()
	//   .then(function(registrations) {
	//     for(let registration of registrations) {
	//       registration.unregister();
	//     }
	//   });
	// }

}
