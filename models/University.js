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
    title: { type: String }, // under 70 characters
    description: { type: String }, // under 160 characters
    keywords: { type: String } // No more than 10 keyword phrases
  },

  name: { type: String, requried: true },
  logo: { type: Types.CloudinaryImage, folder: 'logo', autoCleanup: true, uploadOptions: { use_filename: true }  },
  // location: { type: Types.Location, defaults: { country: 'Australia' } },
  address: { type: String,  },
  region: { type: Types.Relationship, ref: 'Region' },
  country: { type: Types.Relationship, ref: 'UniversityCountry' },
  state: { type: Types.Relationship, ref: 'UniversityState' },
  city: { type: Types.Relationship, ref: 'UniversityCity' }, 

  //content: {
  brief: { type: Types.Html, wysiwyg: true, height: 150 },
  extended: { type: Types.Html, wysiwyg: true, height: 400 },
  //},

  // http://www.4icu.org/ || https://www.niche.com || https://in.linkedin.com/edu/memorial-university-of-newfoundland-20062 || sa
  // ABOUT UNIVERSITY
  website: { type: Types.Url },
  founded: { type: String },
  janDate: { type: Types.Date, label: 'January Deadline',  },
  mayDate: { type: Types.Date, label: 'May Deadline',  },
  sepDate: { type: Types.Date, label: 'September Deadline',  },
  appFee: { type: Types.Number, label: 'Application Fee', note: 'In numbers' },
  phone: { type: Types.TextArray },
  fax: { type: Types.TextArray },
  email: { type: Types.TextArray },
  locations: { type: String, label: 'Other Locations' },
  motto: { type: String },
  acronym: { type: String },
  currency: { type: String, label: 'Country Currency' },

  // FOR STUDENTS  -
  students: { type: String, label: 'Total Students', note: 'eg: 25000 || over 45000'  },  
  outStudents: { type: String, label: 'Total International Students', note: 'eg: 12.5%' }, 
  BDstudents: { type: String, label: 'Bachelors Degree Students', note: 'eg: 14442 (https://in.linkedin.com/edu/memorial-university-of-newfoundland-20062)' }, 
  MDstudents: { type: String, label: 'Masters Degree Students', note: 'eg: 3565' }, 
  avgTuition: { type: String, label: 'Average Tuition (per year)', note: 'eg: 46300' }, 
  totalCost: { type: String, label: 'Total Annual Cost', note: 'eg: ' },  
  acceptRate: { type: String, label: 'Acceptance Rate', note: 'eg: 25%' }, 
  staff: { type: String, label: 'Number of staffs', note: 'eg: 2500-2999' }, 
  studentFaculty: { type: String, label: 'Student Faculty Ratio', note: 'eg: 4:1' }, 
  roomBoard: { type: String, label: 'Room and Board', note: 'eg: 14601' },  
  femaleMale: { type: String, label: 'Female Male Ratio', note: 'eg: 47:53' }, 

  financialAid: { type: String, label: 'financialAid', note: 'eg: 35,000 || yes' },  
  studentClubs: { type: String, label: 'Student Clubs', note: 'eg: 650' }, 
  gradEmployee: { type: String, label: 'Graduate Employment Rate', note: 'eg: 80%' },
  scholarships: { type: String, label: '', note: 'eg: 165629375' }, 
  yearLevel: { type: String, label: 'Year Level', note: 'eg: Four or more Years' }, 
  academicCalendar: { type: String, label: '', note: 'eg: Semesters' },  
  campusSetting: { type: String, label: '', note: 'eg: Urban' },  
  controlType: { type: String, label: '', note: 'eg: Private || Public' }, 
  religiousAffiliation: { type: String, label: 'Religious Affiliation', note: 'eg: None' },  
  entityType: { type: String, label: 'Entity Type', note: 'eg: Non-Profit' }, 
  
  // FACILITIES AND SERVICES
  library: { type: String }, // http://www.4icu.org/reviews/614.htm
  housing: { type: String },
  // studyAbroad: { type: String },
  sports: { type: String , label: 'Sports Facility', note: 'eg: 4icu'},
  distanceLearning: { type: String, label: 'Distance Learning', note: 'eg: '},

  // TUITION
  BDtuitionIn: { type: String, label: 'Bachelors Degree Tuition(Residents)', note: 'eg: 5000  || 2500-5000 (find field: In-State Tuition)' },  
  BDtuitionOut: { type: String, label: 'Bachelors Degree Tuition(International students)', note: 'eg: 5000  || 2500-5000 (find field: Out-of-State Tuition)' }, 
  MDtuitionIn: { type: String, label: 'Masters Degree Tuition(Residents)', note: 'eg: 5000  || 2500-5000 (find field: In-State Tuition)' }, 
  MDtuitionOut: { type: String, label: 'Masters Degree Tuition(International students)', note: 'eg: 5000  || 2500-5000 (find field: Out-of-State Tuition)' }, 

  // PROGRAMS
  BDprograms: { type: Types.Relationship, ref: 'Program', many: true, label: 'Bachelors Degree Programs' },
  BDprogramsCount: { type: String , label: 'Total Bachelors Degree Programs', note: 'eg: 48'}, 
  MDprograms: { type: Types.Relationship, ref: 'Program', many: true, label: 'Masters Degree Programs' },
  MDprogramsCount: { type: String , label: 'Total Masters Degree Program', note: 'eg: 43'}, 
  programs: { type: Types.Html, wysiwyg: true, height: 400, label: 'Bachelors & master programs', note: 'eg: for time being ' }, 
  eveningDegree: { type: Types.Boolean, label: 'Evening Degree Programs', note: 'eg: https://www.niche.com/colleges/harvard-university/' }, 

  // ADMISSIONS (adm==admission)
  admissionOffice: { type: String, label: 'Admission Office', note: 'eg: 51 Dineen Drive Fredericton E3B 5G3+1 (506) 452 0532' }, 
  admissionRate: { type: String, label: 'Admission Rate', note: 'eg: 80-90%' }, // 

  // ACADEMIC & LANGUAGE TESTS
  // 
  gmatRange: { type: String, label: 'Gamat Range', note: 'eg: value1-value2-value3 (value 1 is minimum & value 2 is averge & value 3 maximum)' }, 
  greRange: { type: String, label: 'GRE range', note: 'eg: value1-value2-value3 || value1-value3' }, 
  satRange: { type: String, label: '', note: 'eg: value1-value2-value3 -1400-1600-2020 || value1-value3 - https://www.niche.com/colleges/harvard-university/' }, 
  actRange: { type: String, label: '', note: 'eg: value1-value2-value3 || value1-value3' }, // 32-35
  toeflRange: { type: String, label: '', note: 'eg: value1-value2-value3 || value1-value3' }, // 
  ieltsRange: { type: String, label: '', note: 'eg: value1-value2-value3 || value1-value3' }, // value1-value2-value3 || value1-value3
  gpaRange: { type: String, label: '', note: 'eg: value1-value2-value3 || value1-value3' }, // value1-value2-value3 || value1-value3


  // RANKINGS
  timesWorldUniversity: { type: String, label: 'Times World University', note: 'eg: https://www.timeshighereducation.com/world-university-rankings ' }, //  
  qs: { type: String, label: 'QS', note: 'eg:  https://www.topuniversities.com/university-rankings' }, //
  forbes: { type: String, label: 'Forbes', note: 'eg: https://www.forbes.com/top-colleges/list/' }, // 
  macleans: { type: String, label: 'Macleans', note: 'eg: http://www.macleans.ca/education/unirankings/university-rankings-2017/' }, // 
  completeUniversityGuide: { type: String, label: 'Complete University Guide', note: 'eg: https://www.thecompleteuniversityguide.co.uk/' }, // 
  financialTimes: { type: String, label: 'Financial Times', note: 'eg: http://rankings.ft.com/businessschoolrankings/global-mba-ranking-2017' }, // 
  arwu: { type: String, label: 'ARWU', note: 'eg: http://www.shanghairanking.com/' }, // 
  theEconomist: { type: String, label: 'The Economist', note: 'eg:  http://www.economist.com/whichmba/full-time-mba-ranking' }, //
  usNewsNational: { type: String, label: 'US News National', note: 'eg: https://www.usnews.com/best-colleges/rankings/national-universities  ' }, // 
  usNewsLiberal: { type: String, label: 'US News Liberal', note: 'eg: https://www.usnews.com/best-colleges/rankings/national-liberal-arts-colleges' }, // 

  // ACCREDITATION AND RECOGNITION
  accreditations: { type: Types.TextArray, label: '', note: 'eg: Foundation for Interior Design Education and Research (FIDER)' }, // eg: 

  // AFFILIATIONS AND MEMBERSHIPS
  affiliations: { type: Types.TextArray, label: '', note: 'eg: Canadian Bureau for International Education (CBIE)' }, // eg: 

  // SOCIAL MEDIA
  facebook: { type: Types.Url, label: 'FB page url(University)', note: 'eg: https://www.facebook.com/Harvard/' }, 
  twitter: { type: Types.Url },
  google: { type: Types.Url },
  linkedin: { type: Types.Url },
  instagram: { type: Types.Url },
  youtube: { type: Types.Url },
  vimeo: { type: Types.Url },

  // ONLINE COURSES
  itunes: { type: String },

  // WIKIPEDIA ARTICLE
  // wikipedia: { type: Types.Url },

  publishedDate: { type: Date, default: Date.now }
});


/* A comma-delimited list of default columns to display in the Admin UI List View.  */
University.defaultColumns = 'name, status, address, website, founded, region, country, state, city';
/**
 * Registration
 * ============
 */

University.register();