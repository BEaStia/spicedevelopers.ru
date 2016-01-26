var app = require('./server').app;
var PageModel = require('./app/models/page_model');
var PageController = require('./app/controllers/page');
PageModel.getPages().then(function(items){
   items.forEach((item)=>{
      var function_name = item['address'].substr(1,item['address'].length-1);
      if (PageController.functions[function_name] != undefined) {
        app.get(item['address'], PageController.functions[function_name]);
      }
    });
  });
