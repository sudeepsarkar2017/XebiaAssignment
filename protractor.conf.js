var HtmlReporter = require('protractor-beautiful-reporter');

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
        defaultTimeoutInterval: 5000000,
        realtimeFailure: true
    },

    onPrepare: function () {
        browser.ignoreSynchronization = true

        jasmine.getEnv().addReporter(new HtmlReporter({
            baseDirectory: './build/output/screenshots',
            docTitle: 'Xebia Assignment'
        }).getJasmine2Reporter());
    }

};