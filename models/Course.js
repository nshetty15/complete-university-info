var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Course Model
 * ==========
 */
var Course = new keystone.List('Course', {
  map: { name: 'title' },
  singular: 'Course',
  plural: 'Courses',
  // autokey: { path: 'slug', from: 'title', unique: true }
});

Course.add({
  title: {type: String}, // , requried: true
  // meta: {
  // 	title: { type: String }, // under 70 characters - use title
  //   description: { type: String }, // under 160 characters - use intro
  //   keywords: { type: String } // No more than 10 keyword phrases
  // },
  university: { type: Types.Relationship, ref: 'University' },
  program: { type: Types.Relationship, ref: 'Program' }, // program
  level: { type: Types.Relationship, ref: 'Level' },
  discipline: { type: Types.Relationship, ref: 'Discipline' }, //, many: true
  qualification: { type: Types.Relationship, ref: 'Qualification', note: 'eg:https://www.educations.com/study-abroad/florida-institute-of-technology/bachelors-in-computer-science-181731 https://digital.ucas.com/courses/details?coursePrimaryId=d323774d-237f-4237-8986-0fdbf6b12573&academicYearId=2018' },

  // image: {type: Types.CloudinaryImage},
  start: { type: String, label: 'Start date', note: 'eg: January, May, July and August  http://study.unisa.edu.au/degrees/master-of-business-administration' },
  length: { type: String, label: 'Duration', note: 'eg: 4 years https://www.educations.com/study-abroad/florida-institute-of-technology/bachelors-in-computer-science-181731 ' },
  studyMode: { type: String, note: 'Full time/part time' },
  location: { type: String, note: 'or Campus - city west, Main Site' },
  fees: { type: Number, note: 'eg: Melbourne' },
  appDeadline: { type: Date, label: 'Application deadline', },
  intro: { type: Types.Html, wysiwyg: true, height: 100, label: 'Program Description', note: 'Program Description/Course details/How to apply' },
  requirements: { type: Types.Html, wysiwyg: true, note: 'ENGLISH LANGUAGE REQUIREMENTS| http://study.unisa.edu.au/degrees/master-of-business-administration' },

  // scholarships: {type: Types.Relationship, ref: 'Scholarship', note: 'https://studyabroad.shiksha.com/scholarships/bachelors-courses?ct=3&ss=241&sc=external&su=18'}
  createdAt: { type: Date, default: Date.now }
});

// https://www.topuniversities.com/courses/linguistics/guide

Course.defaultColumns = 'title, program, university, level, discipline, qualification';
Course.register();