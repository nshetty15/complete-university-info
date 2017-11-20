var keystone = require('keystone');
var Types = keystone.Field.Types;


/**
 * University Model
 * ==========
 */
var University = new keystone.List('University', {
  map: { name: 'name' },
  singular: 'University',
  plural: 'Universities',
  autokey: { path: 'slug', from: 'name', unique: true },
  sortable: true,
  track: { createdAt: true, createdBy: true, updatedAt: true, updatedBy: true },
  defaultSort: '-createdAt'
});

University.add({
  state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
  author: { type: Types.Relationship, ref: 'User', index: true },
  meta: {
    // title: { type: String }, // under 70 characters
    description: { type: String }, // under 160 characters
    keywords: { type: String } // No more than 10 keyword phrases
  },

  name: { type: String, requried: true },
  logo: { type: Types.CloudinaryImage },
  //content: {
  brief: { type: Types.Html, wysiwyg: true, height: 150 },
  extended: { type: Types.Html, wysiwyg: true, height: 400 },
  //},
  address: { type: String },
  website: { type: Types.Url },
  acronym: { type: String },
  currency: { type: String },
  founded: { type: String },
  motto: { type: String },
  phone: { type: Types.TextArray },
  fax: { type: Types.TextArray },
  locations: { type: String },

  // FACTS & BADGES
  avgTuition: { type: String },
  acceptanceRate: {},

  // TUITION
  BDtuitionLocal: { type: String },
  BDtuitionInterntl: { type: String },
  MDtuitionLocal: { type: String },
  MDtuitionInterntl: { type: String },

  // PROGRAMS
  programsOffered: {},
  BDprograms: { type: Types.Relationship, ref: 'Program', many: true },
  MDprograms: { type: Types.Relationship, ref: 'Program', many: true },

  // ADMISSIONS
  admissionOffice: { type: String },
  admissionRate: { type: String },

  //SIZE AND PROFILE
  students: { type: String },
  academicCalendar: { type: String },
  staff: { type: String },
  campusSetting: { type: String },
  controlType: { type: String },
  religiousAffiliation: { type: String },
  entityType: { type: String },

  // FACILITIES AND SERVICES
  library: { type: String },
  financialAids: { type: String },
  housing: { type: String },
  studyAbroad: { type: String },
  sportFacilities: { type: String },
  distanceLearning: { type: String },

  // ACCREDITATION AND RECOGNITION
  accreditations : { type: Types.TextArray },

  // AFFILIATIONS AND MEMBERSHIPS
  affiliations: { type: Types.TextArray },

  // SOCIAL MEDIA
  facebook : { type: Types.Url },
  twitter : { type: Types.Url },
  linkedin : { type: Types.Url },
  instagram : { type: Types.Url },
  youtube : { type: Types.Url },
  vimeo : { type: Types.Url },

  // ONLINE COURSES
  itunes: {type: String},
 
  // WIKIPEDIA ARTICLE
  wikipedia : { type: Types.Url },
  
  
  // price: {type: Types.Money, format: '$0,0.00', currency: 'en-gb'},
  // location: { type: Types.Location, defaults: { country: 'Australia' } },
  // introduction: {type: Types.Html, wysiwyg: true, height: 300},
  // description: {type: Types.Html, wysiwyg: true, height: 300},
  // manyStrings: { type: Types.TextArray },

  city: { type: Types.Relationship, ref: 'UniversityCity' },
  state_province: { type: Types.Relationship, ref: 'UniversityState' },
  countryCategory: { type: Types.Relationship, ref: 'UniversityCountry', many: true },
  publishedDate: { type: Date, default: Date.now }
});


/* A comma-delimited list of default columns to display in the Admin UI List View.  */
University.defaultColumns = 'name, address, website, phone, founded, country';
/**
 * Registration
 * ============
 */

University.register();