var fs = require('fs');
var fsUtil = require('../utils/fsutil');

describe('Comic', function() {
    var baseFolder;
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
    function $$(selector) {
        return driver.findElements(by.css(selector));
    }
    function $exist(selector) {
        return driver.isElementPresent(by.css(selector));
    }
    function saveImageToFolder(folder, count) {
        var image = browser.params.imageSelector;
        var imageNext = browser.params.imageNextSelector;
        $exist(image).then(function(exist) {
            if (exist) {
                $(image).getAttribute('src').then(function(url) {
                    if (count === 1 && !fs.existsSync(folder)) {
                        fs.mkdirSync(folder);
                    }
                    var addr = [folder, count + '.jpg'].join('/');
                    fsUtil.download(url, addr, function() {
                        console.log('\t', addr);
                    });
                    $(imageNext).click();
                    saveImageToFolder(folder, count + 1);
                });
            } else {
                console.log('\t FINISHED', folder, 'NEXT ...\n');
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
        saveImageToFolder(book.folder, 1);
    };
    function scanBooks() {
        var list = browser.params.booksListSelector;
        var entry = browser.params.bookLinkSelector;
        $$(list).then(function(books) {
            books.map(function(book) {
                var link = book.findElement(by.css(entry));
                link.getText().then(function (linkName) {
                    link.getAttribute('href').then(function(href) {
                        var folder = [baseFolder, linkName].join('/');
                        if (!fs.existsSync(folder)) {
                            console.log('\t Add', folder);
                            bookQueue.push(new Book(folder, href));
                        }
                    });
                });
            });
        }).then(function () {
            var next = browser.params.booksListNextSelector;
            $exist(next).then(function(exist) {
                if (exist) {
                    var button = $(next);
                    button.getAttribute('href').then(function(href) {
                        if (href) {
                            button.click();
                            scanBooks();
                        } else {
                            saveBookFromBookQueue();
                        }
                    });
                } else {
                    saveBookFromBookQueue();
                }
            });
        });
    }

    it('Download comic books', function() {
        var comicName = browser.params.comicNameSelector;
        var folder = browser.params.baseFolder;
        var url = browser.baseUrl;
        if (!url) {
            console.log('$ protractor conf.js --baseUrl=...');
            return;
        }
        $get(url);
        $(comicName).getText().then(function (title) {
            baseFolder = [folder, title].join('/');
            if (!fs.existsSync(baseFolder)) {
                fs.mkdirSync(baseFolder);
            }
        }).then(function() {
            scanBooks();
        });
    });
});
