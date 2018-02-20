var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Course Model
 * ==========
 */
var Course = new keystone.List('Course', {
  map: {name: 'title'},
  singular:'Course',
  plural: 'Courses',
  autokey: {path: 'slug', from: 'title', unique: true}
});

Course.add({
  title: {type: String, requried: true},
  level: { type: Types.Relationship, ref: 'Level', many: true },
  discipline: {type: Types.Relationship, ref: 'Discipline', many: true },
  meta: {
		title: { type: String }, // under 70 characters
    description: { type: String }, // under 160 characters
    keywords: { type: String } // No more than 10 keyword phrases
	},
  image: {type: Types.CloudinaryImage},
  price: {type: Number},
  intro: {type: Types.Html, wysiwyg: true, height: 100},
  structure: {type: Types.Html, wysiwyg: true, height: 200},
  intro_specialization: {type: Types.Html, wysiwyg: true, height: 200},
  specializations: {type: Types.Relationship, ref: 'Specialization', many: true},
  intro_career: {type: Types.Html, wysiwyg: true, height: 200},
  careers: {type: Types.Relationship, ref: 'Career', many: true},
  
  skills: {type: Types.TextArray},
  createdAt: {type: Date, default: Date.now}
});

// https://www.topuniversities.com/courses/linguistics/guide

Course.defaultColumns = 'title, level, discipline, skills';
Course.register();