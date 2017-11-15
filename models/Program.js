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
  level: { type: Types.Relationship, ref: 'Level', many: true },
  discipline: {type: Types.Relationship, ref: 'Discipline' },
  // price: {type: Number},
  meta: {
		title: { type: String }, // under 70 characters
    description: { type: String }, // under 160 characters
    keywords: { type: String } // No more than 10 keyword phrases
	},
  //image: {type: Types.CloudinaryImage},
  intro: {type: Types.Html, wysiwyg: true, height: 100},
  structure: {type: Types.Html, wysiwyg: true, height: 200},
  intro_specialization: {type: Types.Html, wysiwyg: true, height: 200},
  specializations: {type: Types.Relationship, ref: 'Specialization', many: true},
  intro_career: {type: Types.Html, wysiwyg: true, height: 200},
  careers: {type: Types.Relationship, ref: 'Career', many: true},
  
  skills: {type: Types.TextArray},
  createdAt: {type: Date, default: Date.now}
});



Program.defaultColumns = 'title, level, discipline, skills';
Program.register();