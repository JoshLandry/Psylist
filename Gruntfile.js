'use strict';

module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-browserify');

	grunt.initConfig({

		clean: {
			build: {
				src: ['build/']
			}
		},

		copy: {
			build: {
				expand: true,
				cwd: 'views/',
				src: ['**/*.html', '**/*.bmp'],
				dest: 'build/',
				flatten: false,
				filter: 'isFile'
			}
		},
		
		browserify: {
			dev: {
				src: ['views/js/**/*.js'],
				dest: 'build/bundle.js'
			},
			options: {
				transform: ['debowerify']
			}
		},

	});
	grunt.registerTask('build', ['clean', 'browserify', 'copy']);
};