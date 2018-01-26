var keystone = require('keystone');

exports = module.exports = function (req, res) {
  var view = new keystone.View(req, res);
  var locals = res.locals;

  // Set locals
  locals.section = 'aboutus';
  locals.data = {
    pathName: req.url,
    meta: {
      title: locals.title, // under 70 characters
      description: locals.description, // under 160 characters
      keywords: locals.keywords // No more than 10 keyword phrases
    },
  };


  // Render View
  view.render('aboutus');
};