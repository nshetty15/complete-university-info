
var keystone = require('keystone');

// https://gist.github.com/JedWatson/9741171 - to scaffold
exports = module.exports = function (req, res) {
  keystone.list('University').model.create(req.body, function (err, result) {
    //keystone.list('UniversityCountry').model.insertMany(req.body, function(err, result){
    res.send(
      (err === null) ? { msg: 'saved successfully! ' } : { msg: err }
    );
  });
};

