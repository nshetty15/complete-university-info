var keystone = require('keystone');
var async = require('async'); // use async to access multiple models - by pras

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'blog';
	locals.filters = {
		category: req.params.category,
	};
	locals.data = {
		posts: [],
		categories: [],
		pathName: req.url,
		source: 'blog', // for pagination
		meta: {
			title: keystone.get('title'), // under 70 characters
			description: keystone.get('description'), // under 160 characters
			keywords: keystone.get('keywords') // No more than 10 keyword phrases
		},
	};

	// Load all categories
	view.on('init', function (next) {

		keystone.list('PostCategory').model.find().sort('name').exec(function (err, results) {

			if (err || !results.length) {
				return next(err);
			}

			locals.data.categories = results;

			// Load the counts for each category
			async.each(locals.data.categories, function (category, next) {

				keystone.list('Post').model.count().where('categories').in([category.id]).exec(function (err, count) {
					// use this for the count of each categories
					category.postCount = count;
					next(err);
				});

			}, function (err) {
				next(err);
			});
		});
	});

	// Load the current category filter
	view.on('init', function (next) {

		if (req.params.category) { 
			keystone.list('PostCategory').model.findOne({ key: locals.filters.category }).exec(function (err, result) {
				console.log(result)
				locals.data.category = result;
				next(err);
			});
		} else {
			next();
		}
	});

	// Load the posts
	view.on('init', function (next) {

		var q = keystone.list('Post').paginate({
			page: req.query.page || 1,
			perPage: 10,
			maxPages: 10,
			filters: {
				state: 'published',
			},
		})
			.sort('-publishedDate')
			.populate('author categories');

		if (locals.data.category) {
			q.where('categories').in([locals.data.category]);
		}

		q.exec(function (err, results) {
			// console.log(results);
			locals.data.posts = results;
			next(err);
		});
	});

	// Render the view
	view.render('blog');
};
