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
    source: 'bycountry',
    country: req.params.country,
  };

  // Load all categories - may be state in future
  // view.on("init", function (next) {
  //   keystone.list('UniversityCountry').model.find().sort('name').exec(function (err, results) {
  //     // console.log("ERROR: " + JSON.stringify(err), "RESULTS: " + JSON.stringify(results));
  //     if (err || !results.length) {
  //       return next(err);
  //     }
  //     locals.data.categories = results;
  //     async.each(locals.data.categories, function (category, next) {
  //       keystone.list('University').model.count().where('categories').in([category.id]).exec(function (err, count) {
  //         category.countryCount = count;
  //         // console.log('COUNT:', count); // 10 - 11
  //         next(err);
  //       });
  //     }, function (err) {
  //       next(err);
  //     });
  //   });
  // });

  // Load the current category filter
  view.on('init', function (next) {

    keystone.list('UniversityCountry').model.findOne({ key: locals.filters.category }).exec(function (err, result) {
      // console.log('INDIVIDUAL CATEGORY FILTER: ', JSON.stringify(result)); // {"_id":"59b69aef92ce7a5e1c2cb1cb","key":"canada","name":"Canada","__v":0}
      locals.data.category = result;
      next(err);
    });
    
  });


  // Load the list of universities
  view.on('init', function (next) {

    // https://github.com/keystonejs/keystone/issues/4253
    var filter = {
      state: 'published',
    };
    filter.categories = {$in: [locals.data.category]};

    var q = keystone.list('University').paginate({
      page: req.query.page || 1,
      perPage: 2,
      maxPages: 10,
      filters: filter,
    })
      .sort('-publishedDate')
      .populate('categories');

    // if (locals.data.category) {
    //   // console.log('category: ', locals.data.category)
    //   q.where('categories').in([locals.data.category]);
    // }

    q.exec(function (err, results) {
      // console.log("FINAL RESULTS: " + JSON.stringify(results));
      console.log("FINAL Count: " + JSON.stringify(results.total));
      locals.data.universitiescountry = results;
      next(err);
    });

  });

  // Render View
  view.render('universities_country');
};