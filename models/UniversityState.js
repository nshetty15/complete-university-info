var keystone = require('keystone');

/**
 * UniversityState Category Model
 * ==================
 */

var UniversityState = new keystone.List('UniversityState', {
	autokey: { from: 'name', path: 'key', unique: true },
});

UniversityState.add({
	name: { type: String, required: true },
});

UniversityState.relationship({ ref: 'University', path: 'universities', refPath: 'stateCategories' });

UniversityState.register();
