var keystone = require('keystone');
var Types = keystone.Field.Types;

var StudyDestination = new keystone.List('StudyDestination', {
  map: { name: 'name' },
  singular: 'StudyDestination',
  plural: 'StudyDestinations',
  autokey: { path: 'slug', from: 'name', unique: true },
});

StudyDestination.add({
  name: { type: String, requried: true, label: 'eg: Study in Canada' },
  meta: {
    title: { type: String }, // under 70 characters
    description: { type: String }, // under 160 characters
    keywords: { type: String } // No more than 10 keyword phrases
  },
  status: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
  image: {type: Types.CloudinaryImage },
  // cities, applications, fees & visas, Study, student  living, about, institutes,
  region: { type: Types.Relationship, ref: 'Region' }, 
  // country: { type: Types.Relationship, ref: 'UniversityCountry' },
  state: { type: Types.Relationship, ref: 'UniversityState' },
  city: { type: Types.Relationship, ref: 'UniversityCity' }, // don't many: true - as it is a slug value

  intro: { type: Types.Html, wysiwyg: true, height: 300 }, //
  overview: { type: Types.Html, wysiwyg: true, height: 300 },
  description: { type: Types.Html, wysiwyg: true, height: 300 },
  facts: {type: Types.TextArray},
  createdAt: { type: Date, default: Date.now },
});


/* A comma-delimited list of default columns to display in the Admin UI List View.  */
// StudyDestination.defaultColumns = 'name, status, address, region, country, state, city';

StudyDestination.register();