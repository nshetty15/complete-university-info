var keystone = require('keystone');

exports = module.exports = function (req, res) {
  var view = new keystone.View(req, res);

  var locals = res.locals;

  // Set locals
  locals.section = 'universities';
  locals.filters = {
    university: req.params.university,
  };
  locals.data = {
    university: [],
    inCountry: [],
    pathName: req.path,
    meta: {},
    showShare: true, // show share -fb,twitter etc
    showAdvertise: true, // Page to display advertisement -true
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

      var pageTitle = "";
      // console.log(result)
      if (result.qs || result.the || result.arwu || result.forbes || result.macleans || result.cug || result.ft || result.theEconomist || result.usNewsNational || result.usNewsLiberal) {
        pageTitle += ", Rankings";
      }
      if (result.acceptRate) {
        pageTitle += ", Acceptance Rate";
      }
      if (result.programs) {
        pageTitle += ", Programs";
      }
      if (result.BDtuitionIn || result.BDtuitionOut || result.MDtuitionIn || result.MDtuitionOut) {
        pageTitle += ", Tuition Fee";
      }

      if (result.totalCost) {
        pageTitle += ", Total Cost";
      }

      // title, description, keywords
      locals.data.meta = {
        title: (result.acronym ? result.acronym + ' | ' : '') + result.name + (result.localName ? ' | ' + result.localName : '') + " - " + result.country.name + pageTitle,
        description: result.brief.replace(rex, ""),
        keywords: result.name + ",university" + pageTitle + "," + result.country.name + "," + result.region.name
      };

      locals.data.university = result;
      // Check if canonical url available
      // locals.data.pathName = locals.data.university.canonical ? locals.data.university.canonical : locals.data.pathName;

      next(err);

    });

  });

  // Other universities from the country
  // --to fix - random order
  view.on('init', function (next) {

    keystone.list('University').model.find()
      .where({ 'country': locals.data.university.country, 'status': 'published' })
      .where("_id").ne(locals.data.university._id)
      // .aggregate([
        // https://stackoverflow.com/questions/24806721/mongodb-how-to-find-10-random-document-in-a-collection-of-100
      //  {$match: {'country': locals.data.university.country}},
      //   { $sample: { size: 5 } }
      // ])
      .populate('region country state city')
      .limit(25)
      .exec(function (err, result) {
        locals.data.inCountry = result;
        next(err);
      });

  });

  // Render View
  view.render('university');
};