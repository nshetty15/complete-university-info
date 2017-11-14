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
  state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
  author: { type: Types.Relationship, ref: 'User', index: true },
	meta: {
		title: { type: String }, // under 70 characters
    description: { type: String }, // under 160 characters
    keywords: { type: String } // No more than 10 keyword phrases
	},
  title: { type: String, requried: true },
  image: { type: Types.CloudinaryImage },
  
  currency: { type: Types.TextArray },
  //price: {type: Types.Money, format: '$0,0.00', currency: 'en-gb'},
  address: { type: String },
  // programs: { type: Types.Relationship, ref: 'Program', many: true },
  website: {type: Types.Url},
  // location: { type: Types.Location, defaults: { country: 'Australia' } },
  introduction: {type: Types.Html, wysiwyg: true, height: 300},
  description: {type: Types.Html, wysiwyg: true, height: 300},
  //manyStrings: { type: Types.TextArray },
  
  //cityCategory: { type: Types.Relationship, ref: 'UniversityCity' },
  //stateCategory: { type: Types.Relationship, ref: 'UniversityState' },
  countryCategory: { type: Types.Relationship, ref: 'UniversityCountry', many: true },
  publishedDate: {type: Date, default: Date.now}
});


/* A comma-delimited list of default columns to display in the Admin UI List View.  */
University.defaultColumns = 'title, address, website, location|20%, state';
/**
 * Registration
 * ============
 */

University.register();