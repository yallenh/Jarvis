exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['spec.js'],
    jasmineNodeOpts: {
        defaultTimeoutInterval: 6000000
    },
    params: {
        baseFolder: '../books'
    }
}
