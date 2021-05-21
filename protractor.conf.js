var HtmlReporter = require('protractor-beautiful-reporter');
var jasmineReporters = require('jasmine-reporters');

exports.config = {

    directConnect: true,
    //  seleniumAddress: 'http://localhost:4444/wd/hub',
    capabilities: {
        browserName: 'chrome',

        chromeOptions: {
            //    args: [ "--headless", "--disable-gpu", "--window-size=800,600" ]
            args: ['start-maximized']
        }
    },

    framework: 'jasmine2',
    rootElement: 'body',
    specs: ['./build/test/module1/*spec.js'],
    jasmineNodeOpts: {
        defaultTimeoutInterval: 5000000
    },

    onPrepare: function () {
        browser.ignoreSynchronization = true

        jasmine.getEnv().addReporter(new HtmlReporter({
            baseDirectory: './build/output/screenshots',
            docTitle: 'Xebia Assignment'
        }).getJasmine2Reporter());

        jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
            consolidateAll: false,
            savePath: './build/output'
        }));
    }

};