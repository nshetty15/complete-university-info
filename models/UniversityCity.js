var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * UniversityCity Category Model
 * ==================
 */

var UniversityCity = new keystone.List('UniversityCity', {
	autokey: { from: 'name', path: 'key', unique: true },
});

UniversityCity.add({
	name: { type: String, required: true },
	countryCode: { type: String }, // could be many
	// state: {type: Types.Relationship, ref: 'UniversityState'},
	// country: {type: Types.Relationship, ref: 'UniversityCountry'},
});

UniversityCity.relationship({ ref: 'University', path: 'universities', refPath: 'city' });

UniversityCity.defaultColumns = 'name';

UniversityCity.register();
