var keystone = require('keystone');

/**
 * UniversityCountryCategory Model
 * ==================
 */

var UniversityCountry = new keystone.List('UniversityCountry', {
	autokey: { from: 'name', path: 'key', unique: true },
});

UniversityCountry.add({
	name: { type: String, required: true },
});

UniversityCountry.relationship({ ref: 'University', path: 'universities', refPath: 'categories' });

UniversityCountry.register();
