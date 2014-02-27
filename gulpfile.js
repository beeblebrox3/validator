var gulp = require('gulp'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint');

gulp.task('default', function () {
    gulp.src('src/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));

    gulp.src('src/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/'));
});