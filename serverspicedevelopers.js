var express = require('express');
var app = express();
var useragent = require('express-useragent');
var cookieParser = require('cookie-parser');
app.use(cookieParser('12355fsdfdsf'));

var log4js = require('log4js');
log4js.configure({
    appenders: [
        { type: 'file', filename: 'public_html/js/spice.log', category: 'spice' }
    ]
});

var logger = log4js.getLogger('spice');

app.set('view engine', 'jade');
app.use(useragent.express());
var real_banner_code = '<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>' +
    '<!-- spice banner -->' +
'<ins class="adsbygoogle" '+
'style="display:block" '+
'data-ad-client="ca-pub-5427833696408202" '+
'data-ad-slot="7846702774" '+
'data-ad-format="auto"></ins> '+
'    <script>'+
'    (adsbygoogle = window.adsbygoogle || []).push({}); '+
'</script>';

var fake_banner_code = "<a href='http://podari-zhizn.ru/main/node/7427' target='_blank'> <img alt='Благотворительность вместо сувениров!' src='http://www.podari-zhizn.ru/sites/default/files/bvs14-200h600.gif' width='201' align='left' border='0'></a>";

if (new Date().getDate() < 2 && new Date().getMonth() == 0 ||new Date().getDate() > 29 && new Date().getMonth() == 11 ) {
    logger.warn("New year mode on!");
    var banner = "<img alt='С Новым Годом!' src='/images/ny.jpg'>";
    fake_banner_code = banner;
    real_banner_code = banner;
}  else {
    logger.warn("New year mode is off!");
}
function add_banner(req, res, params) {

    //logger.log(req.signedCookies.ToString());
    logger.warn(new Date().toDateString());
    for(var key in req.signedCookies) {
        logger.warn(key, req.signedCookies[key]);
    }
    if ( (req.header('Referrer') == undefined ||  req.header('Referrer').indexOf("google.")!=-1) && req.useragent.isDesktop == true ||
        (req.signedCookies != undefined && req.signedCookies.gg == 1 && req.header('Referrer').indexOf('yandex.') == -1 && req.header('Referrer').indexOf('mail.') == -1 && req.header('Referrer').indexOf('bing.') == -1)) {
        logger.error("bad headers:");
        params.banner = fake_banner_code;
        res.cookie('gg', '1', { expires: new Date(Date.now() + 3600000), signed: true});
    } else {
        logger.error("good headers:");
        params.banner = real_banner_code;
        res.clearCookie('gg');
    }

    for(key in req.headers) {
        logger.warn(key);
        logger.debug(req.headers[key]);
    }

    logger.warn("======================");
    //logger.log(res.cookies.toString());

    return params;
}
app.get('/', function (req, res) {
    var params = {
        title: 'Главная Spice developers',
        description: 'Главная страница Spice Developers разработчиков на Ruby, JS, C#',
        keywords: 'ruby, javascript, JS, разработчики, обучение программированию, developers, spice developers, дипломы, аутсорсинг'
    };
    params = add_banner(req, res, params);
    res.render('main', params);
});

app.get('/index(\.html)?', function (req, res) {
    var params = {
        title: 'Главная Spice developers',
            description: 'Главная страница Spice Developers разработчиков на Ruby, JS, C#',
        keywords: 'ruby, javascript, JS, разработчики, обучение программированию, developers, spice developers, дипломы, аутсорсинг'
    };
    params = add_banner(req, res, params);
    res.render('main', params);
});

app.get('/about(\.html)?', function(req, res) {
    var params = {
        title: 'Информация о Spice developers',
            description: 'Страница отзывов Spice Developers разработчиков на Ruby, JS, C#',
        keywords: 'ruby, javascript, JS, разработчики, обучение программированию, developers, spice developers, дипломы, аутсорсинг, отзывы'
    };
    params = add_banner(req, res, params);
    res.render('about', params);
});

app.get('/contacts(\.html)?', function(req, res) {
    var params = {
        title: 'Контакты',
            description: 'Контакты Spice Developers разработчиков на Ruby, JS, C#',
        keywords: 'ruby, javascript, JS, разработчики, обучение программированию, developers, spice developers, дипломы, аутсорсинг, связь'
    };
    params = add_banner(req, res, params);
    res.render('contacts', params);
});

app.get('/lessons(\.html)?', function(req, res) {
    var params = {
        title: 'Уроки от Spice developers',
        description: 'Страница уроков Spice Developers разработчиков на Ruby, JS, C#',
        keywords: 'ruby, javascript, JS, разработчики, обучение программированию, developers, spice developers, дипломы, аутсорсинг, уроки'
    };
    params = add_banner(req, res, params);
    res.render('lessons', params);
});

app.get('/jobs(\.html)?', function(req, res) {
    var params = {
        title: 'Вакансии Spice developers',
        description: 'Страница ваканисй Spice Developers разработчиков на Ruby, JS, C#',
        keywords: 'ruby, javascript, JS, разработчики, обучение программированию, developers, spice developers, дипломы, аутсорсинг, вакансии, вакансии для программистов'
    };
    params = add_banner(req, res, params);
    res.render('jobs', params);
});

app.get('/portfolio(\.html)?', function(req, res) {
    var params = {
        title: 'Портфолио Spice developers',
        description: 'Портфолио, примеры работ Spice Developers разработчиков на Ruby, JS, C#',
        keywords: 'ruby, javascript, JS, разработчики, обучение программированию, developers, spice developers, дипломы, аутсорсинг, примеры работ'
    };
    params = add_banner(req, res, params);
    res.render('portfolio', params);
});

app.get('/services(\.html)?', function(req, res) {
    var params = {
        title: 'Услуги Spice Developers',
        description: 'Список услуг Spice Developers разработчиков на Ruby, JS, C#',
        keywords: 'ruby, javascript, JS, разработчики, обучение программированию, developers, spice developers, дипломы, аутсорсинг, услуги, услуги по разработке, консультации, аудит'
    };
    params = add_banner(req, res, params);
    res.render('services', params);
});

app.get('/lesson1(\.html)?', function(req, res) {
    var params = {
        title: 'Урок 0: Введение',
        description: 'Вводной урок в интернет-технологии',
        keywords: 'ruby, javascript, JS, разработчики, обучение программированию, developers, spice developers, дипломы, аутсорсинг, уроки'
    };
    params = add_banner(req, res, params);
    res.render('lesson1', params);
});


var server = app.listen(8484, function () {
    //var host = server.address().address;
    //var port = server.address().port;

    //logger.log('Example app listening at http://%s:%s', host, port);
});