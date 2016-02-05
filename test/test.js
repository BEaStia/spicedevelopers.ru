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
      var pages = [
       {
         address: "/",
         title: '',
         description: "",
         keywords: "",
         view: 'main',
       },
       {
         address: "/index(\.html)?",
         title: '',
         description: "",
         keywords: "",
         view: 'main',
       },
       {
         address: "/about(\.html)?",
         title: 'Konnect A Hosting Category Flat Bootstarp Resposive Website Template | About :: w3layouts',
         description: "",
         keywords: 'Konnect Responsive web template, Bootstrap Web Templates, Flat Web Templates, Andriod Compatible web template, Smartphone Compatible web template, free webdesigns for Nokia, Samsung, LG, SonyErricsson, Motorola web design',
         view: 'about'
       },
       {
         address: "/blog(\.html)?",
         view: 'blog',
         title: '',
         description: '',
         keywords: '',
       },
       {
         title: '',
         description: '',
         keywords: '',
         view: 'support',
         address: '/support(\.html)?'
       },
       {
         address: '/domain(\.html)?',
         view: 'domain',
         title: '',
         description: '',
         keywords: ''
       },
       {
         address: '/single(\.html)?',
         view: 'single',
         title: '',
         description: '',
         keywords: ''
       },
       {
         address: '/plans(\.html)?',
         view: 'plans',
         title: '',
         description: '',
         keywords: ''
       },
      {
          address: '/services(\.html)?',
          view: 'services',
          title: '',
          description: '',
          keywords: ''
      },
      {
          address: '/refund.html',
          view: 'refund',
          title: '',
          description: '',
          keywords: ''
      }
     ];
      pageModel.Page.bulkCreate(pages).then(()=>{
      pageModel.Page.all().then((page_list)=>{
        page_list.length.should.equal(pages.length);
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
