var keystone = require('keystone');

/**
 * Level Model
 * ==================
 */

var Level = new keystone.List('Level', {
	autokey: { from: 'name', path: 'key', unique: true },
});

Level.add({
  name: { type: String, required: true },
  code: { type: String},
});

Level.relationship({ ref: 'Program', path: 'programs', refPath: 'level' });

Level.register();
