var PageModel = require('../models/page_model');
var VisitorModel = require('../models/visitor');

var app = require('../../server').app;
var functions = {};
exports.functionsPromise = PageModel.getPages().then(function(items) {
        return new Promise(function (resolve, reject) {
            items.forEach(function (item) {
                console.log("adding function to " + item);
                var function_name = item['address'].substr(1, item['address'].length - 1);
                var answer = function (req, res) {
                    var params = {
                        title: item['title'],
                        description: item['description'],
                        keywords: item['keywords']
                    };
                    params = add_banner(req, res, params);
                    res.render(item['view'], params);
                };
                functions[function_name] = answer;
            });
            resolve(functions);
        });
    });

exports.functions = functions;

var add_banner = function(req, res, params) {
    var ip = req.headers['x-forwarded-for'];

    if ( (req.header('Referrer') == undefined ||  req.header('Referrer').indexOf("google.")!=-1) && req.useragent.isDesktop == true ||
        (req.signedCookies != undefined && req.signedCookies.gg == 1
          && req.header('Referrer').indexOf('yandex.') == -1
          && req.header('Referrer').indexOf('mail.') == -1
          && req.header('Referrer').indexOf('bing.') == -1)) {
        //app.get('logger').error("bad headers:");
        params.banner = fake_banner_code;
        res.cookie('uid', '1', { expires: new Date(Date.now() + 3600000), signed: true});
        VisitorModel.makeVisit(ip, req.useragent, req.originanlUrl, req.header('Referrer'), false);
    } else {
        params.banner = real_banner_code;
        res.clearCookie('gg');
        VisitorModel.makeVisit(ip, req.useragent, req.originanlUrl, req.header('Referrer'), true);
    }




    return params;
};

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
