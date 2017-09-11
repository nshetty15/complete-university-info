var keystone = require('keystone');

exports = module.exports = function(req, res) {
  var view = new keystone.View(req, res);
  var locals = res.locals;

  // Set locals
  locals.section = 'test';
  locals.filters = {
    test: req.params.test
  }
  locals.data = {
    tests:[]
  }

view.on('init', function(next){
  var q = keystone.list('Test').model.findOne({
    slug: locals.filters.test
  });

  q.exec(function(err, result){
    locals.data.test = result;
    next(err);
  });
});

  // Render View
  view.render('test');
}