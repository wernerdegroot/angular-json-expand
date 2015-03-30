module.exports = function (config) {
    'use strict';
    config.set({
 
        basePath: '',
 
        frameworks: ['mocha', 'chai', 'sinon'],
 
        files: [
            'dist/test/*.js'
        ],
 
        reporters: ['nyan'],
 
        port: 9876,
        colors: true,
        autoWatch: false,
        singleRun: false,
 
        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,
 
        browsers: ['PhantomJS']
 
    });
};