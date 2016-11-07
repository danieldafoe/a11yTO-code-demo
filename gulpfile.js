'use strict';

var gulp = require('gulp'),
		browserSync = require('browser-sync');

// Watch tasks
gulp.task('run', function() {
	// Start browser sync
	browserSync.init({
		browser: 'google chrome',
		notify: false,
		port: 3000,
		server: './',
		tunnel: true
	});
});

// Default task
gulp.task('default', ['run']);