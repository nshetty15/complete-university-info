var keystone = require('keystone');

exports = module.exports = function(req, res) {
  var view = new keystone.View(req, res);
  var locals = res.locals;

  // Set locals
  locals.section = 'universities';

  // Load Products
  view.query('universities', keystone.list('University').model.find());

  // Render View
  view.render('universities');
}