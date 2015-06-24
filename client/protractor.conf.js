'use strict';

var paths = require('./.yo-rc.json')['generator-gulp-angular'].props.paths;

console.log(process.env.webdriver);
var seleniumUrl = null;
if (process.env.webdriver === 'true') {
  seleniumUrl = 'http://localhost:4444/wd/hub'
}


// An example configuration file.
exports.config = {
  // The address of a running selenium server.
  seleniumAddress: seleniumUrl,
  //seleniumServerJar: deprecated, this should be set on node_modules/protractor/config.json

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  // Spec patterns are relative to the current working directly when
  // protractor is called.
  specs: [paths.e2e + '/**/*.js'],

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  }
};
