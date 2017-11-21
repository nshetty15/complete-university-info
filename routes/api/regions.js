
var keystone = require('keystone');

exports = module.exports = function (req, res) {
  keystone.list('Region').model.create(req.body, function (err, result) {
    res.send(
      (err === null) ? { msg: 'saved successfully! ' } : { msg: err }
    );
  });
};

