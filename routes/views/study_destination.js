var keystone = require('keystone');

exports = module.exports = function (req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	// Set locals
	locals.section = 'studyin';
	locals.filters = {
		country: req.params.country,
	};
	locals.data = {
		study: [],
		meta: {},
		pathName: req.url,
	};

	// Load the current post
	view.on('init', function (next) {

		var q = keystone.list('StudyDestination').model.findOne({
			state: 'published',
			slug: locals.filters.country,
		}).populate('city state country region');

		q.exec(function (err, result) {
			// Add meta tags -title, description, keywords
			var rex = /(<([^>]+)>)/ig;
			locals.data.meta = {
				title: result.meta.title,
				description: result.meta.description ? result.meta.description : result.content.brief ? (result.content.brief).replace(rex, "") : keystone.get('description'),
				keywords: result.meta.keywords,
			};

			// Final result
			locals.data.study = result;

			next(err);
		});

	});

	// Render the view
	view.render('study_destination');
};
