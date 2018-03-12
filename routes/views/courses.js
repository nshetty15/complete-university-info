var keystone = require('keystone');

exports = module.exports = function(req, res){
  var view = new keystone.View(req, res);
  var locals = res.locals;

  locals.section = 'courses';

  locals.data = {
    courses: [],
    pathName: req.path,
    source: 'courses',
    meta: {
      title: locals.title, // under 70 characters
      description: locals.description, // under 160 characters
      keywords: locals.keywords // No more than 10 keyword phrases
    }
  };

  // Load all Programs with pagination
  view.on('init', function(next){
    var q = keystone.list('Course').paginate({
      page: req.query.page || 1,
      perPage: 10,
      maxPages: 10,
      filters: {
        //state:'published'
      },
    })
    .populate('discipline');
        //.sort('-publishedDate')
    q.exec(function(err, results){
      locals.data.courses = results;
      next(err);
    });

  });

  // Render View
  view.render('courses');
};
