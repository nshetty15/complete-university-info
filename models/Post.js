var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Post = new keystone.List('Post', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

Post.add({
	title: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	meta: {
		title: { type: String }, // under 70 characters
		description: { type: String }, // under 160 characters
		keywords: { type: String } // No more than 10 keyword phrases
	},
	image: { type: Types.CloudinaryImage, folder: 'blog', autoCleanup: true  },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
	},
	categories: { type: Types.Relationship, ref: 'PostCategory', many: true },
	isShared: { type: Types.Boolean, label: 'Shared on social -FB,twitter,Insta,Google+', },
});

Post.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

// https://nodevision.com.au/blog/post/tutorial-blogging-with-nodejs-and-keystone-cms
Post.schema.virtual('fullPostUrl').get(function () {
	return keystone.get('base url') + '/blog/post/' + this.slug;
});

Post.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Post.register();
