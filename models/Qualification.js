var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Qualifications Model
 * ==========
 */
var Qualification = new keystone.List('Qualification', {
  map: {name: 'title'},
  singular:'Qualification',
  plural: 'Qualifications',
  autokey: {path: 'slug', from: 'title', unique: true}
});

Qualification.add({
  title: {type: String, requried: true},
  // Enable when page is avialble
  // meta: {
	// 	title: { type: String }, // under 70 characters
  //   description: { type: String }, // under 160 characters
  //   keywords: { type: String } // No more than 10 keyword phrases
	// },
  
  createdAt: {type: Date, default: Date.now}
});

Qualification.defaultColumns = 'title, createdAt';
Qualification.register();