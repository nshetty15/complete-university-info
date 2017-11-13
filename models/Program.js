var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Programs Model
 * ==========
 */
var Program = new keystone.List('Program', {
  map: {name: 'title'},
  singular:'Program',
  plural: 'Programs',
  autokey: {path: 'slug', from: 'title', unique: true}
});

Program.add({
  title: {type: String, requried: true},
  // price: {type: Number},
  meta: {
		title: { type: String }, // under 70 characters
		description: { type: String }, // under 160 characters
	},
  discipline: {type: Types.Relationship, ref: 'Discipline', index: true },
  description: {type: Types.Html, wysiwyg: true, height: 300},
  //image: {type: Types.CloudinaryImage},
  publishedDate: {type: Date, default: Date.now}
});



Program.defaultColumns = 'title, price';
Program.register();