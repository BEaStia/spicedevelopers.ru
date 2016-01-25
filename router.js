var app = require('./serverspicedevelopers').app;
/*var readdir = require('fs-readdir-promise');
var normalized_path = require("path").join(__dirname, "./app/models/");
var models = {};
var create_record = (reading_file)=>{
  if (reading_file.indexOf(".js") != -1) {
    var filename = reading_file.substr(0, reading_file.length - 3);
    return [filename, require("./app/models/" + reading_file)];
  }
  return undefined;
};

var prepareModels = ()=> {
  return readdir(normalized_path).then((files)=> {
      return Promise.all(files.map(create_record)
             .filter((record)=>{ return record != undefined})
             .map((record)=>{
                return new Promise((resolve, reject)=> {
                  models[record[0]] = record[1];
                  console.log(record[0]+" loaded");
                  resolve();
                });
              }));
      });
};

prepareModels().then(()=>{
  models['page_model'].getPages().then((pages)=>{
    console.log(pages);
  });
})
exports.models = models;
*/
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
