var keystone = require('keystone');

exports = module.exports = function(req, res) {
  var view = new keystone.View(req, res);

  var locals = res.locals;

  // Set locals
  locals.section = 'universities';
  locals.filters = {
    university: req.params.university,
  }
  locals.data = {
    universities:[]
  }

view.on('init', function(next){
  var q = keystone.list('University').model.findOne({
    slug: locals.filters.university
  });

  q.exec(function(err, result){
    locals.data.university = result;
    next(err);
  });
});

  // Render View
  view.render('university');
}