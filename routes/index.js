/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var _ = require('underscore');
var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);
var sslRedirect = require('heroku-ssl-redirect');



// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('routes', middleware.initErrorHandlers);
keystone.pre('render', middleware.flashMessages);

// Handle 404 errors
keystone.set('404', function (req, res, next) {
	res.notFound();
});

// Handle other errors
keystone.set('500', function (err, req, res, next) {
	var title;
	var message;

	if (err instanceof Error) {
		message = err.message;
		err = err.stack;
	}
	res.err(err, title, message);
});

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
	api: importRoutes('./api')
};

// Setup Route Bindings
exports = module.exports = function (app) {

	// enable heroku ssl redirect - to use https
	app.use(sslRedirect());
	
	// console.log(routes.views.index)
	// Views
	app.get('/', routes.views.index);

	app.get('/universities/', routes.views.universities);

	// console.log("univeristy");
	app.get('/universities/:region/', routes.views.universities_destination);
	app.get('/universities/:region/:country/', routes.views.universities_destination);
	app.get('/universities/:region/:country/:state?/:city?/:university', routes.views.university);
	// console.log("destination");
	// app.get('/universities/:region/:country/:state/:city/', routes.views.universities_destination);
	app.get('/universities/:region/:country/:state?/:city?/', routes.views.universities_destination);

	app.get('/blog/:category?', routes.views.blog);
	app.get('/blog/post/:post', routes.views.post);

	app.get('/tests/', routes.views.tests);
	app.get('/tests/:test', routes.views.test);

	app.get('/courses/', routes.views.courses);
	app.get('/courses/:course', routes.views.course);

	app.get('/search/', routes.views.search);

	app.get('/study-abroad/', routes.views.study_destinations);
	app.get('/study-abroad/:destination', routes.views.study_destination);

	app.all('/contact', routes.views.contact);
	app.all('/aboutus/', routes.views.aboutus);

	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);

	// Post methods
	app.post('/api/countries', routes.api.countries);
	app.post('/api/universities', routes.api.universities);
	app.post('/api/regions', routes.api.regions);
	app.post('/api/states', routes.api.states);
	app.post('/api/cities', routes.api.cities);
	// Get methods
	app.get('/api/search/:value', routes.api.search);
};
