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
      title: keystone.get('title'), // under 70 characters
      description: keystone.get('description'), // under 160 characters
      keywords: keystone.get('keywords') // No more than 10 keyword phrases
    },
  };

  view.on("init", function (next) {

    // Apply only published
    // filters: {
    //   status: 'published',
    // },

    keystone.list('University').model.find({'name' : new RegExp(locals.data.searchQuery, 'i')}, function (err, results) {
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