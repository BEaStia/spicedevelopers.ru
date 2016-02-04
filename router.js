var app = require('./server').app;
var PageModel = require('./app/models/page_model');
var PageController = require('./app/controllers/page');
PageController.functionsPromise.then(function(functions){
    for (var key in functions) {
        app.get("/"+key, functions[key]);
    }
    console.log(functions);
});

app.get('/login', function(req, res){
   res.render('in_development');
});