var keystone = require('keystone');

exports = module.exports = function (req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	// Set locals
	locals.section = 'studyin';

	locals.data = {
		pathName: req.url,
		studyIn: [],
		meta:{
			title: "Where to study? Study abroad destinations.", // under 70 characters
			description: "Find your perfect destination. We have covered all the required information you need from university costs to student life.", // under 160 characters - locals.description
			keywords: "study abroad, study destinations, study, guide, univeristy" // No more than 10 keyword phrases
		},
		showShare: true, // show share -fb,twitter etc
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
