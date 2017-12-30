var keystone = require('keystone');

exports = module.exports = function (req, res) {
  var view = new keystone.View(req, res);
  var locals = res.locals;

  // init locals
  locals.section = 'search';

  locals.data = {
    universities: [],
    searchQuery: req.query.q,
    meta: {
      title: locals.title + " search results", // under 70 characters
      description: "Want to study a university courses abroad? Use our free tool to find your dream university.", // under 160 characters
      keywords: "search, find, universities, courses, programs, university" // No more than 10 keyword phrases
    },
  };

  view.on("init", function (next) {

    // Apply only published
    // filters: {
    //   status: 'published',
    // },

    keystone.list('University')
    .model.find({'name' : new RegExp(locals.data.searchQuery, 'i'), 'status': 'published'}, function (err, results) {
      // console.log(err, results)
      if (err) {
        res.send(err);
      }

      locals.data.universities = results;
      
      next(err);

    }).limit(10);

  });

    // Render View
    view.render('search');
};