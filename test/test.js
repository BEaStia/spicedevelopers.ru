var assert = require('assert');
var should = require('should');

describe('Array', function() {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal(-1, [1,2,3].indexOf(5));
            assert.equal(-1, [1,2,3].indexOf(0));
        });
    });
});

describe('PageModel', function() {
    var pageModel = require(__dirname + '/../app/models/page_model');

    beforeEach((done) =>{
        pageModel.Page.drop()
        .then( ()=>{return pageModel.Page.sync({force: true});}).then(() => {
            done();
        }, (err) => {
          throw err;
        });
    });

    describe('#create', function () {
        it('should create page', (done) => {
            pageModel.Page.create({address: "/test", description: "test", title: "Test"})
            .then((page) =>{
                page.should.not.equal(undefined);
                if (page != undefined)
                    done();
            }, (err)=> {
                throw err;
                return done(err);
            });
        });
    });

    describe('#getPage', ()=> {
       it('should find page', (done)=>{
          pageModel.Page.bulkCreate([
           {address: "/test", description: "test", title: "Test", view: 'main'},
           {address: "/test1", description: "test1", title: "Test1", view: 'about'},
           {address: "/test2", description: "test2", title: "Test2", view: 'contacts'}
       ]).then(()=> { return pageModel.Page.findAll()}).then((pages) => {
         pageModel.getPage("/test").then((page)=>{
           page.title.should.equal("Test");
           done();
         })
       });
       });
    });

    describe('#getPages', ()=>{
      it('should find all pages', (done)=>{
           pageModel.Page.bulkCreate([
          {address: "/test", description: "test", title: "Test", view: 'main'},
          {address: "/test1", description: "test1", title: "Test1", view: 'about'},
          {address: "/test2", description: "test2", title: "Test2", view: 'contacts'}])
      .then(() => {
        pageModel.getPages().then((pages)=>{
          pages.length.should.equal(3);
          pages.map((page)=>page.title).should.containDeep(['Test', 'Test1', 'Test2']);
          done();
        }, (err)=>{
          throw err;
          done(err);
        })
      });
      });
    });


});

describe('PageController', ()=> {
  var pageModel = require(__dirname + '/../app/models/page_model');

  beforeEach((done) =>{
      pageModel.Page.drop()
      .then( ()=>{return pageModel.Page.sync({force: true});}).then(() => {
          done();
      }, (err) => {
        throw err;
      });
  });


  describe('#getPages', ()=>{
    it('should add all pages', (done)=>{
      pageModel.Page.bulkCreate([
       {
         address: "/(index(\.html)?)?",
         title: 'Главная Spice developers',
         description: "Главная страница Spice Developers разработчиков на Ruby, JS, C#",
         keywords: "ruby, javascript, JS, разработчики, обучение программированию, developers, spice developers, дипломы, аутсорсинг",
         view: 'main',
       },
       {
         address: "/about(\.html)?",
         title: 'Информация о Spice developers',
         description: "Страница отзывов Spice Developers разработчиков на Ruby, JS, C#",
         keywords: 'ruby, javascript, JS, разработчики, обучение программированию, developers, spice developers, дипломы, аутсорсинг, отзывы',
         view: 'about'
       },
       {
         address: "/contacts(\.html)?",
         view: 'contacts',
         title: 'Контакты',
         description: 'Контакты Spice Developers разработчиков на Ruby, JS, C#',
         keywords: 'ruby, javascript, JS, разработчики, обучение программированию, developers, spice developers, дипломы, аутсорсинг, связь',
       },
       {
         title: 'Уроки от Spice developers',
         description: 'Страница уроков Spice Developers разработчиков на Ruby, JS, C#',
         keywords: 'ruby, javascript, JS, разработчики, обучение программированию, developers, spice developers, дипломы, аутсорсинг, уроки',
         view: 'lessons',
         address: '/lessons(\.html)?'
       },
       {
         address: '/jobs(\.html)?',
         view: 'portfolio',
         title: 'Вакансии Spice developers',
         description: 'Страница ваканисй Spice Developers разработчиков на Ruby, JS, C#',
         keywords: 'ruby, javascript, JS, разработчики, обучение программированию, developers, spice developers, дипломы, аутсорсинг, вакансии, вакансии для программистов'
       },
       {
         address: '/portfolio(\.html)?',
         view: '',
         title: 'Портфолио Spice developers',
         description: 'Портфолио, примеры работ Spice Developers разработчиков на Ruby, JS, C#',
         keywords: 'ruby, javascript, JS, разработчики, обучение программированию, developers, spice developers, дипломы, аутсорсинг, примеры работ'
       },
       {
         address: '/services(\.html)?',
         view: 'services',
         title: 'Услуги Spice Developers',
         description: 'Список услуг Spice Developers разработчиков на Ruby, JS, C#',
         keywords: 'ruby, javascript, JS, разработчики, обучение программированию, developers, spice developers, дипломы, аутсорсинг, услуги, услуги по разработке, консультации, аудит'
       },
       {
         address: '/lesson1(\.html)?',
         view: 'lesson1',
         title: 'Урок 0: Введение',
         description: 'Вводной урок в интернет-технологии',
         keywords: 'ruby, javascript, JS, разработчики, обучение программированию, developers, spice developers, дипломы, аутсорсинг, уроки'
       }
     ]).then(()=>{
      pageModel.Page.all().then((pages)=>{
        pages.length.should.equal(8);
        done();
      })
   });
    });
  });
});


describe("VisitorModel", ()=>{
  it ("should work with visitor", ()=>{

  });
});
