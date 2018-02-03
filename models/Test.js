var keystone = require("keystone");
var Types = keystone.Field.Types;


/**
 * Tests Model
 * ==========
 */
var Test = new keystone.List('Test', {
	map: { name: 'name' },
	singular: 'Test',
  plural: 'Tests',
	autokey: { path: 'slug', from: 'name', unique: true },
});

Test.add({
	name: { type: String, required: true },
	status: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	meta: {
		title: { type: String }, // under 70 characters
		description: { type: String }, // under 160 characters
		keywords: { type: String } // No more than 10 keyword phrases
	},
	image: {  type: Types.CloudinaryImage, folder: 'tests', autoCleanup: true  },
	introduction: { type: Types.Html, wysiwyg: true, height: 150 },
	description: { type: Types.Html, wysiwyg: true, height: 250 },
	inshort: { type: Types.Html, wysiwyg: true, height: 250 },
	publishedDate: { type: Date, default: Date.now }
});

Test.defaultColumns = 'name, publishedDate';

Test.register();

