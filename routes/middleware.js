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
	res.locals.baseUrl = keystone.get('baseUrl');
	res.locals.twitterSite = keystone.get('twitterSite');

	res.locals.navLinks = [
		// { label: 'Home', key: 'home', href: '/' },
		{ label: 'Universities', key: 'universities', href: '/universities/' },
		{ label: 'Blog', key: 'blog', href: '/blog/' },
		{ label: 'Where to study', key: 'studyin', href: '/study-in/' },
		{
			label: 'Why Tests', key: 'Language and Admission Tests explained', pages: [
				{ label: 'GMAT', subkey: 'gmat', href: "/test/gmat/" },
				{ label: 'GRE', subkey: 'gre', href: "/test/gre/" },
				{ label: 'IELTS', subkey: 'ielts', href: "/test/ielts/" },
				{ label: 'SAT', subkey: 'sat', href: "/test/sat/" },
				{ label: 'TOEFL', subkey: 'toefl', href: "/test/toefl/" },
			]
		},
		{ label: 'Courses', key: 'Courses', href: '/courses/' },
		{ label: 'Contact', key: 'contact', href: '/contact/' },

	];
	res.locals.user = req.user;
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
