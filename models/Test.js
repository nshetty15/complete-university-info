var keystone = require("keystone");
var Types = keystone.Field.Types;


/**
 * Tests Model
 * ==========
 */
var Test = new keystone.List('Test', {
	map: { name: 'title' },
	singular: 'Test',
  plural: 'Tests',
	autokey: { path: 'slug', from: 'title', unique: true },
});

Test.add({
	title: { type: String, required: true },
	image: { type: Types.CloudinaryImage },
	introduction: { type: Types.Html, wysiwyg: true, height: 150 },
	description: { type: Types.Html, wysiwyg: true, height: 250 },
	publishedDate: { type: Date, default: Date.now }
});

Test.register();

