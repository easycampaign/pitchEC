'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    minify = require('gulp-minify'),
    browserSync = require('browser-sync').create(),
    autoprefixer = require('autoprefixer');

gulp.task('sass', function () {
    return gulp.src('src/scss/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('scripts', function() {
    return gulp.src('src/js/*.js')
        .pipe(concat('easycampaign.js'))
        .pipe(minify({
            conditionals: false,
            drop_debugger: false,
            mangle: false,
            join_vars: false,
            comments: false,
            compact: true,
            minified: true
        }))
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
});

gulp.task('browserSync', function() {
    browserSync.init({
      server: {
          baseDir: "./"
      }
    });
});

gulp.task('bs-reload', function (){
    browserSync.reload();
});

gulp.task('watch', ['browserSync'], function() {
    gulp.watch("src/scss/**/*.scss", ['sass']);
    gulp.watch("src/js/*.js", ['scripts']);
    gulp.watch("**/*.html", ['bs-reload']);
});

gulp.task('default', ['watch']);
