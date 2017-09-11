var keystone = require('keystone');
var Types = keystone.Field.Types;


/**
 * University Model
 * ==========
 */
var University = new keystone.List('University', { 
  map: { name: 'title'},
  singular: 'University', 
  plural: 'Universities',
  autokey: { path: 'slug', from: 'title', unique: true },
  sortable: true,
  track: { createdAt: true, createdBy: true, updatedAt: true, updatedBy: true },
  defaultSort: '-createdAt'
});

University.add({
  title: {type: String, requried: true},
  image: {type: Types.CloudinaryImage },
  price: {type: Types.Money, format: '$0,0.00', currency: 'en-gb'},
  address: {type: String},
  // programs: { type: Types.Relationship, ref: 'Program', many: true },
  website: {type: Types.Url},
  // location: { type: Types.Location, defaults: { country: 'Australia' } },
  introduction: {type: Types.Html, wysiwyg: true, height: 300},
  description: {type: Types.Html, wysiwyg: true, height: 300},
  //cityCategories: { type: Types.Relationship, ref: 'UniversityCity' },
  //stateCategory: { type: Types.Relationship, ref: 'UniversityState' },
  //countryCategory: { type: Types.Relationship, ref: 'UniversityCountry'},
  publishedDate: {type: Date, default: Date.now}
});


/**
 * Relationships
 * =============
 */
//University.relationship({ path: 'programs', ref: 'Program', refPath: 'author' });


/* A comma-delimited list of default columns to display in the Admin UI List View.  */
University.defaultColumns = 'title, address, website, location|20%';
/**
 * Registration
 * ============
 */

University.register();