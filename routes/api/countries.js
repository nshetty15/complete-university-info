
var keystone = require('keystone');

exports = module.exports = function (req, res) {
  keystone.list('UniversityCountry').model.create(req.body, function (err, result) {
    //keystone.list('UniversityCountry').model.insertMany(req.body, function(err, result){
    res.send(
      (err === null) ? { msg: 'saved successfully! ' } : { msg: err }
    );
  });
};

