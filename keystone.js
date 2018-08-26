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
	'name': 'Info', // do not change-mongodb connection fails
	'brand': 'Info',
	'brand safe': 'cui', //take out when not needed

	'title name': process.env.CLIENT_TITLE,
	'description client': process.env.CLIENT_DESCRIPTION,
	'keywords client': process.env.CLIENT_KEYWORDS,
	'env': process.env.NODE_ENV,
	'base url': process.env.NODE_ENV === 'production' ? 'https://www.completeuniversityinfo.com' : 'http://localhost:3000',

	'sass': 'public',
	'static': 'public',
	'favicon': 'public/images/favicon/icon.ico',
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

	//added later
	'file limit': '50MB', // increase data upload via api to 50mb from 100kb

	'cors allow origin': true, //
	'cloudinary config': { secure: true }, //startum-cms || -keystone.set('cloudinary secure', true);

	'wysiwyg override toolbar': false,
	'wysiwyg additional buttons': 'formatselect, removeformat ',

	'ga property client': process.env.GA_PROPERTY_FRONT,
	'twitter': process.env.TWITTER_ACCOUNT,
	'cloudinary account': process.env.CLOUDINARY_ACCOUNT,
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
	universities: ['universities', 'regions', 'university-countries', 'university-states', 'university-cities'],
	posts: ['posts', 'post-categories'],
	levels: ['levels', 'disciplines', 'programs', 'courses', 'qualifications', 'specializations', 'careers'], // 'scholarships'
	studyDestination: "study-destinations",
	tests: 'tests',
	enquiries: 'enquiries',
	users: 'users',
});

// 301 redirection - https://github.com/keystonejs/keystone/issues/303
keystone.redirect({
	'/universities/europe/germany/lower-saxony/hannover/leibniz-university-of-hanover/': '/universities/europe/germany/lower-saxony/hannover/leibniz-university-of-hannover/',
	'/universities/north-america/united-states/south-dakota/aberdeen/northern-state-university/': '/universities/north-america/united-states/south-dakota/aberdeen-us/northern-state-university/',
	'/universities/north-america/united-states/south-dakota/aberdeen/presentation-college/': '/universities/north-america/united-states/south-dakota/aberdeen-us/presentation-college/',
	'/universities/north-america/united-states/alabama/birmingham/birmingham-southern-college/': '/universities/north-america/united-states/alabama/birmingham-us/birmingham-southern-college/',
	'/universities/north-america/united-states/alabama/birmingham/university-of-alabama-at-birmingham/': '/universities/north-america/united-states/alabama/birmingham-us/university-of-alabama-at-birmingham/',
	'/universities/north-america/united-states/alabama/birmingham/southeastern-bible-college/': '/universities/north-america/united-states/alabama/birmingham-us/southeastern-bible-college/',
	'/universities/north-america/united-states/alabama/birmingham/samford-university/': '/universities/north-america/united-states/alabama/birmingham-us/samford-university/',
	'/universities/north-america/united-states/rhode-island/bristol/roger-williams-university/': '/universities/north-america/united-states/rhode-island/bristol-us/roger-williams-university/',
	'/universities/north-america/united-states/tennessee/bristol/king-university/': '/universities/north-america/united-states/tennessee/bristol-us/king-university/',
	'/universities/north-america/united-states/massachusetts/cambridge/massachusetts-institute-of-technology/': '/universities/north-america/united-states/massachusetts/cambridge-us/massachusetts-institute-of-technology/',
	'/universities/north-america/united-states/massachusetts/cambridge/cambridge-college/': '/universities/north-america/united-states/massachusetts/cambridge-us/cambridge-college/',
	'/universities/north-america/united-states/massachusetts/cambridge/hult-international-business-school/': '/universities/north-america/united-states/massachusetts/cambridge-us/hult-international-business-school/',
	'/universities/north-america/united-states/massachusetts/cambridge/harvard-university/': '/universities/north-america/united-states/massachusetts/cambridge-us/harvard-university/',
	'/universities/north-america/united-states/massachusetts/cambridge/lesley-university/': '/universities/north-america/united-states/massachusetts/cambridge-us/lesley-university/',
	'/universities/oceania/new-zealand/waikato/hamilton/university-of-waikato/': '/universities/oceania/new-zealand/waikato/hamilton-nz/university-of-waikato/',
	'/universities/north-america/united-states/new-york/hamilton/colgate-university/': '/universities/north-america/united-states/new-york/hamilton-us/colgate-university/',
	'/universities/north-america/canada/ontario/london/western-university/': '/universities/north-america/canada/ontario/london-ca/western-university/',
	'/universities/north-america/united-states/ohio/oxford/miami-university/': '/universities/north-america/united-states/ohio/oxford-us/miami-university/',
	'/universities/north-america/united-states/new-york/potsdam/clarkson-university/': '/universities/north-america/united-states/new-york/potsdam-us/clarkson-university/',
	'/universities/north-america/united-states/new-york/potsdam/state-university-of-new-york-at-potsdam/': '/universities/north-america/united-states/new-york/potsdam-us/state-university-of-new-york-at-potsdam/',
	'/universities/europe/united-kingdom/london/richmond/richmond-the-american-international-university-in-london/': '/universities/europe/united-kingdom/london/richmond-gb/richmond-the-american-international-university-in-london/',
	'/universities/north-america/canada/nova-scotia/sydney/cape-breton-university/': '/universities/north-america/canada/nova-scotia/sydney-ca/cape-breton-university/',
});

// Start Keystone to connect to your database and initialise the web server
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
