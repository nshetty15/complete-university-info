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
    pathName: req.path,
    source: 'universities', // for pagination
    hideBanner: !req.query.page,
    meta: {
      title: "Universities around the world - find your ideal university", // under 70 characters
      description: "Find degree options by comparing the universities around the world and choose universities of your choice.", // under 160 characters - locals.description
      keywords:  "universities,study abroad,international students,study guide" // No more than 10 keyword phrases - locals.keywords
    },
    showShare: true, // show share -fb,twitter etc
    showAdvertise: true, // Page to display advertisement
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


  // var q = keystone.list('Post').model.find()
	// 		.where('state', 'published')
	// 		.sort('-publishedDate')
	// 		.populate('author')
  //     .limit(3);
      
  // Load the list of universities
  view.on('init', function (next) {
    var filter = {
      status : "published"
    };
    var q = keystone.list('University').paginate({
      page: req.query.page || 1,
      perPage: 15,
      maxPages: 10,
      filters: filter,
    })
      // .sort({publishedDate: '-publishedDate', the: '-the'})
      // .sort('the')
      .sort({ the: -1 })
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