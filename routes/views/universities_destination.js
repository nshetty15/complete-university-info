var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {
  var view = new keystone.View(req, res);
  var locals = res.locals;

  // init locals
  locals.section = 'universities';
  locals.filters = {
    region: req.params.region,
    country: req.params.country,
    state: req.params.state,
    city: req.params.city
  };

  locals.data = {
    universities: [],

    region: req.params.region,
    country: req.params.country,
    state: req.params.state,
    city: req.params.city,

    regionCrumb: false,
    countryCrumb: false,
    stateCrumb: false,
    cityCrumb: false,

    pathName: req.path,
    source: 'bydestination', // for pagination
    meta: {},
    showShare: true, // show share -fb,twitter etc
    showAdvertise: true, // Page to display advertisement-true
  };

  // Load the current category filter
  view.on('init', function (next) {

    if (locals.filters.city) {
      keystone.list('UniversityCity').model.findOne({ key: locals.filters.city }).exec(function (err, result) {
        // Add meta tags -title, description, keywords
        // if (result.meta) {
        //   locals.data.meta = result.meta;
        // }
        // console.log('CITY: ', JSON.stringify(result));
        locals.data.category = result;
        next(err);
      });
    } else if (locals.filters.state) {
      keystone.list('UniversityState').model.findOne({ key: locals.filters.state }).exec(function (err, result) {
        // Add meta tags -title, description, keywords
        // if (result.meta) {
        //   locals.data.meta = result.meta;
        // }
        // console.log('STATE: ', JSON.stringify(result));
        locals.data.category = result;
        next(err);
      });
    } else if (locals.filters.country) {
      keystone.list('UniversityCountry').model.findOne({ key: locals.filters.country }).exec(function (err, result) {
        // Add meta tags -title, description, keywords
        // if (result.meta) {
        //   locals.data.meta = result.meta;
        // }
        // console.log('COUNTRY: ', JSON.stringify(result)); // {"_id":"59b69aef92ce7a5e1c2cb1cb","key":"canada","name":"Canada","__v":0}
        locals.data.category = result;

        next(err);
      });
    } else if (locals.filters.region) {
      keystone.list('Region').model.findOne({ key: locals.filters.region }).exec(function (err, result) {
        // Add meta tags -title, description, keywords
        // if (result.meta) {
        //   locals.data.meta = result.meta;
        // }
        // console.log('REGION: ', JSON.stringify(result));
        locals.data.category = result;
        next(err);
      });
    }

  });


  // Load the list of universities
  view.on('init', function (next) {

    // https://github.com/keystonejs/keystone/issues/4253
    var filter = {
      status: 'published',
    };
    if (locals.filters.city) {
      filter.city = { $in: [locals.data.category] };
      locals.data.cityCrumb = true;
    } else if (locals.filters.state) {
      filter.state = { $in: [locals.data.category] };
      locals.data.stateCrumb = true;
    } else if (locals.filters.country) {
      filter.country = { $in: [locals.data.category] };
      locals.data.countryCrumb = true;
    } else if (locals.filters.region) {
      filter.region = { $in: [locals.data.category] };
      locals.data.regionCrumb = true;
    }
   
    var q = keystone.list('University').paginate({
      page: req.query.page || 1,
      perPage: 15,
      maxPages: 10,
      filters: filter,
    })
      .sort('the')
      .populate('region country state city');

    q.exec(function (err, results) {

      if (err || !results.length) {
        // res.notFound();
      }
      // console.log("FINAL RESULTS: " + JSON.stringify(results));
      // console.log("FINAL Count: " + JSON.stringify(results.total));

      // title, description, keywords
      locals.data.meta = {
        title: "Universities in " + locals.data.category.name, // under 70 characters
        description: "Do you want to study in " + locals.data.category.name + "? Find out the universities in " + locals.data.category.name, // under 160 characters
        keywords: "study abroad, study guide, university, universities abroad," + locals.data.category.name // No more than 10 keyword phrases
      };
      locals.data.universitiesdestination = results;
      locals.data.crumbValues = results.results[0];
      next(err);
    });

  });

  // Render View
  view.render('universities_destination');
};