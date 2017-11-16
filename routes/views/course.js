var keystone = require('keystone');

exports = module.exports = function (req, res) {
  var view = new keystone.View(req, res);

  var locals = res.locals;

  locals.section = 'courses';
  locals.filters = {
    course: req.params.course,
  };

  locals.data = {
    course: [],
    pathName: req.url,
    meta: {},
  };

  view.on('init', function (next) {
    var q = keystone.list('Program').model.findOne({
      slug: locals.filters.course
    });

    q.exec(function (err, result) {

      if (result) {
        var rex = /(<([^>]+)>)/ig;

        locals.data.meta = {
          title: result.title,
          description: result.meta.description || keystone.get('description'),
          keywords: result.meta.keywords || keystone.get('keywords'),
        };
        locals.data.course = result;
      }


      next(err);

    });

  });

  view.render('course');
};