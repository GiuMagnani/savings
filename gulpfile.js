"use strict";

    var gulp = require('gulp'),
autoprefixer = require('gulp-autoprefixer'), // Add autoprefixer to the build
      concat = require('gulp-concat'),
      uglify = require('gulp-uglify'),
      rename = require('gulp-rename'),
        sass = require('gulp-sass'),
        maps = require('gulp-sourcemaps'),
         del = require('del'),
 browserSync = require('browser-sync').create();

gulp.task("concatScripts", function() {
    return gulp.src([
        'js/jquery.js',
        'js/sticky/jquery.sticky.js',
        'js/main.js'
        ])
    .pipe(maps.init())
    .pipe(concat('app.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('js'));
});

gulp.task("minifyScripts", ["concatScripts"], function() {
  return gulp.src("js/app.js")
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('js'));
});

gulp.task('compileSass', function() {
  return gulp.src("src/scss/main.scss")
      .pipe(maps.init())
      //.pipe(sass())
      .pipe(sass().on('error', sass.logError))
      .pipe(maps.write('./'))
      .pipe(gulp.dest('src/css'))
      .pipe(browserSync.stream());
});

gulp.task('watchSass', function() {
  gulp.watch('src/scss/**/*.scss', ['compileSass']);
})

// Static Server + watching scss/html files
gulp.task('serve', ['compileSass'], function() {

    browserSync.init({
        server: "."
    });

    gulp.watch('./src/scss/**/*.scss', ['compileSass']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task('clean', function() {
  del(['dist', 'css/application.css*', 'js/app*.js*']);
});

gulp.task("build", ['minifyScripts', 'compileSass'], function() {
  return gulp.src(["css/application.css", "js/app.min.js", 'index.html',
                   "img/**", "fonts/**"], { base: './'})
            .pipe(gulp.dest('dist'));
});

gulp.task("default", ["build"]);