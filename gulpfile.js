'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');


gulp.task('nodemon', function (cb) {
  var started = false;
  return nodemon({
    script: 'bin/www'
  }).on('start', function () {
    if (!started) {
      cb();
      started = true;
    }
  });
});


gulp.task('browser-sync', ['nodemon'], function () {
  browserSync.init(null, {
    proxy: "http://localhost:8080",
    files: ['public/**/*.*', 'views/**/*.*','controller/**/*.*','model/**/*.*','routes/**/.*.*'],
    browser: "google chrome",
    port: 7000
  });
});

gulp.task('default', ['browser-sync'], function () {

});