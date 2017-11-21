// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Require keystone
var keystone = require('keystone');
var handlebars = require('express-handlebars');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({
	'name': 'Info',
	'brand': 'Info',

	'sass': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': '.hbs',

	'custom engine': handlebars.create({
		layoutsDir: 'templates/views/layouts',
		partialsDir: 'templates/views/partials',
		defaultLayout: 'default',
		helpers: new require('./templates/views/helpers')(),
		extname: '.hbs',
	}).engine,

	'emails': 'templates/emails',

	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',

	'file limit': '50MB', // increase data upload via api to 50mb from 100kb

	// 'wysiwyg override toolbar': false,
	// 'wysiwyg menubar': true,
	// 'wysiwyg skin': 'lightgray',
	// 'wysiwyg additional buttons': 'searchreplace visualchars,'
	//  + ' charmap ltr rtl pagebreak paste, forecolor backcolor,'
	//  +' emoticons media, preview print ',
	// 'wysiwyg additional plugins': 'example, table, advlist, anchor,'
	//  + ' autolink, autosave, bbcode, charmap, contextmenu, '
	//  + ' directionality, emoticons, fullpage, hr, media, pagebreak,'
	//  + ' paste, preview, print, searchreplace, textcolor,'
	//  + ' visualblocks, visualchars, wordcount',
});

// Load your project's Models
keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});

// Load your project's Routes
keystone.set('routes', require('./routes'));


// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
	universities: ['universities', 'university-cities', 'university-states', 'university-countries'],
	posts: ['posts', 'post-categories'],
	levels: ['levels', 'disciplines', 'programs', 'specializations', 'careers'],
	tests: 'tests',
	enquiries: 'enquiries',
	users: 'users',
});

// Start Keystone to connect to your database and initialise the web server

// https://nodevision.com.au/blog/post/tutorial-blogging-with-nodejs-and-keystone-cms
keystone.set('baseUrl', (keystone.get('env') == 'production') ? 'https://www.completeuniversityinfo.com' : 'http://localhost:3000');
keystone.set('title', 'Complete University Info');
keystone.set('description', 'Made by the students for the students.');
keystone.set('keywords', 'study abroad, study, universities');
keystone.set('twitterSite', '@completeuniversityinfo');

if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
	console.log('----------------------------------------'
	+ '\nWARNING: MISSING MAILGUN CREDENTIALS'
	+ '\n----------------------------------------'
	+ '\nYou have opted into email sending but have not provided'
	+ '\nmailgun credentials. Attempts to send will fail.'
	+ '\n\nCreate a mailgun account and add the credentials to the .env file to'
	+ '\nset up your mailgun integration');
}


keystone.start();
