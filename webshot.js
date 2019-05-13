/*

from https://github.com/yaph/webshots
use: phantomjs webshot.js URL width height output_name.png


INSTALL phantomjs

cd /tmp
export PHANTOM_JS="phantomjs-2.1.1-linux-x86_64"
wget https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-2.1.1-linux-x86_64.tar.bz2 # http://phantomjs.org/download.html
tar xvjf $PHANTOM_JS.tar.bz2
mv $PHANTOM_JS /usr/local/share
ln -sf /usr/local/share/$PHANTOM_JS/bin/phantomjs /usr/local/bin
phantomjs --version

*/

var page = require('webpage').create(),
    args = require('system').args,
    re_trim = /^https?:\/\/|\/$/g,
    re_conv = /[^\w\.-]/g


var webshot = function(url, w, h, output_name) {
    page.viewportSize = { width: w, height: h }
    page.open(url, function(status) {
        if (status !== 'success') {
            console.log('Unable to load url: ' + url)
            phantom.exit()
        } else {
            window.setTimeout(function() {
                page.clipRect = { top: 0, left: 0, width: w, height: h }
                page.evaluate(function() {
                    if ('transparent' === document.defaultView.getComputedStyle(document.body).getPropertyValue('background-color')) {
                        document.body.style.backgroundColor = '#fff';
                    }
                });
                //console.log('Creating file: ' + output_name)
                page.render(output_name)
                phantom.exit()
            }, 200)
        }
    })
}

webshot(args[1], args[2], args[3], args[4])
