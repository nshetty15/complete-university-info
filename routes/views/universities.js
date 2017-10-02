var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {
  var view = new keystone.View(req, res);
  var locals = res.locals;
  // console.log(req.params.country);
  // init locals
  locals.section = 'universities';
  locals.filters = {
    category: req.params.country
  };
  locals.data = {
    universities: [],
    categories: [],
    source: 'universities',
  };

  // Load all categories
  view.on("init", function (next) {
    keystone.list('UniversityCountry').model.find().sort('name').exec(function (err, results) {
      // console.log("ERROR: " + JSON.stringify(err), "RESULTS: " + JSON.stringify(results));

      if (err || !results.length) {
        return next(err);
      }

      locals.data.categories = results;

      async.each(locals.data.categories, function (category, next) {
        keystone.list('University').model.count().where('categories').in([category.id]).exec(function (err, count) {
          category.countryCount = count;
          // console.log('COUNT:', count); // 10 - 11
          next(err);
        });
      }, function (err) {
        next(err);
      });

    });
  });

  // Load the current category filter
  view.on('init', function (next) {

    if (req.params.country) {
      locals.data.source = "bycountry";

      keystone.list('UniversityCountry').model.findOne({ key: locals.filters.category }).exec(function (err, result) {
        // console.log('INDIVIDUAL CATEGORY FILTER: ', JSON.stringify(result));
        locals.data.category = result;
        next(err);
      });
    } else {
      next();
    }

  });

  // Load the list of universities
  view.on('init', function (next) {
    var q = keystone.list('University').paginate({
      page: req.query.page || 1,
      perPage: 2,
      maxPages: 10,
      filters: {
        state: 'published',
      },
    })
      .sort('-publishedDate')
      .populate('categories');

    if (locals.data.category) {
      // console.log('category: ', locals.data.category)
      q.where('categories').in([locals.data.category]);
    }

    q.exec(function (err, results) {
      // console.log("FINAL RESULTS: " + JSON.stringify(results));
      console.log("FINAL Count: " + JSON.stringify(results.total));
      locals.data.universities = results;
      next(err);
    });

  });

  // Render View
  view.render('universities');
};