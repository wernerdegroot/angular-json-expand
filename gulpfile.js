var gulp = require('gulp');
var typescript = require('gulp-tsc');
var del = require('del');
var vinylPaths = require('vinyl-paths');

var nodeModulesDir = 'node_modules';
var definitelyTypedDir = nodeModulesDir + '/DefinitelyTyped';
var definitionsDir = 'definitions';
var libsDir = 'libs';

gulp.task('clean-definitions', function() {
    return cleanPath(definitionsDir);
});

gulp.task('copy-definitions', ['clean-definitions'], function() {

    var defintionFilePattern = '/**/*.d.ts';

    var filesToCopy = [
        definitelyTypedDir + '/angularjs' + defintionFilePattern,
        definitelyTypedDir + '/chai' + defintionFilePattern,
        definitelyTypedDir + '/mocha' + defintionFilePattern,
        definitelyTypedDir + '/sinon' + defintionFilePattern,
        definitelyTypedDir + '/sinon-chai' + defintionFilePattern
    ];
    return gulp.src(filesToCopy, {base: definitelyTypedDir})
            .pipe(gulp.dest(definitionsDir));
});

gulp.task('clean-libs', function() {
    return cleanPath(libsDir);
});

gulp.task('copy-libs', ['clean-libs'], function() {
    var libsFilePattern = '/**/*.js';

    var filesToCopy = [
        nodeModulesDir + '/angular' + libsFilePattern,
        nodeModulesDir + '/angular-mocks' + libsFilePattern
    ];
    return gulp.src(filesToCopy, {base: nodeModulesDir})
            .pipe(gulp.dest(libsDir));
});

gulp.task('compile', function(){
    gulp.src(['src/**/*.ts'])
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
    'libs/angular/angular.js',
    'libs/angular-mocks/angular-mocks.js',
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
