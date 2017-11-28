var keystone = require("keystone");

exports = module.exports = function (req, res) {
  var searchQuery = req.params.value;
  keystone.list('University').model.find({'name' : new RegExp(searchQuery, 'i')}, function (err, results) {
    
    if (err) {
      res.send(err);
    }
    res.json(results);

  }).limit(10);
}; 