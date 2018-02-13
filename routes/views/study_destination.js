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
		meta:{},
		showShare: true, // show share -fb,twitter etc
	};

	// Load the current 
	view.on('init', function (next) {
    var q = keystone.list('StudyDestination').model.findOne({
      slug: locals.filters.destination
    }).populate('country');

    q.exec(function (err, result) {
			// Final result
			locals.data.meta = {
				title: result.meta.title || result.data.title,
				description: result.meta.description || locals.description,
				keywords: result.meta.keywords || locals.keywords,
			};

      locals.data.destination = result;
      next(err);
    });
  });

	// Render the view
	view.render('study_destination');
};
