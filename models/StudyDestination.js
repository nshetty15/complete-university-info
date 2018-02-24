var keystone = require('keystone');
var Types = keystone.Field.Types;

var StudyDestination = new keystone.List('StudyDestination', {
  map: { name: 'name' },
  singular: 'StudyDestination',
  plural: 'StudyDestinations',
  autokey: { path: 'slug', from: 'name', unique: true },
});

StudyDestination.add({
  name: { type: String, requried: true },
  status: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
  meta: {
    title: { type: String }, // under 70 characters
    description: { type: String }, // under 160 characters
    keywords: { type: String } // No more than 10 keyword phrases
  },
  image: {type: Types.CloudinaryImage, folder: 'destination', autoCleanup: true },
  // region: { type: Types.Relationship, ref: 'Region' }, 
  country: { type: Types.Relationship, ref: 'UniversityCountry' }, // currently enabled
  // state: { type: Types.Relationship, ref: 'UniversityState' },
  // city: { type: Types.Relationship, ref: 'UniversityCity' }, // don't many: true - as it is a slug value
  brief: { type: Types.Html, wysiwyg: true, height: 150, }, 
  about: { type: Types.Html, wysiwyg: true, height: 300, label: 'About destination'},
  education: { type: Types.Html, wysiwyg: true, height: 300, label: 'Education system', note: '' }, //
  options: { type: Types.Html, wysiwyg: true, height: 300, label: 'Study Options' },
  cost: { type: Types.Html, wysiwyg: true, height: 300, label: 'Cost of study & living' },
  visa: { type: Types.Html, wysiwyg: true, height: 300, label: 'Visa Requirements' },
  scholarships: { type: Types.Html, wysiwyg: true, height: 300, label: 'Available Scholarships' },
  misc: { type: Types.Html, wysiwyg: true, height: 150, label: 'Miscellaneous' },
  facts: {type: Types.TextArray, label: '', note: 'eg: fast facts https://www.topuniversities.com/where-to-study/north-america/canada/guide'}, // right side panel may be
  isShared: { type: Types.Boolean, label: 'Shared on social -FB,twitter,Insta,Google+', },
  createdAt: { type: Date, default: Date.now },
});


/* A comma-delimited list of default columns to display in the Admin UI List View.  */
StudyDestination.defaultColumns = 'name, status, country';

StudyDestination.register();