var keystone = require('keystone');

exports = module.exports = function (req, res) {
  var view = new keystone.View(req, res);
  var locals = res.locals;

  // Set locals
  locals.section = 'tests';
  locals.data = {
    meta: {
      title: keystone.get('Title'), // under 70 characters
      description: keystone.get('Description'), // under 160 characters
      keywords: keystone.get('Keywords') // No more than 10 keyword phrases
    },
  };

  // Load Tests
  view.query('tests', keystone.list('Test').model.find());

  // Render View
  view.render('tests');
}