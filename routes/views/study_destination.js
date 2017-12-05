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
		study: [],
		meta: {},
		pathName: req.url,
	};

	// Load the current post
	view.on('init', function (next) {

		var q = keystone.list('StudyDestination').model.findOne({
			state: 'published',
			slug: locals.filters.destination,
		}).populate('city state country region');

		q.exec(function (err, result) {
			if(err){
				next(err);
			}
			// console.log(result);
			// Add meta tags -title, description, keywords
			// locals.data.meta = {
			// 	title: result.meta.title,
			// 	description: result.meta.description,
			// 	keywords: result.meta.keywords,
			// };

			// Final result
			locals.data.study = result;

			
		});

	});

	// Render the view
	view.render('study_destination');
};
