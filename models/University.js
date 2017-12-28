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
  name: { type: String, requried: true },
  status: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },

  region: { type: Types.Relationship, ref: 'Region' },
  country: { type: Types.Relationship, ref: 'UniversityCountry' },
  state: { type: Types.Relationship, ref: 'UniversityState' },
  city: { type: Types.Relationship, ref: 'UniversityCity' },

  // http://www.4icu.org/ || https://www.niche.com || https://in.linkedin.com/edu/memorial-university-of-newfoundland-20062 || sa
  // ABOUT UNIVERSITY
  logo: { type: Types.CloudinaryImage, folder: 'logo', autoCleanup: true },
  // photo: { type: Types.CloudinaryImage, folder: 'photo', autoCleanup: true },
  address: { type: String, },
  // location: { type: Types.Location, defaults: { country: 'Australia' } },
  locations: { type: String, label: 'Other Locations' },
  website: { type: Types.Url },
  founded: { type: String },
  motto: { type: String },
  acronym: { type: String },
  phone: { type: Types.TextArray },
  // fax: { type: Types.TextArray },
  email: { type: Types.TextArray },
  janDate: { type: Types.Date, label: 'January Deadline', },
  mayDate: { type: Types.Date, label: 'May Deadline', },
  sepDate: { type: Types.Date, label: 'September Deadline', },
  appFee: { type: Types.Number, label: 'Application Fee', note: 'In numbers (convert to country currency)' },
  // currency: { type: String, label: 'Country Currency' },

  //content: {
  brief: { type: Types.Html, wysiwyg: true, height: 150 },
  extended: { type: Types.Html, wysiwyg: true, height: 400 },
  //},

  // FOR STUDENTS  -
  students: { type: String, label: 'Total Students', note: 'eg: 25000 || 35000+ || over 45000 || 10000-15000' },
  outStudents: { type: String, label: 'Total International Students', note: 'eg: 12.5% https://www.timeshighereducation.com/' },
  BDstudents: { type: String, label: 'Total Bachelors Students', note: 'eg: 82% || 14442 (https://www.topuniversities.com/universities/ || https://in.linkedin.com/edu/)' },
  MDstudents: { type: String, label: 'Total Masters Students', note: 'eg: 18% || 3565 (https://www.topuniversities.com/universities/ || https://in.linkedin.com/edu/)' },
  studentFaculty: { type: String, label: 'Student per staff', note: 'eg: 4.1 https://www.timeshighereducation.com/' },
  staff: { type: String, label: 'Total staffs', note: 'eg: 2500-2999 (https://in.linkedin.com/)' },
  femaleMale: { type: String, label: 'Female Male Ratio', note: 'eg: 47:53 https://www.timeshighereducation.com/' },
  // avgTuition: { type: String, label: 'Average Tuition (per year)', note: 'eg: 46300 (convert to country currency)' },
  // TUITION
  totalCost: { type: String, label: 'Total Annual Cost', note: 'eg: OVERALL COST OF LIVING (convert to country currency)' },
  campusAcc: { type: String, label: 'Campus Accomodation Cost', note: 'eg: CAMPUS ACCOMMODATION (https://www.hotcoursesabroad.com/india/newzealand/school-college-university/southern-institute-of-technology/142331/international.html)'},
  BDtuitionIn: { type: String, label: 'Bachelor Tuition(Residents)', note: 'eg: 5000  || 2500-5000 (find field: In-State Tuition)' },
  BDtuitionOut: { type: String, label: 'Bachelor Tuition(International students)', note: 'eg: https://www.hotcoursesabroad.com/ 5000  || 2500-5000 (find field: Out-of-State Tuition)' },
  MDtuitionIn: { type: String, label: 'Masters Tuition(Residents)', note: 'eg: 5000  || 2500-5000 (find field: In-State Tuition)' },
  MDtuitionOut: { type: String, label: 'Masters Tuition(International students)', note: 'eg: https://www.hotcoursesabroad.com/ 5000  || 2500-5000 (find field: Out-of-State Tuition)' },

  acceptRate: { type: String, label: 'Acceptance Rate', note: 'eg: 25%' },
  roomBoard: { type: String, label: 'Room and Board', note: 'eg: 14601' },
  financialAid: { type: String, label: 'financialAid', note: 'eg: 35,000 || yes' },
  studentClubs: { type: String, label: 'Student Clubs', note: 'eg: 650' },
  gradEmployee: { type: String, label: 'Graduate Employment Rate', note: 'eg: 80%' },
  scholarshipAmt: { type: String, label: '', note: 'eg: 165629375' },

  yearLevel: { type: String, label: 'Year Level', note: 'eg: Four or more Years' },
  academicCalendar: { type: String, label: '', note: 'eg: Semesters' },
  campusSetting: { type: String, label: '', note: 'eg: Urban || Rural || Regional' },
  controlType: { type: String, label: '', note: 'eg: Private || Public https://www.topuniversities.com/universities/' },
  religiousAffiliation: { type: String, label: 'Religious Affiliation', note: 'eg: None' },
  entityType: { type: String, label: 'Entity Type', note: 'eg: Non-Profit' },

  // PROGRAMS
  BDprograms: { type: Types.Relationship, ref: 'Program', many: true, label: 'Bachelors Programs' },
  BDprogramsCount: { type: String, label: 'Total Bachelor Programs', note: 'eg: 48 https://www.topuniversities.com/' },
  MDprograms: { type: Types.Relationship, ref: 'Program', many: true, label: 'Masters Programs' },
  MDprogramsCount: { type: String, label: 'Total Masters Programs', note: 'eg: 43 https://www.topuniversities.com/' },
  programs: { type: Types.Html, wysiwyg: true, height: 400, label: 'Bachelors & master programs', note: 'eg: https://www.timeshighereducation.com/ ' },
  eveningDegree: { type: Types.Boolean, label: 'Evening Degree Programs', note: 'eg: https://www.niche.com/colleges/harvard-university/' },

  // ACADEMIC & LANGUAGE TESTS
  BDtoefl: { type: String, label: 'TOEFL Bachelor', note: 'eg: value1-value2-value3 || value1-value3 || value1 (https://www.hotcoursesabroad.com/)' },
  MDtoefl: { type: String, label: 'TOEFL Masters', note: 'eg: value1-value2-value3 || value1-value3 || value1 (https://www.hotcoursesabroad.com/)' },
  BDielts: { type: String, label: 'IELTS Bachelor', note: 'eg: value1-value2-value3 || value1-value3 || value1 (https://www.hotcoursesabroad.com/)' },
  MDielts: { type: String, label: 'IELTS Masters', note: 'eg: value1-value2-value3 || value1-value3 || value1 (https://www.hotcoursesabroad.com/)' },
  BDpte: { type: String, label: 'PTE Bachelor', note: 'eg: value1-value2-value3 || value1-value3 || value1' },
  MDpte: { type: String, label: 'PTE Masters', note: 'eg: value1-value2-value3 || value1-value3 || value1' },
  gmat: { type: String, label: 'Gamat range', note: 'eg: (graduate management programs of business schools) value1-value2-value3  || value1-value3 (value 1 is minimum & value 2 is averge & value 3 maximum)' },
  gre: { type: String, label: 'GRE range', note: 'eg: (masters and doctoral degree programs : US) value1-value2-value3 || value1-value3' },
  sat: { type: String, label: 'SAT range', note: 'eg: (Bachelor:US) value1-value2-value3 -1400-1600-2020 || value1-value3 - https://www.niche.com/colleges/harvard-university/' },
  act: { type: String, label: 'ACT range', note: 'eg: (Bachelor:US) value1-value2-value3 || value1-value3 || value1' },
  gpa: { type: String, label: 'GPA score', note: 'eg: 4.0' },

  // Scholarships
  scholarships: { type: Types.Html, wysiwyg: true, height: 200, label: 'Scholarships', note: 'eg: Canadian Bureau for International Education (CBIE)' },

  // RANKINGS
  qs: { type: String, label: 'QS World University Rankings', note: 'eg:  https://www.topuniversities.com/university-rankings' }, //
  the: { type: String, label: 'THE(World University Rankings)', note: 'eg: https://www.timeshighereducation.com/world-university-rankings ' }, //  
  arwu: { type: String, label: 'ARWU', note: 'eg: http://www.shanghairanking.com/' },
  forbes: { type: String, label: 'Forbes', note: 'eg: https://www.forbes.com/top-colleges/list/' },
  macleans: { type: String, label: 'Macleans', note: 'eg: http://www.macleans.ca/education/unirankings/university-rankings-2017/' }, // 
  cug: { type: String, label: 'Complete University Guide', note: 'eg: https://www.thecompleteuniversityguide.co.uk/' }, // 
  ft: { type: String, label: 'Financial Times', note: 'eg: http://rankings.ft.com/businessschoolrankings/global-mba-ranking-2017' }, // 
  theEconomist: { type: String, label: 'The Economist', note: 'eg:  http://www.economist.com/whichmba/full-time-mba-ranking' }, //
  usNewsNational: { type: String, label: 'US News National', note: 'eg: https://www.usnews.com/best-colleges/rankings/national-universities  ' }, // 
  usNewsLiberal: { type: String, label: 'US News Liberal', note: 'eg: https://www.usnews.com/best-colleges/rankings/national-liberal-arts-colleges' }, // 

  // ADMISSIONS 
  admissionOffice: { type: String, label: 'Admission Office', note: 'eg: 51 Dineen Drive Fredericton E3B 5G3+1 (506) 452 0532' },
  admissionRate: { type: String, label: 'Admission Rate', note: 'eg: 80-90%' },

  // FACILITIES AND SERVICES
  library: { type: String }, // http://www.4icu.org/reviews/614.htm
  housing: { type: String },
  sports: { type: String, label: 'Sports Facility', note: 'eg: 4icu' },
  distanceLearning: { type: String, label: 'Distance Learning', note: 'eg: ' },

  // ACCREDITATION AND RECOGNITION
  accreditations: { type: Types.TextArray, label: '', note: 'eg: Foundation for Interior Design Education and Research (FIDER)' }, // eg: 

  // AFFILIATIONS AND MEMBERSHIPS
  affiliations: { type: Types.TextArray, label: '', note: 'eg: Canadian Bureau for International Education (CBIE)' }, // eg: 


  // SOCIAL MEDIA
  facebook: { type: Types.Url, label: 'Facebook page url' },
  twitter: { type: Types.Url },
  google: { type: Types.Url },
  linkedin: { type: Types.Url },
  instagram: { type: Types.Url },
  youtube: { type: Types.Url },
  // pinterest: { type: Types.Url },
  // flickr: { type: Types.Url }, // https://www.flickr.com/photos/rmit/with/39042495081/
  vimeo: { type: Types.Url },

  // ONLINE COURSES
  itunes: { type: String },

  // WIKIPEDIA ARTICLE
  // wikipedia: { type: Types.Url },

  // prepare in the backend - enable in case add custom text
  // meta: {
  //   title: { type: String, }, // under 70 characters
  //   description: { type: String }, // under 160 characters
  //   keywords: { type: String } // No more than 10 keyword phrases
  // },

  publishedDate: { type: Date, default: Date.now }
});


/* A comma-delimited list of default columns to display in the Admin UI List View.  */
University.defaultColumns = 'name|20%, status, address, website, founded, region, country, state, city';
/**
 * Registration
 * ============
 */

University.register();