var moment = require('moment');
var _ = require('lodash');
var hbs = require('handlebars');
var hbsIntl = require('handlebars-intl');
var keystone = require('keystone');
var cloudinary = require('cloudinary');

// Collection of templates to interpolate
var linkTemplate = _.template('<a class="page-link" href="<%= url %>"><%= text %></a>');
var linkTemplateBlog = _.template('<a class="badge badge-secondary" href="<%= url %>"><%= text %></a>');
var scriptTemplate = _.template('<script src="<%= src %>"></script>');
var cssLinkTemplate = _.template('<link href="<%= href %>" rel="stylesheet">');

hbsIntl.registerWith(hbs);

module.exports = function () {

	var _helpers = {};


	/**
	 * Generic HBS Helpers
	 * ===================
	 */

	// standard hbs equality check, pass in two values from template
	// {{#ifeq keyToCheck data.myKey}} [requires an else blockin template regardless]
	_helpers.ifeq = function (a, b, options) {
		if (a == b) { // eslint-disable-line eqeqeq
			return options.fn(this);
		} else {
			return options.inverse(this);
		}
	};

	/**
	 * Port of Ghost helpers to support cross-theming
	 * ==============================================
	 *
	 * Also used in the default keystonejs-hbs theme
	 */

	// ### Date Helper
	// A port of the Ghost Date formatter similar to the keystonejs - pug interface
	//
	//
	// *Usage example:*
	// `{{date format='MM YYYY}}`
	// `{{date publishedDate format='MM YYYY'`
	//
	// Returns a string formatted date
	// By default if no date passed into helper than then a current-timestamp is used
	//
	// Options is the formatting and context check this.publishedDate
	// If it exists then it is formated, otherwise current timestamp returned

	_helpers.date = function (context, options) {
		if (!options && context.hasOwnProperty('hash')) {
			options = context;
			context = undefined;

			if (this.publishedDate) {
				context = this.publishedDate;
			}
		}

		// ensure that context is undefined, not null, as that can cause errors
		context = context === null ? undefined : context;

		var f = options.hash.format || 'MMM Do, YYYY';
		var timeago = options.hash.timeago;
		var date;

		// if context is undefined and given to moment then current timestamp is given
		// nice if you just want the current year to define in a tmpl
		if (timeago) {
			date = moment(context).fromNow();
		} else {
			date = moment(context).format(f);
		}
		return date;
	};

	// ### Category Helper
	// Ghost uses Tags and Keystone uses Categories
	// Supports same interface, just different name/semantics
	//
	// *Usage example:*
	// `{{categoryList categories separator=' - ' prefix='Filed under '}}`
	//
	// Returns an html-string of the categories on the post.
	// By default, categories are separated by commas.
	// input. categories:['tech', 'js']
	// output. 'Filed Undder <a href="blog/tech">tech</a>, <a href="blog/js">js</a>'

	_helpers.categoryList = function (categories, options) {
		// console.log("categories", categories);
		var autolink = _.isString(options.hash.autolink) && options.hash.autolink === 'false' ? false : true;
		var separator = _.isString(options.hash.separator) ? options.hash.separator : ', ';
		var prefix = _.isString(options.hash.prefix) ? options.hash.prefix : '';
		var suffix = _.isString(options.hash.suffix) ? options.hash.suffix : '';
		var output = '';

		function createTagList(tags) {
			var tagNames = _.map(tags, 'name');

			if (autolink) {
				return _.map(tags, function (tag) {
					// console.log("tag key blog", tag.key, tag.name);
					return linkTemplateBlog({
						url: ('/blog/' + tag.key),
						text: _.escape(tag.name),
					});
				}).join(separator);
			}
			return _.escape(tagNames.join(separator));
		}

		if (categories && categories.length) {
			output = prefix + createTagList(categories) + suffix;
		}
		return new hbs.SafeString(output);
	};

	/**
	 * KeystoneJS specific helpers
	 * ===========================
	 */

	// block rendering for keystone admin css
	_helpers.isAdminEditorCSS = function (user, options) {
		var output = '';
		if (typeof (user) !== 'undefined' && user.isAdmin) {
			output = cssLinkTemplate({
				href: '/keystone/styles/content/editor.min.css',
			});
		}
		return new hbs.SafeString(output);
	};

	// block rendering for keystone admin js
	_helpers.isAdminEditorJS = function (user, options) {
		var output = '';
		if (typeof (user) !== 'undefined' && user.isAdmin) {
			output = scriptTemplate({
				src: '/keystone/js/content/editor.js',
			});
		}
		return new hbs.SafeString(output);
	};

	// Used to generate the link for the admin edit post button
	_helpers.adminEditableUrl = function (user, options) {
		var rtn = keystone.app.locals.editable(user, {
			list: 'Post',
			id: options,
		});
		return rtn;
	};

	// ### CloudinaryUrl Helper
	// Direct support of the cloudinary.url method from Handlebars (see
	// cloudinary package documentation for more details).
	//
	// *Usage examples:*
	// `{{{cloudinaryUrl image width=640 height=480 crop='fill' gravity='north'}}}`
	// `{{#each images}} {{cloudinaryUrl width=640 height=480}} {{/each}}`
	//
	// Returns an src-string for a cloudinary image

	_helpers.cloudinaryUrl = function (context, options) {

		// if we dont pass in a context and just kwargs
		// then `this` refers to our default scope block and kwargs
		// are stored in context.hash
		if (!options && context.hasOwnProperty('hash')) {
			// strategy is to place context kwargs into options
			options = context;
			// bind our default inherited scope into context
			context = this;
		}

		// safe guard to ensure context is never null
		context = context === null ? undefined : context;

		if ((context) && (context.public_id)) {
			options.hash.secure = keystone.get('cloudinary secure') || false;
			var imageName = context.public_id.concat('.', context.format);
			return cloudinary.url(imageName, options.hash);
		}
		else {
			return null;
		}
	};

	// ### Content Url Helpers
	// KeystoneJS url handling so that the routes are in one place for easier
	// editing.  Should look at Django/Ghost which has an object layer to access
	// the routes by keynames to reduce the maintenance of changing urls

	// Direct url link to a specific post
	_helpers.postUrl = function (postSlug, options) {
		return ('/blog/post/' + postSlug + '/');
	};

	// create the category url for a blog-category page
	_helpers.categoryUrl = function (categorySlug, options) {
		return ('/blog/' + categorySlug + '/');
	};

	// might be a ghost helper
	// used for pagination urls on blog
	_helpers.pageUrl = function (pageNumber, options) {
		return '/?page=' + pageNumber; // /blog
	};

	/***********/

	// Direct url link to a specific university
	_helpers.universityUrl = function (region, country, state, city, universitySlug, options) {
		// some countries do not have city & state (eg: Singapore)
		// if (!city && !state) {
		// 	return ('/universities/' + region + '/' + country + '/' + universitySlug);
		// }
		// some countries do not have state (eg: new zealand(auckland))
		// if (!state) {
		// 	return ('/universities/' + region + '/' + country + '/' + city + '/' + universitySlug);
		// }

		if (!city || !state) {
			if (!city && !state) {
				return ('/universities/' + region + '/' + country + '/' + universitySlug + '/');
			} else if (!city) {
				return ('/universities/' + region + '/' + country + '/' + state + '/' + universitySlug + '/');
			} else if (!state) {
				return ('/universities/' + region + '/' + country + '/' + city + '/' + universitySlug + '/');
			}
		}

		return ('/universities/' + region + '/' + country + '/' + state + '/' + city + '/' + universitySlug + '/');
	};

	// country category
	_helpers.categoryCountryUrl = function (region, country, options) {
		return ('/universities/' + region + '/' + country + '/');
	};

	// For pagination - eg: http://localhost:3000/universities/
	_helpers.uniPageUrl = function (baseUrl, pageNumber, options) {
		console.log(baseUrl, pageNumber, options);
		return baseUrl + '/universities/?page=' + pageNumber;
	};

	// For pagination - eg: http://localhost:3000/universities/north-america/united-states/queensland/calgary/
	_helpers.uniPageDestinationUrl = function (baseUrl, pageNumber, region, country, state, city, options) {
		if (region && country && state && city) {
			return baseUrl + '/universities/' + region + '/' + country + '/' + state + '/' + city + '/?page=' + pageNumber;
		}
		else if (region && country && state) {
			return baseUrl + '/universities/' + region + '/' + country + '/' + state + '/?page=' + pageNumber;
		}
		else if (region && country && city) {
			return baseUrl + '/universities/' + region + '/' + country + '/' + city + '/?page=' + pageNumber;
		}
		else if (region && country) {
			return baseUrl + '/universities/' + region + '/' + country + '/?page=' + pageNumber;
		}
		else if (region) {
			return baseUrl + '/universities/' + region + '/?page=' + pageNumber;
		}
	};

	// Tests - academic & language
	_helpers.testUrl = function (categorySlug, options) {
		return ('/tests/' + categorySlug + '/');
	};

	// Study in 
	_helpers.studyDestinationtUrl = function (locationSlug, options) {
		return ('/study-abroad/' + locationSlug + '/');
	};

	// _helpers.courseUrl = function (courseSlug, options) {
	// 	return ('/courses/' + courseSlug + '/');
	// };
	// // For pagination 
	// _helpers.coursePageUrl = function (pageNumber, options) {
	// 	return '/courses/?page=' + pageNumber;
	// };

	/******************* */
	// ### Pagination Helpers
	// These are helpers used in rendering a pagination system for content
	// Mostly generalized and with a small adjust to `_helper.pageUrl` could be universal for content types

	/*
	* expecting the data.posts context or an object literal that has `previous` and `next` properties
	* ifBlock helpers in hbs - http://stackoverflow.com/questions/8554517/handlerbars-js-using-an-helper-function-in-a-if-statement
	* */
	_helpers.ifHasPagination = function (postContext, options) {
		// if implementor fails to scope properly or has an empty data set
		// better to display else block than throw an exception for undefined
		if (_.isUndefined(postContext)) {
			return options.inverse(this);
		}
		if (postContext.next || postContext.previous) {
			return options.fn(this);
		}
		return options.inverse(this);
	};

	_helpers.paginationNavigation = function (baseUrl, pages, currentPage, totalPages, source, region, country, state, city, options) {
		var html = '';
		// pages should be an array ex.  [1,2,3,4,5,6,7,8,9,10, '....']
		// '...' will be added by keystone if the pages exceed 10
		_.each(pages, function (page, ctr) {
			// create ref to page, so that '...' is displayed as text even though int value is required
			var pageText = page;
			// create boolean flag state if currentPage
			var isActivePage = ((page === currentPage) ? true : false);
			// need an active class indicator
			var liClass = ((isActivePage) ? ' class="page-item active"' : ' class="page-item"');

			// if '...' is sent from keystone then we need to override the url
			if (page === '...') {
				// check position of '...' if 0 then return page 1, otherwise use totalPages
				page = ((ctr) ? totalPages : 1);
			}

			// get the pageUrl||uniPageUrl using the integer value - 
			var pageUrl;
			if (source === "universities") {
				pageUrl = _helpers.uniPageUrl(baseUrl, page);
			} else if (source === "blog") {
				pageUrl = _helpers.pageUrl(baseUrl, page);
			} else if (source === "bydestination") {
				pageUrl = _helpers.uniPageDestinationUrl(baseUrl, page, region, country, state, city);
			} 
			// else if (source === "courses") {
			// 	pageUrl = _helpers.coursePageUrl(baseUrl, page);
			// }

			// wrapup the html
			html += '<li' + liClass + '>' + linkTemplate({ url: pageUrl, text: pageText }) + '</li>\n';
		});
		return html;
	};

	// special helper to ensure that we always have a valid page url set even if
	// the link is disabled, will default to page 1
	_helpers.paginationPreviousUrl = function (previousPage, totalPages) {
		if (previousPage === false) {
			previousPage = 1;
		}
		return _helpers.pageUrl(previousPage);
	};

	// special helper to ensure that we always have a valid next page url set
	// even if the link is disabled, will default to totalPages
	_helpers.paginationNextUrl = function (nextPage, totalPages) {
		if (nextPage === false) {
			nextPage = totalPages;
		}
		return _helpers.pageUrl(nextPage);
	};


	// HBS compare operator
	_helpers.checkIf = function (v1, o1, v2, mainOperator, v3, o2, v4, options) {
		var operators = {
			'==': function (a, b) { return a == b; },
			'===': function (a, b) { return a === b; },
			'!=': function (a, b) { return a != b; },
			'!==': function (a, b) { return a !== b; },
			'<': function (a, b) { return a < b; },
			'<=': function (a, b) { return a <= b; },
			'>': function (a, b) { return a > b; },
			'>=': function (a, b) { return a >= b; },
			'&&': function (a, b) { return a && b; },
			'||': function (a, b) { return a || b; },
		};
		var a1 = operators[o1](v1, v2);
		var a2 = operators[o2](v3, v4);
		var isTrue = operators[mainOperator](a1, a2);
		return isTrue ? options.fn(this) : options.inverse(this);
	};

	// https://stackoverflow.com/questions/8853396/logical-operator-in-a-handlebars-js-if-conditional
	// {{#or foo bar "" sally bob}} yup {{else}} nope {{/or}} // yup
	_helpers.or = function () {
		var args = Array.prototype.slice.call(arguments);
		var options = args[args.length - 1];

		for (var i = 0; i < args.length - 1; i++) {
			if (args[i]) {
				return options.fn(this);
			}
		}

		return options.inverse(this);
	};

	// https://stackoverflow.com/questions/14839375/boolean-logic-within-a-handlebars-template
	_helpers.ifCond = function (v1, operator, v2, options) {
		switch (operator) {
			case '==':
				return (v1 == v2) ? options.fn(this) : options.inverse(this);
			case '===':
				return (v1 === v2) ? options.fn(this) : options.inverse(this);
			case '<':
				return (v1 < v2) ? options.fn(this) : options.inverse(this);
			case '<=':
				return (v1 <= v2) ? options.fn(this) : options.inverse(this);
			case '>':
				return (v1 > v2) ? options.fn(this) : options.inverse(this);
			case '>=':
				return (v1 >= v2) ? options.fn(this) : options.inverse(this);
			case '&&':
				return (v1 && v2) ? options.fn(this) : options.inverse(this);
			case '||':
				return (v1 || v2) ? options.fn(this) : options.inverse(this);
			default:
				return options.inverse(this);
		}
	};

	// https://stackoverflow.com/questions/14492098/handlebars-function-to-format-currency-with-javascript
	_helpers.formatCurrency = function (value) {
		return value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
	};

	// https://formatjs.io/handlebars/#formatNumber
	// https://jonathanmh.com/handlebars-custom-helpers-chaining/
	_helpers.formatNumber = function (value) {
		value = parseInt(value);

		var context = {
			value: value
		};

		var intlData = {
			locales: ['en-US'],
		};
		// use the formatNumber helper from handlebars-intl
		var template = hbs.compile('{{formatNumber value}}');

		var compiled = template(context, {
			data: { intl: intlData }
		});

		return compiled;
	};

	/**Lowercase */
	_helpers.lowercase = function (str) {
		if (str && typeof str === "string") {
			return str.toLowerCase();
		}
		return '';
	};

	//  ### Flash Message Helper
	//  KeystoneJS supports a message interface for information/errors to be passed from server
	//  to the front-end client and rendered in a html-block.  FlashMessage mirrors the Pug Mixin
	//  for creating the message.  But part of the logic is in the default.layout.  Decision was to
	//  surface more of the interface in the client html rather than abstracting behind a helper.
	//
	//  @messages:[]
	//
	//  *Usage example:*
	//  `{{#if messages.warning}}
	//      <div class="alert alert-warning">
	//          {{{flashMessages messages.warning}}}
	//      </div>
	//   {{/if}}`

	_helpers.flashMessages = function (messages) {
		var output = '';
		for (var i = 0; i < messages.length; i++) {

			if (messages[i].title) {
				output += '<h4>' + messages[i].title + '</h4>';
			}

			if (messages[i].detail) {
				output += '<p>' + messages[i].detail + '</p>';
			}

			if (messages[i].list) {
				output += '<ul>';
				for (var ctr = 0; ctr < messages[i].list.length; ctr++) {
					output += '<li>' + messages[i].list[ctr] + '</li>';
				}
				output += '</ul>';
			}
		}
		return new hbs.SafeString(output);
	};


	//  ### underscoreMethod call + format helper
	//	Calls to the passed in underscore method of the object (Keystone Model)
	//	and returns the result of format()
	//
	//  @obj: The Keystone Model on which to call the underscore method
	//	@undescoremethod: string - name of underscore method to call
	//
	//  *Usage example:*
	//  `{{underscoreFormat enquiry 'enquiryType'}}

	_helpers.underscoreFormat = function (obj, underscoreMethod) {
		return obj._[underscoreMethod].format();
	};
	// console.log(_helpers)
	return _helpers;
};
