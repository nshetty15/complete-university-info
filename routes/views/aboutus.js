var keystone = require('keystone');

exports = module.exports = function (req, res) {
  var view = new keystone.View(req, res);
  var locals = res.locals;

  // Set locals
  locals.section = 'aboutus';
  locals.data = {
    pathName: req.url,
    meta: {
      title: "About - " + locals.title, // under 70 characters
      description: "We strive to furnish the latest data of a university to aspiring students to achieve their professional success.", // under 160 characters - locals.description
      keywords: "about, complete university, information, study abroad, university guide" // No more than 10 keyword phrases - locals.keywords
    },
  };


  // Render View
  view.render('aboutus');
};