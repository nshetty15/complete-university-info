var keystone = require('keystone');
var Types = keystone.Field.Types;

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
  status: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
  brief: { type: Types.Html, wysiwyg: true, height: 150 },
  description: {type: Types.Html, wysiwyg: true, height: 300},
});

Level.relationship({ ref: 'Program', path: 'programs', refPath: 'level' });

Level.defaultColumns = 'name, code, description';

Level.register();
