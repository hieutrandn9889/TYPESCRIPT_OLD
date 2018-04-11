// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './e2e/**/*.feature'
  ],
  capabilities: {
    'browserName': 'chrome'
  },

  // build k cần server 
  directConnect: true,
  baseUrl: 'http://google.com',
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),

  onPrepare() {
    // hệ thông sẽ cố gắng tìm chúng k cần phải request gì nữa
    browser.ignoreSynchronization = true;
    browser.manage().window().maximize();
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
  },

  // report cucumber
  cucumberOpts: {
    compiler: "ts:ts-node/register",
    strict: true,
    format: ['pretty'],
    require: ['./e2e/stepdefinitions/*.ts', './e2e/support/*.ts'],
    tags: '@CucumberScenario'
  }
};
