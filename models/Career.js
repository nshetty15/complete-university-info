var keystone = require('keystone');
var Types = keystone.Field.Types;


/**
 * Career Model
 * ==========
 */

var Career = new keystone.List('Career', {
  map: { name: 'title' },
  singular: 'Career',
  plural: 'Careers',
  autokey: { path: 'slug', from: 'title', unique: true },
});

Career.add({
  title: {type: String, requried: true},
  description: {type: Types.Html, wysiwyg: true, height: 300},
  //image: {type: Types.CloudinaryImage },
  createdAt: { type: Date, default: Date.now },
});

Career.relationship({ ref: 'Program', path: 'programs', refPath: 'careers' });

Career.defaultColumns = 'title, description, createdAt|20%';
Career.register();