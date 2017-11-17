var keystone = require('keystone');
var Types = keystone.Field.Types;


/**
 * Discipline Model
 * ==========
 */

var Discipline = new keystone.List('Discipline', {
  map: { name: 'title' },
  singular: 'Discipline',
  plural: 'Disciplines',
  autokey: { path: 'slug', from: 'title', unique: true },
});

Discipline.add({
  title: {type: String, requried: true},
  description: {type: Types.Html, wysiwyg: true, height: 300},
  //image: {type: Types.CloudinaryImage },
  createdAt: {type: Date, default: Date.now}
});
Discipline.relationship({ ref: 'Program', path: 'programs', refPath: 'discipline' });


Discipline.defaultColumns = 'title, description';
Discipline.register();