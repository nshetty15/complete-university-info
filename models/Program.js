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
  // Enable when page is avialble
  // meta: {
	// 	title: { type: String }, // under 70 characters
  //   description: { type: String }, // under 160 characters
  //   keywords: { type: String } // No more than 10 keyword phrases
	// },
  image: {type: Types.CloudinaryImage},

  specializations: {type: Types.Relationship, ref: 'Specialization', many: true}, // ?? in doubt where this should go(to course??||program??)
  // careers: {type: Types.Relationship, ref: 'Career', many: true},
  skills: {type: Types.TextArray},

  createdAt: {type: Date, default: Date.now}
});

Program.defaultColumns = 'title, createdAt';
Program.register();