'use strict';

module.exports = function(config) {

  var configuration = {
    autoWatch : false,

    frameworks: ['jasmine'],

    reporters: ['progress', 'junit', 'coverage'],

    junitReporter: {
      outputFile: 'test-results.xml',
      suite: ''
    },

    coverageReporter: {
      type : 'cobertura',
      dir : 'coverage/'
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'src/',
      moduleName: 'gulpAngular'
    },

    browsers : ['PhantomJS'],

    plugins : [
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-ng-html2js-preprocessor',
      'karma-junit-reporter',
      'karma-coverage'
    ],

    preprocessors: {
      'src/**/*.html': ['ng-html2js'],
      //'src/**/*(!spec).js': ['coverage']
      'src/**/!(*.spec).js': ['coverage']
    }
  };

  // This block is needed to execute Chrome on Travis
  // If you ever plan to use Chrome and Travis, you can keep it
  // If not, you can safely remove it
  // https://github.com/karma-runner/karma/issues/1144#issuecomment-53633076
  if(configuration.browsers[0] === 'Chrome' && process.env.TRAVIS) {
    configuration.customLaunchers = {
      'chrome-travis-ci': {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    };
    configuration.browsers = ['chrome-travis-ci'];
  }

  config.set(configuration);
};
