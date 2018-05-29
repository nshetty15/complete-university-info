var keystone = require('keystone');

exports = module.exports = function (req, res) {
  var view = new keystone.View(req, res);
  var locals = res.locals;

  // Set locals
  locals.section = 'privacy';
  locals.data = {
    pathName: req.path,
    meta: {
      title: "Privacy Policy - " + locals.title, // under 70 characters
      description: "At www.completeuniversityinfo.com the privacy of our visitors is extremely important. This Privacy Policy outlines the types of personal information that is received and collected and how it is used.", // under 160 characters - locals.description
      keywords: "complete university, information, study abroad, university guide" // No more than 10 keyword phrases - locals.keywords
    },
    showShare: false,
  };


  // Render View
  view.render('privacy');
};