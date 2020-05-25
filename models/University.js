/* eslint-disable linebreak-style */
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
	defaultSort: 'createdAt',
});

University.add({
	name: { type: String, requried: true },
	localName: { type: String, label: 'Alternate name' },
	status: { type: Types.Select, options: 'draft, approval, published, archived', default: 'draft', index: true },

	region: { type: Types.Relationship, ref: 'Region' },
	country: { type: Types.Relationship, ref: 'UniversityCountry' },
	state: { type: Types.Relationship, ref: 'UniversityState' },
	city: { type: Types.Relationship, ref: 'UniversityCity' },

  // http://www.4icu.org/ || https://www.niche.com || https://in.linkedin.com/edu/memorial-university-of-newfoundland-20062 || sa
  // ABOUT UNIVERSITY
	logo: { type: Types.CloudinaryImage, folder: '/university/logo', autoCleanup: true },
	photo: { type: Types.CloudinaryImage, folder: '/university/photo', autoCleanup: true },
	address: { type: String },
  // location: { type: Types.Location, defaults: { country: 'Australia' } },
	locations: { type: String, label: 'Other Locations' },
	website: { type: Types.Url, note: 'http:// || https://  - must' },
	founded: { type: String },
	motto: { type: String },
	acronym: { type: String },
	phone: { type: Types.TextArray },
  // fax: { type: Types.TextArray },
	email: { type: Types.TextArray },
  // janDate: { type: Types.Date, label: 'January Deadline', }, // x
  // mayDate: { type: Types.Date, label: 'May Deadline', }, // x
  // sepDate: { type: Types.Date, label: 'September Deadline', }, // x
	appDeadline: { type: String, label: 'Application Deadline', note: 'eg: https://www.usnews.com/best-colleges/university-of-michigan-9092 (, seperate dates)' },
	appFee: { type: Types.Number, label: 'Application Fee', note: 'In numbers (convert to country currency)' },
	intakes: { type: Types.TextArray, label: 'Program Intakes', note: 'February | July | October; Fall (September/October), Winter (December/January), Spring (March/April), Summer (June/July)' },
	serviceFee: { type: Types.Number, label: 'Service Fee', note: 'eg: http://school.cucas.edu.cn/China-University-of-Mining-and-Technology-1276/fee-structure/' },

	brief: { type: Types.Html, wysiwyg: true, height: 150 },
	extended: {
		type: Types.Html, wysiwyg: true, height: 400,
		note: 'About(history), education(faculties,disciplines,courses), research, services(career,library,medical,housing,student), student life(campus,sports facilities,student clubs) eg: https://www.mastersportal.com/universities/ ',
	},

  // FOR STUDENTS  -
	students: { type: String, label: 'Total Students', note: 'eg: 25000 || 35000+ || over 45000 || 10000-15000' },
	outStudents: { type: String, label: 'Total International Students', note: 'eg: 12.5% https://www.timeshighereducation.com/' },
	BDstudents: { type: String, label: 'Total Bachelors Students', note: 'eg: 82% || 14442 (https://www.topuniversities.com/universities/ || https://in.linkedin.com/edu/)' },
	MDstudents: { type: String, label: 'Total Masters Students', note: 'eg: 18% || 3565 (https://www.topuniversities.com/universities/ || https://in.linkedin.com/edu/)' },
	studentFaculty: { type: String, label: 'Student per staff', note: 'eg: 4.1 https://www.timeshighereducation.com/' },
	staff: { type: String, label: 'Total staffs', note: 'eg: 2500-2999 (https://in.linkedin.com/)' },
	femaleMale: { type: String, label: 'Female Male Ratio', note: 'eg: 47:53 https://www.timeshighereducation.com/' },

  // TUITION
	totalCost: { type: String, label: 'Total Annual Cost', note: 'eg: OVERALL COST OF LIVING (convert to country currency)' },
	campusAcc: { type: String, label: 'Campus Accomodation Cost', note: 'eg: CAMPUS ACCOMMODATION (https://www.hotcoursesabroad.com/india/newzealand/school-college-university/southern-institute-of-technology/142331/international.html)' },
	BDtuitionIn: { type: String, label: 'Bachelor Tuition(Residents)', note: 'eg: 5000  || 2500-5000 (find field: In-State Tuition)' },
	BDtuitionOut: { type: String, label: 'Bachelor Tuition(International students)', note: 'eg: https://www.hotcoursesabroad.com/ 5000  || 2500-5000 (find field: Out-of-State Tuition)' },
	MDtuitionIn: { type: String, label: 'Masters Tuition(Residents)', note: 'eg: 5000  || 2500-5000 (find field: In-State Tuition)' },
	MDtuitionOut: { type: String, label: 'Masters Tuition(International students)', note: 'eg: https://www.hotcoursesabroad.com/ 5000  || 2500-5000 (find field: Out-of-State Tuition)' },
  //
	acceptRate: { type: String, label: 'Acceptance Rate', note: 'eg: 25%' },
	roomBoard: { type: String, label: 'Room and Board', note: 'eg: 14601' },
	financialAid: { type: String, label: 'financialAid', note: 'eg: 35,000 || yes' },
	studentClubs: { type: String, label: 'Student Clubs', note: 'eg: 650' },
	gradEmployee: { type: String, label: 'Graduate Employment Rate', note: 'eg: 80%' },
	scholarshipAmt: { type: String, label: 'scholarship Amount', note: 'eg: 165629375' },
	researchOutput: { type: String, label: 'Research Output', note: 'eg:Very high,low... https://www.topuniversities.com/universities/boston-university' },
  //
	yearLevel: { type: String, label: 'Year Level', note: 'eg: Four or more Years' },
	academicCalendar: { type: String, label: '', note: 'eg: Semesters' },
	campusSetting: { type: String, label: '', note: 'eg: Urban || Rural || Regional' },
	controlType: { type: String, label: '', note: 'eg: Private || Public https://www.topuniversities.com/universities/' },
	religiousAffiliation: { type: String, label: 'Religious Affiliation', note: 'eg: None' },
	entityType: { type: String, label: 'Entity Type', note: 'eg: Non-Profit' },

  // PROGRAMS
  // BDprograms: { type: Types.Relationship, ref: 'Program', many: true, label: 'Bachelors Programs' },
  // MDprograms: { type: Types.Relationship, ref: 'Program', many: true, label: 'Masters Programs' },

	programs: { type: Types.Html, wysiwyg: true, height: 400, label: 'Bachelors & master programs', note: 'eg: https://www.timeshighereducation.com/ ' },
	noBD: { type: Types.Boolean, label: 'Bachelors not available' },
	noMD: { type: Types.Boolean, label: 'Masters not available' },
	mba: { type: Types.Boolean, label: 'MBA', note: 'For Business schools: https://www.forbes.com/business-schools/#3920da686d6d' },
	online: { type: Types.Boolean, label: 'Online programs available' },
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
	act: { type: String, label: 'ACT range', note: 'eg: (Bachelor:US) ' },
	gpa: { type: String, label: 'GPA score', note: 'eg: 4.0' },

  // Scholarships
	scholarships: { type: Types.Html, wysiwyg: true, height: 200, label: 'Scholarships', note: 'eg: Canadian Bureau for International Education (CBIE)' },

  // RANKINGS
	qs: { type: Types.Number, label: 'QS World University Rankings', note: 'eg:  https://www.topuniversities.com/university-rankings' }, //
	the: { type: Types.Number, label: 'THE(World University Rankings)', note: 'eg: https://www.timeshighereducation.com/world-university-rankings ' }, //
	arwu: { type: Types.Number, label: 'ARWU', note: 'eg: http://www.shanghairanking.com/' },
	forbes: { type: Types.Number, label: 'Forbes', note: 'eg: https://www.forbes.com/top-colleges/list/' },
	macleans: { type: Types.Number, label: 'Macleans', note: 'eg: http://www.macleans.ca/education/unirankings/university-rankings-2017/' }, //
	cug: { type: Types.Number, label: 'Complete University Guide', note: 'eg: https://www.thecompleteuniversityguide.co.uk/' }, //
	ft: { type: Types.Number, label: 'Financial Times', note: 'eg: http://rankings.ft.com/businessschoolrankings/global-mba-ranking-2017' }, //
	theEconomist: { type: Types.Number, label: 'The Economist', note: 'eg:  http://www.economist.com/whichmba/full-time-mba-ranking' }, //
	usNewsNational: { type: Types.Number, label: 'US News National', note: 'eg: https://www.usnews.com/best-colleges/rankings/national-universities  ' }, //
	usNewsLiberal: { type: Types.Number, label: 'US News Liberal', note: 'eg: https://www.usnews.com/best-colleges/rankings/national-liberal-arts-colleges' }, //

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
	google: { type: Types.Url, label: 'Google+' },
	linkedin: { type: Types.Url },
	instagram: { type: Types.Url },
	youtube: { type: Types.Url },
	pinterest: { type: Types.Url },
	flickr: { type: Types.Url }, // https://www.flickr.com/photos/rmit/with/39042495081/
	vimeo: { type: Types.Url },
	snapchat: { type: Types.Url },

	// youtubeID: { type: String, label: 'Youtube page', note: 'eg: 4icu' },
	gmapLat: { type: Types.Number, label: 'maps latitude' },
	gmapLng: { type: Types.Number, label: 'maps longitude' },

  // ONLINE COURSES
	itunes: { type: String },

  // notable alumni
	alumni: { type: Types.TextArray, label: 'Notable Alumni' },

  // WIKIPEDIA ARTICLE
  // wikipedia: { type: Types.Url },

  // prepare in the backend - enable in case add custom text
  // meta: {
  //   title: { type: String, }, // under 70 characters
  //   description: { type: String }, // under 160 characters
  //   keywords: { type: String } // No more than 10 keyword phrases
  // },
	theUrl: { type: String, label: 'THE URL', note: 'Times higher education URL related to this profile' },
	qsUrl: { type: String, label: 'QS URL', note: 'Top universities URL related to this profile' },
	qsUrlOld: { type: String, label: 'QS URL old', note: 'Another url with /node/230392' },
	hcaUrl: { type: String, label: 'HCA URL', note: 'Hot Course abroad URL related to this profile' },
	cugUrl: { type: String, label: 'TCUG URL', note: 'The Complete University Guide URL related to this profile' },
	forbesUrl: { type: String, label: 'Forbes URL', note: 'Forbes URL related to this profile' },
	arwuUrl: { type: String, label: 'ARWU URL', note: 'Shanghai Ranking URL related to this profile' },

	isShared: { type: Types.Boolean, note: 'Shared on social -FB,twitter,Insta,Google+' },
	score: { type: Types.Number, note: 'Rendering order in /universities/ page; score range 0-100' },
  // canonical: {type: String, label: 'Canonical URL', note: 'eg: /universities/europe/germany/lower-saxony/hannover/leibniz-university-of-hanover/'},
	note: { type: Types.Html, wysiwyg: true, height: 50, label: 'Note', note: 'Other information/Comments (incase archived,if found duplicate). Wont be published on the website' },
	publishedDate: { type: Date, default: Date.now },
});


/* A comma-delimited list of default columns to display in the Admin UI List View.  */
University.defaultColumns = 'name|20%, status, address, website, founded|6%, region, country, state, city, isShared|3%';
// University.defaultColumns = 'name|20%, status|5%, address, motto, acronym|10%';
/**
 * Registration
 * ============
 */

// University.schema.pre('save', function (next) {
//   this.score = 10;
//   console.log(this.region);
//   next();
// });

University.register();
