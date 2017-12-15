var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {
  var view = new keystone.View(req, res);
  var locals = res.locals;

  // init locals
  locals.section = 'universities';

  locals.data = {
    universities: [],
    countries: [],
    pathName: req.url,
    source: 'universities', // for pagination
    meta: {
      title: keystone.get('title'), // under 70 characters
      description: keystone.get('description'), // under 160 characters
      keywords: keystone.get('keywords') // No more than 10 keyword phrases
    },
  };

  // Load all countries
  view.on("init", function (next) {
    keystone.list('UniversityCountry').model.find().sort('name').populate('region').exec(function (err, results) {
      // console.log("ERROR: " + JSON.stringify(err), "RESULTS: " + JSON.stringify(results));

      if (err || !results.length) {
        return next(err);
      }

      locals.data.countries = results;

      async.each(locals.data.countries, function (category, next) {
        // keystone.list('University').model.count().where('country').in([category.id]).exec(function (err, count) {
        keystone.list('University').model.count().where('country', category.id).exec(function (err, count) {
          category.countryCount = count;
          // console.log('COUNT:', count); // 10 - 11
          next(err);
        });
      }, function (err) {
        next(err);
      });
      
    });
  });

  // Load the list of universities
  view.on('init', function (next) {
    var q = keystone.list('University').paginate({
      page: req.query.page || 1,
      perPage: 2,
      maxPages: 10,
      filters: {
        status: 'published',
      },
    })
      .sort('-publishedDate')
      .populate('region country state city');

    q.exec(function (err, results) {
      // console.log("FINAL RESULTS: " + JSON.stringify(results));
      // console.log("FINAL Count: " + JSON.stringify(results.total));
      locals.data.universities = results;
      next(err);
    });

  });

  // Render View
  view.render('universities');
};