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
	articles:[],
	tests: [],
	levels: [],
	pathName: req.url,
	meta:{
		title: keystone.get('title'), // under 70 characters
		description: keystone.get('description'), // under 160 characters
		keywords: keystone.get('keywords') // No more than 10 keyword phrases
	},
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
	view.on('init', function(next){
		var q = keystone.list("Test").model.find()
		.sort('-publishedDate')
		.limit(6);

		q.exec(function(err, results){
			// console.log("Error:", err);
			// console.log("Results:",  results);
			 locals.data.tests = results;
			 next(err);
		});
	});

	// Load Levels
	view.on('init', function(next){
		var q = keystone.list("Level").model.find()
		.sort('name')
		.limit(2);

		q.exec(function(err, results){
			// console.log(results);
			locals.data.levels = results;
			next(err);
		});
	});

	// Render the view
	view.render('index');
};
