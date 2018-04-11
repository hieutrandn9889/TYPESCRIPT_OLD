const Cucumber = require('cucumber');
import { browser } from 'protractor';
import * as fs from 'fs';
import { defineSupportCode } from 'cucumber';
import * as reporter from 'cucumber-html-reporter';
import * as report from 'cucumber-html-report';
import { mkdirp } from 'mkdirp';

defineSupportCode(function ({ registerHandler, registerListener, After, setDefaultTimeout }) {

    setDefaultTimeout(10 * 1000);
    const jsonReports = process.cwd() + '/reports/json';
    const htmlReports = process.cwd() + '/reports/html';
    const targetJson = jsonReports + '/cucumber_report.json';

    registerHandler('BeforeFeature', function (event, callback) {
        browser.get('http://google.com');
        setTimeout(callback, 5000);
    });

    After(function (scenario) {
        const world = this;
        if (scenario.isFailed()) {
            return browser.takeScreenshot().then(function (screenShot) {
                // screenshot is a base-64 encoded PNG
                world.attach(screenShot, 'image/png');
            });
        }
    });

    const cucumberReporterOptions = {
        theme: 'bootstrap',
        jsonFile: targetJson,
        output: htmlReports + '/cucumber_reporter.html',
        reportSuiteAsScenarios: true,
        launchReport: true
    };

    const cucumberReportOptions = {
        source: targetJson,
        dest: htmlReports,
        name: 'cucumber_report.html',
        title: 'Cucumber Report'
    };

    const logFn = string => {
        if (!fs.existsSync(jsonReports)) {
            mkdirp.sync(jsonReports);
        }
        try {
            fs.writeFileSync(targetJson, string);
            // invoke cucumber-html-reporter
            reporter.generate(cucumberReporterOptions);
            // invoke cucumber-html-report
            report.create(cucumberReportOptions).then(function() {
                console.log('Cucumber Report created successfully!');
            });
        } catch (err) {
            if (err) {
                console.log(`Failed to save cucumber test results to json file.
                             Failed to create html report.`);
                console.log(err);
            }
        }
    };

    const jsonformatter = new Cucumber.JsonFormatter({
        log: logFn
    });

    registerListener(jsonformatter);
});
