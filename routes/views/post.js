var keystone = require('keystone');

exports = module.exports = function (req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;

	// https://stackoverflow.com/questions/10183291/how-to-get-the-full-url-in-express
	// var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
	// console.log(fullUrl);
	// Set locals
	locals.section = 'blog';
	locals.filters = {
		post: req.params.post,
	};
	locals.data = {
		posts: [],
		meta: {},
		pathName: req.url,
	};

	// Load the current post
	view.on('init', function (next) {

		var q = keystone.list('Post').model.findOne({
			state: 'published',
			slug: locals.filters.post,
		}).populate('author categories');

		q.exec(function (err, result) {
			// Add meta tags -title, description, keywords
			var rex = /(<([^>]+)>)/ig;
			locals.data.meta = {
				title: result.meta.title || result.data.title,
				description: result.meta.description ? result.meta.description : result.content.brief ? (result.content.brief).replace(rex, "") : locals.description,
				keywords: result.meta.keywords || locals.keywords,
			};

			// Final result
			locals.data.post = result;

			next(err);
		});

	});

	// Load other posts - and display as related
	view.on('init', function (next) {

		var q = keystone.list('Post').model.find()
			.where('state', 'published')
			.sort('-publishedDate')
			.populate('author')
			.limit(3);

		q.exec(function (err, results) {
			// console.log(err, results);
			locals.data.posts = results;
			next(err);
		});

	});

	// Render the view
	view.render('post');
};
