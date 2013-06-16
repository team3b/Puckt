// NOTE: remember to set your CLOSURE_PATH environment variable
// to the directory containing the closure compiler.

// Import required modules
var   fs = require('fs'),
	path = require('path');

// Define grunt module
module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// Directories required in the build process
		dirs: {
			// The repository's root directory
			root: __dirname,
			// The source directory
			src: 'src',
			// The source directory containing third party assets
			vendorSrc: '<%= dirs.src %>/vendor',
			// The intermediate build directory
			intermediate: 'intermediate',
			// The final build directory
			publish: 'publish'
		},

		// Configure mkdir task
		mkdir: {
			publish_js: '<%= dirs.root %>/<%= dirs.publish %>/js'
		},

		// Configure clean task
		clean: ['<%= dirs.intermediate %>', '<%= dirs.publish %>'],

		// Configure copy task
		copy: {
			build: {
				files: [{
					src: ['<%= dirs.src %>/index.html'],
					dest: '<%= dirs.intermediate %>/index.html'
				},{
					expand: true,
					cwd: '<%= dirs.src %>',
					src: ['js/**/*.js'],
					dest: '<%= dirs.intermediate %>'
				},
				{
					expand: true,
					cwd: '<%= dirs.src %>',
					src: ['css/**/*.css'],
					dest: '<%= dirs.intermediate %>'
				},
				{
					expand: true,
					cwd: '<%= dirs.src %>',
					src: ['vendor/**/*.*'],
					dest: '<%= dirs.intermediate %>'
				},
				{
					expand: true,
					cwd: '<%= dirs.src %>',
					src: ['levels/**/*.json'],
					dest: '<%= dirs.intermediate %>'
				}]
			},
			publish: {
				files: [{
					expand: true,
					cwd: '<%= dirs.intermediate %>',
					src: ['js/*.game.js'],
					dest: '<%= dirs.publish %>'
				},
				{
					expand: true,
					cwd: '<%= dirs.intermediate %>',
					src: ['css/*.game.css'],
					dest: '<%= dirs.publish %>'
				},
				{
					expand: true,
					cwd: '<%= dirs.intermediate %>',
					src: ['levels/**/*.json'],
					dest: '<%= dirs.publish %>'
				},
				{
					expand: true,
					cwd: '<%= dirs.intermediate %>',
					src: ['js/*.3p.js'],
					dest: '<%= dirs.publish %>'
				},
				{
					expand: true,
					cwd: '<%= dirs.src %>',
					src: ['vendor/**/*.*'],
					dest: '<%= dirs.publish %>'
				},
				{
					expand: true,
					cwd: '<%= dirs.src %>',
					src: ['img/**/*.*'],
					dest: '<%= dirs.publish %>'
				},
				{
					expand: true,
					cwd: '<%= dirs.src %>',
					src: ['audio/**/*.*'],
					dest: '<%= dirs.publish %>'
				}]
			}
		},

		// Configure useminPrepare task
		useminPrepare: {
			html: '<%= dirs.intermediate %>/index.html',
			options: {
				dest: '<%= dirs.intermediate %>'
			}
		},

		// Configure usemin task
		usemin: {
			html: '<%= dirs.intermediate %>/index.html',
			options: {
				dirs: ['<%= dirs.intermediate %>', '<%= dirs.publish %>'],
				basedir: '<%= dirs.intermediate %>'
			}
		},

		// Configure cssmin task
		cssmin: {
		},

		// Configure htmlmin task
		htmlmin: {
			publish: {
				options: {
					removeComments: true,
					collapseWhitespace: true,
					collapseBooleanAttributes: true,
					removeAttributeQuotes: true,
					removeRedundantAttributes: true,
					removeEmptyAttributes: true,
					removeOptionalTags: true
				},
				files: {
					'<%= dirs.publish %>/index.html': '<%= dirs.intermediate %>/index.html'
				}
			}
		},

		// Configure uglify task
		uglify: {
		},

		// Configure concat task
		concat: {
		},

		// Congigue json-minify task
		'json-minify': {
			publish: {
				files: '<%= dirs.intermediate %>/levels/**/*.json'
			}
		},

		// Configure rev task
		rev: {
			assets: {
				files: [{
					src: [
						'<%= dirs.intermediate %>/js/game.js',
						'<%= dirs.intermediate %>/css/game.css',
						'<%= dirs.intermediate %>/js/3p.js'
					]
				}]
			},
			options: {}
		},

		// Configure rename task
		rename: {
			js: {
				src: '<%= dirs.intermediate %>/js/game.js',
				dest: '<%= dirs.intermediate %>/js/game_concat.js'
			}
		},

		// Configure Google Closure Compiler task
		'closure-compiler': {
			frontend: {
				// Paths to the JavaScript source files
				js: ['<%= dirs.intermediate %>/js/game_concat.js'],
				// Path to compiled JavaScript file
				jsOutputFile: '<%= dirs.intermediate %>/js/game.js',
				// Options to be passed to the closure compiler
				options: {
					compilation_level: 'SIMPLE_OPTIMIZATIONS', // TO DO: change to ADVANCED_OPTIMIZATIONS
					//language_in: 'ECMASCRIPT5_STRICT',
					// externs: [
					// 	'<%= dirs.src %>/vendor/js/Box2dWeb-2.1.a.3.min.js',
					// 	'<%= dirs.src %>/vendor/js/Class.js',
					// 	'<%= dirs.build %>/vendor/js/easeljs-0.6.1.min.js'
					] // TO DO: generate the externs file
				}
			}
		}
	});

	// Custom task for creating required directories
	grunt.registerMultiTask('mkdir', 'Make required directories if they don\'t already exist', function () {
		function mkdir (dir, requested) {
			dir = path.resolve(__dirname, dir);
			if (!fs.existsSync(dir)) {
				grunt.log.writeln('Creating directory: ' + dir);
				fs.mkdirSync(dir);
			} else {
				if (requested === true) {
					grunt.log.writeln('Directory already exists: ' + dir);
				}
			}
		}

		// TO DO: handle arrays as well as strings
		var dirParts = this.data.split('/');
		for (var i = 1; i < dirParts.length - 1; i++) {
			mkdir(dirParts.slice(0,i + 1).join('/'));
		}
		mkdir(this.data, true);
	});

	// Build tasks
	grunt.registerTask('build', ['clean', 'mkdir', 'copy:build', 'useminPrepare', 'concat', 'rename:js', 'closure-compiler:frontend', 'cssmin', 'rev', 'usemin', 'json-minify:publish', 'htmlmin:publish', 'copy:publish']);

	// Default tasks
	grunt.registerTask('default', ['build']);

	// Register plugin tasks
	grunt.loadNpmTasks('grunt-rev');
	grunt.loadNpmTasks('grunt-rename');
	grunt.loadNpmTasks('grunt-usemin');
	grunt.loadNpmTasks('grunt-json-minify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-closure-compiler');
};