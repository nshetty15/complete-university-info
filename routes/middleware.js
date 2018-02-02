var keystone = require('keystone');
/**
 * This file contains the common middleware used by your routes.
 *
 * Extend or replace these functions as your application requires.
 *
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */
var _ = require('lodash');


/**
	Initialises the standard view locals

	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
*/
exports.initLocals = function (req, res, next) {
	// https://nodevision.com.au/blog/post/tutorial-blogging-with-nodejs-and-keystone-cms
	res.locals.baseUrl = keystone.get('base url');
	res.locals.title = keystone.get('title name');
	res.locals.brandSafe = keystone.get('brand safe');
	res.locals.description = keystone.get('description client');
	res.locals.keywords = keystone.get('keywords client');
	res.locals.gaProperty = keystone.get('ga property client');
	res.locals.twitterSite = keystone.get('twitter');

	res.locals.navLinks = [
		// { label: 'Home', key: 'home', href: '/' },
		{ label: 'Universities', key: 'universities', title:'Find universities', href: '/universities/' },
		{ label: 'Blog', key: 'blog', title:'Blog posts', href: '/blog/' },
		{ label: 'Study In', key: 'studyin', title:'Study abroad destinations', href: '/study-abroad/' },
		{
			label: 'Tests', key: 'tests', title:'Language and Academic tests', pages: [
				{ label: 'IELTS', subkey: 'ielts', title:'What is the IELTS?', href: "/tests/ielts/" },
				{ label: 'TOEFL', subkey: 'toefl', title:'What is the TOEFL?', href: "/tests/toefl/" },
				{ label: 'PTE', subkey: 'pte', title:'What is the PTE test?', href: "/tests/pte/" },
				{ label: 'GMAT', subkey: 'gmat', title:'What is the GMAT?', href: "/tests/gmat/" },
				{ label: 'GRE', subkey: 'gre', title:'What is the GRE?', href: "/tests/gre/" },
				// { label: 'SAT', subkey: 'sat', href: "/tests/sat/" },
			]
		},
		// { label: 'Courses', key: 'Courses', href: '/courses/' },
		{ label: 'Contact', key: 'contact', title:'Contact us', href: '/contact/' },

	];
	res.locals.user = req.user;
	next();
};

/****
 * Error handlers
 */
exports.initErrorHandlers = function (req, res, next) {
	
		res.err = function (err, title, message) {
			res.status(500).render('errors/500', {
				layout: false,
				err: err,
				errorTitle: title,
				errorMsg: message,
			});
		};
	
		res.notFound = function (title, message) {
			res.status(404).render('errors/404', {
				layout: false,
				errorTitle: title,
				errorMsg: message,
			});
		};
	
		next();
	
	};

/**
	Fetches and clears the flashMessages before a view is rendered
*/
exports.flashMessages = function (req, res, next) {
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error'),
	};
	res.locals.messages = _.some(flashMessages, function (msgs) { return msgs.length; }) ? flashMessages : false;
	next();
};


/**
	Prevents people from accessing protected pages when they're not signed in
 */
exports.requireUser = function (req, res, next) {
	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}
};
