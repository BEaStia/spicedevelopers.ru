// Generated by CoffeeScript 1.10.0
(function() {
  var assert, should;

  assert = require('assert');

  should = require('should');

  describe('Array', function() {
    describe('#indexOf()', function() {
      it('should return -1 when the value is not present', function() {
        assert.equal(-1, [1, 2, 3].indexOf(5));
        assert.equal(-1, [1, 2, 3].indexOf(0));
      });
    });
  });

  describe('PageModel', function() {
    var pageModel;
    pageModel = require(__dirname + '/../app/models/page_model');
    beforeEach(function(done) {
      pageModel.Page.drop().then(function() {
        return pageModel.Page.sync({
          force: true
        });
      }).then((function() {
        done();
      }), function(err) {
        throw err;
      });
    });
    describe('#create', function() {
      it('should create page', function(done) {
        console.log("SHIT");
        pageModel.Page.create({
          address: '\/test',
          description: 'test',
          title: 'Test'
        }).then((function(page) {
          page.should.not.equal(void 0);
          if (page !== void 0) {
            done();
          }
        }));
      });
    });
    describe('#getPage', function() {
      it('should find page', function(done) {
        pageModel.Page.bulkCreate([
          {
            address: '/test',
            description: 'test',
            title: 'Test',
            view: 'main'
          }, {
            address: '/test1',
            description: 'test1',
            title: 'Test1',
            view: 'about'
          }, {
            address: '/test2',
            description: 'test2',
            title: 'Test2',
            view: 'contacts'
          }
        ]).then(function() {
          return pageModel.Page.findAll();
        }).then(function(pages) {
          pageModel.getPage('/test').then(function(page) {
            page.title.should.equal('Test');
            done();
          });
        });
      });
    });
    describe('#getPages', function() {
      it('should find all pages', function(done) {
        pageModel.Page.bulkCreate([
          {
            address: '/test',
            description: 'test',
            title: 'Test',
            view: 'main'
          }, {
            address: '/test1',
            description: 'test1',
            title: 'Test1',
            view: 'about'
          }, {
            address: '/test2',
            description: 'test2',
            title: 'Test2',
            view: 'contacts'
          }
        ]).then(function() {
          pageModel.getPages().then((function(pages) {
            pages.length.should.equal(3);
            pages.map(function(page) {
              return page.title;
            }).should.containDeep(['Test', 'Test1', 'Test2']);
            done();
          }), function(err) {
            throw err;
            done(err);
          });
        });
      });
    });
  });

  describe('PageController', function() {
    var pageModel;
    pageModel = require(__dirname + '/../app/models/page_model');
    beforeEach(function(done) {
      pageModel.Page.drop().then(function() {
        return pageModel.Page.sync({
          force: true
        });
      }).then((function() {
        done();
      }), function(err) {
        throw err;
      });
    });
    describe('#getPages', function() {
      it('should add all pages', function(done) {
        var pages;
        pages = [
          {
            address: '/',
            title: 'Добро пожаловать на HostingNode!',
            description: 'Hosting Node Ваш хостинг, оперативная поддержка, помощь, низкие тарифы и доступные цены. Индивидуальный подход к клиентам',
            keywords: 'hosting, node, linux, windows, хостинг, линукс, ноде, джаваскрипт, яваскрипт, нода, нодежс',
            view: 'main'
          }, {
            address: '/index.html',
            title: '',
            description: 'Hosting Node Ваш хостинг, оперативная поддержка, помощь, низкие тарифы и доступные цены. Индивидуальный подход к клиентам',
            keywords: 'hosting, node, linux, windows, хостинг, линукс, ноде, джаваскрипт, яваскрипт, нода, нодежс',
            view: 'main'
          }, {
            address: '/about.html',
            title: 'Почему мы?',
            description: 'Причины выбрать Hosting Node как Ваш хостинг, с оперативнрй поддержкой, помощью, низкими тарифами и доступными цены',
            keywords: 'Konnect Responsive web template, Bootstrap Web Templates, Flat Web Templates, Andriod Compatible web template, Smartphone Compatible web template, free webdesigns for Nokia, Samsung, LG, SonyErricsson, Motorola web design',
            view: 'about'
          }, {
            address: '/blog.html',
            view: 'blog',
            title: 'О нас',
            keywords: 'hosting, node, linux, windows, хостинг, линукс, ноде, джаваскрипт, яваскрипт, нода, нодежс',
            description: 'Рассказ о Hosting Node Ваш хостинг, оперативная поддержка, помощь, низкие тарифы и доступные цены. Индивидуальный подход к клиентам'
          }, {
            title: 'Связаться с нами',
            description: 'Страница связи со специалистами лучшего хостинга в мире!',
            keywords: 'hosting, node, linux, windows, хостинг, линукс, ноде, джаваскрипт, яваскрипт, нода, нодежс',
            view: 'support',
            address: '/support.html'
          }, {
            address: '/plans.html',
            view: 'plans',
            title: 'Наши тарифные планы',
            description: 'Перечень наших тарифных планов и форма связи с нами',
            keywords: 'hosting, node, linux, windows, хостинг, линукс, ноде, джаваскрипт, яваскрипт, нода, нодежс'
          }, {
            address: '/services(.html)?',
            view: 'services',
            title: 'Наши услуги',
            description: 'Услуги, которые мы оказываем',
            keywords: 'hosting, node, linux, windows, хостинг, линукс, ноде, джаваскрипт, яваскрипт, нода, нодежс'
          }, {
            address: '/refund.html',
            view: 'refund',
            title: 'Возврат средств',
            description: 'Наша политика возврата средств покупателям',
            keywords: 'hosting, node, linux, windows, хостинг, линукс, ноде, джаваскрипт, яваскрипт, нода, нодежс'
          }
        ];
        pageModel.Page.bulkCreate(pages).then(function() {
          pageModel.Page.all().then(function(page_list) {
            page_list.length.should.equal(pages.length);
            done();
          });
        });
      });
    });
  });

}).call(this);
