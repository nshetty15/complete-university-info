var keystone = require('keystone');
var Types = keystone.Field.Types;
/**
 * UniversityState Category Model
 * ==================
 */

var UniversityState = new keystone.List('UniversityState', {
	autokey: { from: 'name', path: 'key', unique: true },
});

UniversityState.add({
	name: { type: String, required: true },
	// country: { type: Types.Relationship, ref: 'UniversityCountry' },
});

UniversityState.relationship({ ref: 'University', path: 'universities', refPath: 'state' });

/******/
UniversityState.defaultColumns = 'name, country';

UniversityState.register();
