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
    inCountry: [],
    pathName: req.url,
    meta: {},
    showShare: true, // show share -fb,twitter etc
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
      var pageTitle = "";
      // console.log(result)
      if (result.qs || result.the || result.arwu || result.forbes || result.macleans
        || result.cug || result.ft || result.theEconomist || result.usNewsNational || result.usNewsLiberal) {
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
        title: result.name + " - " + result.country.name + pageTitle,
        description: result.brief.replace(rex, ""),
        keywords: result.name + ",university" + pageTitle + "," + result.country.name + "," + result.region.name
      };

      locals.data.university = result;

      next(err);

    });

  });

  limitrecords=10;

  function getRandomArbitrary(min, max) {
    return Math.ceil(Math.random() * (max - min) + min);
  }

  // Other universities from the country
  // --to fix - exclude same school, and random order
  view.on('init', function (next) {

    keystone.list('University').model.find()
      .where({'country': locals.data.university.country})
      .populate('region country state city')
      .limit(10).exec(function (err, result) {
        // locals.data.inCountry = result;
        next(err);
      });

  });

  // Render View
  view.render('university');
};