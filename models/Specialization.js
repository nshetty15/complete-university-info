var keystone = require('keystone');
var Types = keystone.Field.Types;


/**
 * Specialization Model
 * ==========
 */

var Specialization = new keystone.List('Specialization', {
  map: { name: 'title' },
  singular: 'Specialization',
  plural: 'Specializations',
  autokey: { path: 'slug', from: 'title', unique: true },
});

Specialization.add({
  title: {type: String, requried: true},
  description: {type: Types.Html, wysiwyg: true, height: 300},
  //image: {type: Types.CloudinaryImage },
  createdAt: { type: Date, default: Date.now },
});

Specialization.relationship({ ref: 'Program', path: 'programs', refPath: 'specializations' });

Specialization.defaultColumns = 'title, description';
Specialization.register();