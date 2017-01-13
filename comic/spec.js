var fsUtil = require('../fsutil');
var baseUrl = '';
var baseFolder = '../books';

describe('Comic', function() {
    var bookDB = [];
    var Book = function (name, url) {
        return {
            name: name,
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
                    var addr = [baseFolder, folder, count + '.jpg'].join('/');
                    fsUtil.download(url, addr, function(){
                        console.log('\t', addr);
                    });
                    $('.img_right.nextPageButtonJs').click();
                    saveImageToFolder(folder, count + 1);
                });
            }
        });
    }
    var saveBookFromBookDB = function () {
        var book = bookDB.pop();
        if (!book) {
            return;
        }

        console.log('\nDownload', book.name, 'from', book.url, '...');
        $get(book.url);
        driver.isElementPresent(by.css('.pageTitle a:nth-child(2)')).then(function(present) {
            if (present) {
                $('.pageTitle a:nth-child(2)').getText().then(function(title) {
                    fsUtil.mkdir(title);
                    $('.pageTitle strong').getText().then(function(episode) {
                        var count = 1;
                        var folder = [title, episode].join('/');
                        fsUtil.mkdir(folder);
                        saveImageToFolder(folder, count);
                    });
                });
            } else {
                console.log('\t NOT PRESENT, SKIP!');
            }
        });
    };

    it('BookDB', function() {
        console.log('Scan BookDB ...');
        $get(baseUrl);
        $('.comicBox .relativeRec').findElements(by.tagName('li')).then(function (books) {
            books.map(function(book) {
                var link = book.findElement(by.css('h3 a'));
                link.getText().then(function (linkName) {
                    link.getAttribute('href').then(function (href) {
                        console.log('\t', linkName, '-->', href);
                        bookDB.push(new Book(linkName, href));
                    });
                });
            });
        });
    });
    it('Episode n', saveBookFromBookDB);
    it('Episode n', saveBookFromBookDB);
    it('Episode n', saveBookFromBookDB);
    it('Episode n', saveBookFromBookDB);
    it('Episode n', saveBookFromBookDB);
    it('Episode n', saveBookFromBookDB);
    it('Episode n', saveBookFromBookDB);
    it('Episode n', saveBookFromBookDB);
    it('Episode n', saveBookFromBookDB);
    it('Episode n', saveBookFromBookDB);
    it('Episode n', saveBookFromBookDB);
    it('Episode n', saveBookFromBookDB);
    it('Episode n', saveBookFromBookDB);
    it('Episode n', saveBookFromBookDB);
    it('Episode n', saveBookFromBookDB);
    it('Episode n', saveBookFromBookDB);
    it('Episode n', saveBookFromBookDB);
    it('Episode n', saveBookFromBookDB);
    it('Episode n', saveBookFromBookDB);
    it('Episode n', saveBookFromBookDB);
});
