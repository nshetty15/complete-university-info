var keystone = require('keystone');
var Types = keystone.Field.Types;


/**
 * Discipline Model
 * ==========
 */

var Discipline = new keystone.List('Discipline', {
  map: { name: 'title' },
  singular: 'Program',
  plural: 'Programs',
  autokey: { path: 'slug', from: 'title', unique: true },
});

Discipline.add({
  title: {type: String, requried: true},
  description: {type: Types.Html, wysiwyg: true, height: 300},
  //image: {type: Types.CloudinaryImage },
});



Discipline.defaultColumns = 'title';
Discipline.register();