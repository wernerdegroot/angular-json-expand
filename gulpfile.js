var gulp = require('gulp');
var typescript = require('gulp-tsc');

gulp.task('compile', function(){
  gulp.src(['src/AnotherTest.ts'])
    .pipe(typescript({
    	out: "target.js"
    }))
    .pipe(gulp.dest('dist/src'))
});

gulp.task('build-test', function(){
  return gulp.src(['test/**/**.ts'])
    .pipe(typescript({
    	out: "test.js"
    }))
    .pipe(gulp.dest('dist/test'))
});

var karma = require('gulp-karma');

var testFiles = [
  'dist/test/*.js'
];

gulp.task('test', ['build-test'], function() {
  // Be sure to return the stream
  return gulp.src(testFiles)
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }));
});
