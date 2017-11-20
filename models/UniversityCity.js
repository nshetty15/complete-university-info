var keystone = require('keystone');

/**
 * UniversityCity Category Model
 * ==================
 */

var UniversityCity = new keystone.List('UniversityCity', {
	autokey: { from: 'name', path: 'key', unique: true },
});

UniversityCity.add({
	name: { type: String, required: true },
});

UniversityCity.relationship({ ref: 'University', path: 'universities', refPath: 'city' });

UniversityCity.register();
