var keystone = require('keystone');

exports = module.exports = function(req, res) {
  var view = new keystone.View(req, res);

  var locals = res.locals;

  // Set locals
  locals.section = 'universities';
  locals.filters = {
    university: req.params.university,
  };
  locals.data = {
    universities:[],
    meta: {
			title: keystone.get('Title'), // under 70 characters
			description: keystone.get('Description'), // under 160 characters
			keywords: keystone.get('Keywords') // No more than 10 keyword phrases
		},
  };

view.on('init', function(next){
  var q = keystone.list('University').model.findOne({
    slug: locals.filters.university
  });

  q.exec(function(err, result){
    // Add meta tags -title, description, keywords
			if(result.meta) {
				locals.data.meta = result.meta;
      }
      
    locals.data.university = result;
    next(err);
  });
});

  // Render View
  view.render('university');
}