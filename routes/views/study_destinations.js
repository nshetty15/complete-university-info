var keystone = require('keystone');

exports = module.exports = function (req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	// Set locals
	locals.section = 'studyin';

	locals.data = {
		pathName: req.url,
		studyIn: [],
		meta: {
			title: locals.title, // under 70 characters
			description: locals.description, // under 160 characters
			keywords: locals.keywords // No more than 10 keyword phrases
		},
	};

	// Load the current post
	view.on('init', function (next) {
		var q = keystone.list('StudyDestination').paginate({
			page: req.query.page || 1,
			perPage: 10,
			maxPages: 10,
			filters: {
				status: 'published',
			},
		})
			.sort('name')
			.populate('country');

		q.exec(function (err, results) {
			locals.data.studyIn = results;
			next(err);
		});

	});

	// Render the view
	view.render('study_destinations');
};
