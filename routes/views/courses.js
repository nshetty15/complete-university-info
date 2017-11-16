var keystone = require('keystone');

exports = module.exports = function(req, res){
  var view = new keystone.View(req, res);
  var locals = res.locals;

  locals.section = 'courses';

  locals.data = {
    courses: [],
    pathName: req.url,
    source: 'courses',
    meta: {
      title: keystone.get('title'), // under 70 characters
      description: keystone.get('description'), // under 160 characters
      keywords: keystone.get('keywords') // No more than 10 keyword phrases
    }
  };

  // Load all Programs with pagination
  view.on('init', function(next){
    var q = keystone.list('Program').paginate({
      page: req.query.page || 1,
      perPage: 10,
      maxPages: 10,
      filters: {
        //state:'published'
      },
    });
    //.sort('-publishedDate')
    //.populate('countryCategory')
    q.exec(function(err, results){
      locals.data.courses = results;
      next(err);
    });

  });

  // Render View
  view.render('courses');
};
