var id = '';
var getin_date = '2016/12/28';
var getin_date2 = '2016/12/29';

describe('Taiwan Railways Ticket Booking', function() {
    var driver = browser.driver;
    function $get(url) {
        return driver.get(url);
    }
    function $switch(){
        return {
            to: function(selector) {
                return driver.switchTo().frame(driver.findElement(by.css(selector)));
            },
            back: function() {
                return driver.switchTo().defaultContent();
            }
        };
    }
    function $(selector) {
        return driver.findElement(by.css(selector));
    }
    function tryit() {
        console.log('try date', getin_date, '~', getin_date2);
        $get('http://railway.hinet.net/');
        $switch().to('frame[name="lMenu"]');
        $('a[title="訂去回票"]').click();
        $('a[title="車種訂去回票"]').click();
        $switch().back();

        $switch().to('frame[name="cMain"]');
        function tryDateOrReturn (selector, date) {
            $(selector).findElements(by.tagName('option')).then(function (options) {
                var total = options.length, fail = index = 0;
                options.map(function(option) {
                    option.getAttribute('value').then(function (value) {
                        if (!(value.indexOf(date) === -1)) {
                            $(selector).sendKeys(value);
                        } else {
                            fail++;
                            if ((index === (total - 1)) && (fail === total)) {
                                console.log('no', date, ', reload browser');
                                tryit();
                                return;
                            }
                        }
                        index++;
                    });
                });
            });
        }
        tryDateOrReturn('#getin_date', getin_date);
        tryDateOrReturn('#getin_date2', getin_date2);

        $('#person_id').sendKeys(id);
        $('#from_station').sendKeys('100');
        $('#to_station').sendKeys('051');
        $('#order_qty_str').sendKeys(6);
        $('#order_qty_str2').sendKeys(6);
        $('#train_type').sendKeys('*1');
        $('#train_type2').sendKeys('*1');
        $('#getin_start_dtime option:nth-child(9)').click();
        $('#getin_start_dtime2').sendKeys(17);
        $('#getin_end_dtime').sendKeys(10);
        $('#getin_end_dtime2').sendKeys(20);
        $('button[type=submit]').click();
        $switch().back();
    }

    it('HualianTrip2016', function() {
        tryit();
        browser.pause();
    });
});
