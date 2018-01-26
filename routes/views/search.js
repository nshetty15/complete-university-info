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
    if (locals.data.searchQuery) {
      keystone.list('University')
        .model.find({ 'name': new RegExp(locals.data.searchQuery, 'i'), 'status': 'published' }, function (err, results) {
          
          if (err) {
            res.send(err);
          }
          // console.log(results.total)
          locals.data.universities = results;

          next(err);

        }).limit(10)
    } else {
      next();
    }
  });

  // Render View
  view.render('search');
};