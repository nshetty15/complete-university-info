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
  discipline: {type: Types.Relationship, ref: 'Discipline', many: true },
  meta: {
		title: { type: String }, // under 70 characters
    description: { type: String }, // under 160 characters
    keywords: { type: String } // No more than 10 keyword phrases
	},
  image: {type: Types.CloudinaryImage},
  start: {type: String, label: 'Start date', note: 'eg: January, May, July and August  http://study.unisa.edu.au/degrees/master-of-business-administration' },
  length: {type: String, label: 'Duration', note: 'eg: 4 years https://www.educations.com/study-abroad/florida-institute-of-technology/bachelors-in-computer-science-181731 '}, 
  studyType: {type: String, note: 'Full time/part time'},
  location: {type: String, note: 'or Campus - city west'},
  fees: {type: String, note: 'eg: Melbourne'},
  appDeadline: {type: Date, label: 'Application deadline',},
  intro: {type: Types.Html, wysiwyg: true, height: 100 ,label: 'Program Description',},
  requirements: {type: Types.Html, wysiwyg: true, note: 'ENGLISH LANGUAGE REQUIREMENTS| http://study.unisa.edu.au/degrees/master-of-business-administration'},

  createdAt: {type: Date, default: Date.now}
});



Program.defaultColumns = 'title, level, discipline, skills';
Program.register();