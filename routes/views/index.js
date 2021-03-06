var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	// console.log(JSON.stringify(locals.navLinks));
	// console.log(res.meta);
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';

	locals.data = {
		articles: [],
		tests: [],
		levels: [],
		studyIn: [],
		pathName: req.path,
		meta: {
			title: "Universities around the world - Rankings, Programs, Costs & Guidance for free.", // under 70 characters
			description: locals.description, // under 160 characters
			keywords: locals.keywords // No more than 10 keyword phrases
		},
		showShare: true, // show share -fb,twitter etc
	};

	// Load the latest 3 articles
	view.on('init', function (next) {
		var q = keystone.list('Post').model.find()
			.where('state', 'published')
			.sort('-publishedDate')
			.populate('author')
			.limit(3);

		q.exec(function (err, results) {
			// console.log("Error:", err);
			// console.log("Results:",  results);

			locals.data.articles = results;
			next(err);
		});
	});

	// Load language & admission tests
	view.on('init', function (next) {
		var q = keystone.list("Test").model.find()
			.where('status', 'published')
			.sort('-publishedDate')
			.limit(6);

		q.exec(function (err, results) {
			// console.log("Error:", err);
			// console.log("Results:",  results);
			locals.data.tests = results;
			next(err);
		});
	});

	// Load Levels
	view.on('init', function (next) {
		var q = keystone.list("Level").model.find()
			.where('status', 'published')
			.sort('order')
			.limit(6);

		q.exec(function (err, results) {
			// console.log(results);
			locals.data.levels = results;
			next(err);
		});
	});

	// Load Study destinations
	view.on('init', function (next) {
		var q = keystone.list("StudyDestination").model.find()
			.where('status', 'published')
			.populate('country')
			.sort('order')
			.limit(6);
		// { status: 'published'}
		q.exec(function (err, results) {
			locals.data.studyIn = results;
			next(err);
		});
	});

	// Render the view
	view.render('index');
};
