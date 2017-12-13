var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * University Country Model
 * ==================
 */

var UniversityCountry = new keystone.List('UniversityCountry', {
	autokey: { from: 'name', path: 'key', unique: true },
});

UniversityCountry.add({
	name: { type: String, required: true },
	region: { type: Types.Relationship, ref: 'Region' },
	countryCode: { type: String},
	// regionCode: { type: String }, 
	currencyCode: { type: String },
	nationality: { type: String },
});

UniversityCountry.relationship({ ref: 'University', path: 'universities', refPath: 'country' });

/******/
UniversityCountry.defaultColumns = 'name, countryCode, regionCode, currencyCode, nationality';

UniversityCountry.register();
