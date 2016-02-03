var express = require('express');
var app = express();
exports.app = app;
var useragent = require('express-useragent');
var cookieParser = require('cookie-parser');

app.use(express.static(__dirname + '/public_html'));
app.use(cookieParser('12355fsdfdsf'));

var log4js = require('log4js');
log4js.configure({
    appenders: [
        { type: 'file', filename: 'public_html/logs/access.log', category: 'spice' },
        { type: 'console'}
    ]
});

var logger = log4js.getLogger('spice');
app.set('logger', logger);

var server = app.listen(8485, function () {
    require('./router');
});

app.set('view engine', 'jade');
app.set('views', __dirname + '/app/views');
app.use(useragent.express());
