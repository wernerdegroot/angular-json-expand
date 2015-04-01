var gulp = require('gulp');
var typescript = require('gulp-tsc');
var del = require('del');
var vinylPaths = require('vinyl-paths');

gulp.task('compile', function(){
    gulp.src(['src/AnotherTest.ts'])
    .pipe(typescript({
        out: "target.js"
    }))
    .pipe(gulp.dest('dist/src'))
});

gulp.task('build-test', ['clean-test'], function(){
    return gulp.src(['test/**/*.ts'])
    .pipe(typescript({
        out: "test.js"
    }))
    .pipe(gulp.dest('dist/test'))
});

gulp.task('clean-test', function() {
    return cleanPath('dist/test');
});

var cleanPath = function(path) {
    return gulp.src(path, {read: false})
    .pipe(vinylPaths(del));
};

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
