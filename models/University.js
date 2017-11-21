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
  status: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
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

  // http://www.4icu.org/ || https://www.niche.com || sa
  website: { type: Types.Url },

  acronym: { type: String },
  currency: { type: String },
  
  founded: { type: String },
  motto: { type: String },
  phone: { type: Types.TextArray },
  fax: { type: Types.TextArray },
  locations: { type: String },
  applicationDeadline: { type: Types.Date },
  applicationFee: { type: Types.Number },
  // FACTS & BADGES
  avgTuition: { type: String }, // 46,300
  totalCost: { type: String },
  acceptanceRate: { type: String }, // 25 %
  studentFacultyRatio: { type: String }, // 4:1
  RoomAndBoard: { type: String }, // 14,601
  financialAid: { type: String }, // 35,000 || yes
  studentClubs: { type: String }, // 650
  graduateEmployment: { type: String }, // 80%
  femaleMaleRatio: { type: String }, // 47:53
  scholarships: { type: String }, // 165,629,375
  outStudents: { type: String }, // 12.5% - International students
  //SIZE AND PROFILE
  students: { type: String }, // 25000 || over-45,000
  academicCalendar: { type: String }, // Semesters
  staff: { type: String }, // 2,500-2,999
  campusSetting: { type: String }, //  Urban
  controlType: { type: String }, // Private||Private
  religiousAffiliation: { type: String }, // None
  entityType: { type: String }, // Non-Profit
  eveningDegreeProgram: { type: Types.Boolean }, // -:https://www.niche.com/colleges/harvard-university/
  // TUITION
  BDtuitionIn: { type: String }, // $ 2,500-5,000  || 2,500-5,000 US$ (1,800-3,700 Euro) - 
  BDtuitionOut: { type: String }, //   
  MDtuitionIn: { type: String }, // In-State Tuition
  MDtuitionOut: { type: String }, // Out-of-State Tuition (International students)
  // PROGRAMS
  totalPrograms: { type: String }, // 48
  BDprograms: { type: Types.Relationship, ref: 'Program', many: true },
  MDprograms: { type: Types.Relationship, ref: 'Program', many: true },
  // ADMISSIONS
  admissionOffice: { type: String }, // 51 Dineen Drive Fredericton E3B 5G3+1 (506) 452 0532
  admissionRate: { type: String }, // 80-90%
  // value1-value2-value3 (value 1 is minimu & value 2 is averge & value 3 maximum)
  gmatRange: { type: String }, // value1-value2-value3 || value1-value3
  greRange: { type: String }, // value1-value2-value3 || value1-value3
  satRange: { type: String }, // 1400-1600 -:https://www.niche.com/colleges/harvard-university/
  actRange: { type: String }, // 32-35
  toeflRange: { type: String }, // value1-value2-value3 || value1-value3
  ieltsRange: { type: String }, // value1-value2-value3 || value1-value3
  gpaRange: { type: String }, // value1-value2-value3 || value1-value3

  // FACILITIES AND SERVICES
  library: { type: String }, // http://www.4icu.org/reviews/614.htm
  housing: { type: String },
  studyAbroad: { type: String },
  sportFacilities: { type: String },
  distanceLearning: { type: String },

  // RANKINGS
  timesWorldUniversity: { type: String }, // https://www.timeshighereducation.com/world-university-rankings  
  forbes: { type: String }, // https://www.forbes.com/top-colleges/list/
  macleans: { type: String }, // http://www.macleans.ca/education/unirankings/university-rankings-2017/
  completeUniversityGuide: { type: String }, // https://www.thecompleteuniversityguide.co.uk/
  financialTimes: { type: String }, // http://rankings.ft.com/businessschoolrankings/global-mba-ranking-2017
  qs: { type: String }, // https://www.topuniversities.com/university-rankings
  arwu: { type: String }, // http://www.shanghairanking.com/
  theEconomist: { type: String }, // http://www.economist.com/whichmba/full-time-mba-ranking
  usNewsNational: { type: String }, // https://www.usnews.com/best-colleges/rankings/national-universities  
  usNewsLiberal: { type: String }, // https://www.usnews.com/best-colleges/rankings/national-liberal-arts-colleges

  // ACCREDITATION AND RECOGNITION
  accreditations: { type: Types.TextArray }, // Foundation for Interior Design Education and Research (FIDER)

  // AFFILIATIONS AND MEMBERSHIPS
  affiliations: { type: Types.TextArray }, // Canadian Bureau for International Education (CBIE)

  // SOCIAL MEDIA
  facebook: { type: Types.Url }, // FB page url
  twitter: { type: Types.Url },
  linkedin: { type: Types.Url },
  instagram: { type: Types.Url },
  youtube: { type: Types.Url },
  vimeo: { type: Types.Url },

  // ONLINE COURSES
  itunes: { type: String },

  // WIKIPEDIA ARTICLE
  wikipedia: { type: Types.Url },

  // location: { type: Types.Location, defaults: { country: 'Australia' } },
  address: { type: String },
  city: { type: Types.Relationship, ref: 'UniversityCity' }, // don't many: true - as it is a slug value
  state: { type: Types.Relationship, ref: 'UniversityState' },
  country: { type: Types.Relationship, ref: 'UniversityCountry', many: true },
  region: { type: Types.Relationship, ref: 'Region' },
  publishedDate: { type: Date, default: Date.now }
});


/* A comma-delimited list of default columns to display in the Admin UI List View.  */
University.defaultColumns = 'name|30%, status|8%, address, website, founded|5%, country';
/**
 * Registration
 * ============
 */

University.register();