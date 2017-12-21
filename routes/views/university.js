var keystone = require('keystone');

exports = module.exports = function (req, res) {
  var view = new keystone.View(req, res);

  var locals = res.locals;
  //console.log(req, res)

  // Set locals
  locals.section = 'universities';
  locals.filters = {
    university: req.params.university,
  };
  locals.data = {
    university: [],
    pathName: req.url,
    meta: { },
  };
  //console.log(req.params.university)

  view.on('init', function (next) {
    var q = keystone.list('University').model.findOne({
      slug: locals.filters.university
    })
    .populate('region country state city'); // BDprograms MDprograms 

    q.exec(function (err, result) {
      // Add meta tags -title, description, keywords 
      var rex = /(<([^>]+)>)/ig;
      // result.title + ( result.meta.title ? " - " + result.meta.title : "")
      locals.data.meta = {
        title: result.name, 
				// title: result.title + ( result.country[0].name ? " - " + result.country[0].name : ""), // need to fix country
				// description: result.meta.description ? result.meta.description : result.content.brief ? (result.content.brief).replace(rex, "") : keystone.get('description'),
				// keywords: result.meta.keywords  || keystone.get('keywords') ,
			};

      locals.data.university = result;
      next(err);
    });
  });

  // Render View
  view.render('university');
};