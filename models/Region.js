var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Region - country regions
 */

 var Region = new keystone.List('Region', {
  autokey: { from: 'name', path: 'key', unique: true},
 });

 Region.add({
  name: { type: String, required: true },
  regionCode: {type: String},
	// image: { type: Types.CloudinaryImages },
});

Region.register();