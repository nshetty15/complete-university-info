var keystone = require('keystone');

exports = module.exports = function (req, res) {
  var view = new keystone.View(req, res);
  var locals = res.locals;

  // Set locals
  locals.section = 'tests';
  locals.data = {
    pathName: req.url,
    meta: {
      title: keystone.get('title'), // under 70 characters
      description: keystone.get('description'), // under 160 characters
      keywords: keystone.get('keywords') // No more than 10 keyword phrases
    },
  };

  // Load Tests
  view.query('tests', keystone.list('Test').model.find());

  // Render View
  view.render('tests');
};