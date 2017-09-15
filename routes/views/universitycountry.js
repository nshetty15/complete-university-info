var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {

  var view = new keystone.View(req, res);
  var locals = res.locals;

  // Init locals
  locals.section = 'universities';
  locals.filters = {
    category: req.params.country,
  };
  locals.data = {
    posts: [],
    categories: [],
  };

  // Load all categories
  view.on('init', function (next) {

    keystone.list('UniversityCountry').model.find().sort('name').exec(function (err, results) {


      if (err || !results.length) {
        return next(err);
      }

      locals.data.categories = results;
      //console.log("UniversityCountry: ", locals.data.categories);

      // Load the counts for each category
      async.each(locals.data.categories, function (category, next) {

        keystone.list('University').model.count().where('categories').in([category.id]).exec(function (err, count) {
          category.UniversityCount = count;
          next(err);
        });

      }, function (err) {
        next(err);
      });
    });
  });


  // Load the current category filter
  view.on('init', function (next) {

    if (req.params.category) {
      keystone.list('UniversityCountry').model.findOne({ key: locals.filters.category }).exec(function (err, result) {
        //("locals.data.category", locals.data.category);
        locals.data.category = result;
        next(err);
      });
    } else {
      next();
    }
  });

  // Load the posts
	view.on('init', function (next) {
    
        var q = keystone.list('University').paginate({
          page: req.query.page || 1,
          perPage: 4,
          maxPages: 4,
          filters: {
            state: 'published',
          },
        })
          .sort('-publishedDate')
          .populate('author categories');
    
        if (locals.data.category) {
          //console.log("locals.data.category: ", locals.data.category);
          q.where('categories').in([locals.data.category]);
        }
    
        q.exec(function (err, results) {
          console.log("final results: ", results);
          locals.data.universities = results;
          next(err);
        });
      });

  // Load Products
  //view.query('universities', keystone.list('University').model.find());

  // Render View
  view.render('universities');
}