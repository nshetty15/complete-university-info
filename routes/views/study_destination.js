var keystone = require('keystone');

exports = module.exports = function (req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	// Set locals
	locals.section = 'studyin';
	locals.filters = {
		destination: req.params.destination,
	};
	locals.data = {
		pathName: req.url,
	};

	// Load the current post
	view.on('init', function (next) {

		var q = keystone.list('StudyDestination').model.findOne({
			status: 'published',
			slug: locals.filters.destination,
		}).populate('country');

		q.exec(function (err, result) {
			if(err){
				next(err);
			}
			// Final result
			locals.data = result;
		});

	});

	// Render the view
	view.render('study_destination');
};
