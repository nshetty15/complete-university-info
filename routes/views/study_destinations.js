var keystone = require('keystone');

exports = module.exports = function (req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	// Set locals
	locals.section = 'studyin';

	locals.data = {
    pathName: req.url,
		study: [],
		meta: {
      title: locals.title, // under 70 characters
      description: locals.description, // under 160 characters
      keywords: locals.keywords // No more than 10 keyword phrases
    },
	};

	// Load the current post
	view.on('init', function (next) {

		// var q = keystone.list('StudyDestination').model.find({
		// 	state: 'published',
    // }).populate('country');
    
		// q.exec(function (err, result) {
		// 	if(err){
		// 		next(err);
		// 	}
		// 	console.log(result);

		// 	// Final result
		// 	locals.data.study = result;

		// });
    keystone.list('StudyDestination').model.find().sort('name').exec(function (err, results) {
      if (err || !results.length) {
				return next(err);
      }
      locals.data.study = results;
      console.log(results);
    });
  });
  


	// Render the view
	view.render('study_destinations');
};
