var keystone = require('keystone');

exports = module.exports = function (req, res) {
  var view = new keystone.View(req, res);
  var locals = res.locals;

  // Set locals
  locals.section = 'tests';

  locals.data = {
    pathName: req.path,
    meta: {
      title: "Language and Admission tests explained", // under 70 characters
      description: "At universities teaching in English, a test of English language proficiency and admission test is likely to be part of the applications process for many international students.", // under 160 characters
      keywords: "IELTS, TOEFL, GMAT, GRE, PTE, language test, admission test" // No more than 10 keyword phrases
    },
    showShare: true, // show share -fb,twitter etc
  };

  // Load Tests
  view.query('tests', keystone.list('Test').model.find());

  // Render View
  view.render('tests');
};