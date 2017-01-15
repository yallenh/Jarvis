exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['spec.js'],
    jasmineNodeOpts: {
        defaultTimeoutInterval: 6000000
    },
    params: {
        baseFolder: '../books',
        imageSelector: '#defualtPagePic',
        imageNextSelector: '.img_right.nextPageButtonJs',
        booksListSelector: '.comicBox .relativeRec li',
        bookLinkSelector: 'h3 a',
        booksListNextSelector: '.pagination>:nth-last-child(1)',
        comicNameSelector: '.titleNav h1'
    }
}
