var keystone = require('keystone');

/**
 * University Country Model
 * ==================
 */

var UniversityCountry = new keystone.List('UniversityCountry', {
	autokey: { from: 'name', path: 'key', unique: true },
});

UniversityCountry.add({
	name: { type: String, required: true },
	countryCode: { type: String},
	regionCode: { type: String }, 
	currencyCode: { type: String },
	nationality: { type: String },
});

UniversityCountry.relationship({ ref: 'University', path: 'universities', refPath: 'country' });

UniversityCountry.register();
