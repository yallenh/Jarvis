var fs = require('fs');
var fsUtil = require('../utils/fsutil');

describe('Comic', function() {
    var bookQueue = [];
    var Book = function (folder, url) {
        return {
            folder: folder,
            url: url
        };
    }
    var driver = browser.driver;
    function $get(url) {
        return driver.get(url);
    }
    function $(selector) {
        return driver.findElement(by.css(selector));
    }
    function saveImageToFolder(folder, count) {
        driver.isElementPresent(by.css('#defualtPagePic')).then(function(value) {
            if (value) {
                $('#defualtPagePic').getAttribute('src').then(function(url) {
                    var addr = [folder, count + '.jpg'].join('/');
                    fsUtil.download(url, addr, function(){
                        console.log('\t', addr);
                    });
                    $('.img_right.nextPageButtonJs').click();
                    saveImageToFolder(folder, count + 1);
                });
            } else {
                saveBookFromBookQueue();
            }
        });
    }
    function saveBookFromBookQueue() {
        var book = bookQueue.pop();
        if (!book) {
            console.log('NO BOOK, DONE!');
            return;
        }
        console.log('\nDownload', book.url, 'to', book.folder);
        $get(book.url);
        driver.isElementPresent(by.css('.pageTitle a:nth-child(2)')).then(function(present) {
            if (present) {
                fs.mkdirSync(book.folder);
                saveImageToFolder(book.folder, 1);
            } else {
                console.log('\t NOT PRESENT, SKIP!');
                saveBookFromBookQueue();
            }
        });
    };

    it('Download comic bookc', function() {
        console.log('Scan Books ...');
        $get(browser.baseUrl);
        var baseFolder = browser.params.baseFolder;
        $('.titleNav h1').getText().then(function (title) {
            baseFolder = [baseFolder, title].join('/');
            if (!fs.existsSync(baseFolder)) {
                fs.mkdirSync(baseFolder);
            }
        });
        $('.comicBox .relativeRec').findElements(by.tagName('li')).then(function (books) {
            books.map(function(book) {
                var link = book.findElement(by.css('h3 a'));
                link.getText().then(function (linkName) {
                    link.getAttribute('href').then(function (href) {
                        var folder = [baseFolder, linkName].join('/');
                        if (!fs.existsSync(folder)) {
                            console.log('\t Add', folder);
                            bookQueue.push(new Book(folder, href));
                        }
                    });
                });
            });
        }).then(function() {
            saveBookFromBookQueue();
        });
    });
});
