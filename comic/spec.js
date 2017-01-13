var fsUtil = require('./fsutil.js');
var baseUrl = '';

describe('Comic', function() {
    var episodes = [];
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
                        console.log(count);
                    });
                    $('.img_right.nextPageButtonJs').click();
                    saveImageToFolder(folder, count + 1);
                });
            }
        });
    }
    function saveBookFromUrl(url) {
        $get(url);
        $('.pageTitle a:nth-child(2)').getText().then(function(title) {
            fsUtil.mkdir(title);
            $('.pageTitle strong').getText().then(function(episode) {
                console.log('download ' + episode);
                var count = 1;
                var folder = [title, episode].join('/');
                fsUtil.mkdir(folder);
                saveImageToFolder(folder, count);
            });
        });
    }

    it('Episodes', function() {
        $get(baseUrl);
        $('.comicBox .relativeRec').findElements(by.tagName('li')).then(function (books) {
            books.map(function(book) {
                var link = book.findElement(by.css('h3 a'));
                link.getAttribute('href').then(function (href) {
                    episodes.push(href);
                });
            });
        });
    });
    it('Episode n', function() {
        saveBookFromUrl(episodes[0]);
    });
});
