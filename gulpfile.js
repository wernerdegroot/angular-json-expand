var gulp = require('gulp');
var typescript = require('gulp-tsc');
 
gulp.task('compile', function(){
  gulp.src(['src/AnotherTest.ts'])
    .pipe(typescript({
    	out: "target.js"
    }))
    .pipe(gulp.dest('dist/src'))
});

gulp.task('test', function(){
  gulp.src(['test/AnotherTestTest.ts'])
    .pipe(typescript({
    	out: "target.js",
    	module: "commonjs"
    }))
    .pipe(gulp.dest('dist/test'))
});