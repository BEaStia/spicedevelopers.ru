assert = require('assert')
should = require('should')
describe 'Array', ->
  describe '#indexOf()', ->
    it 'should return -1 when the value is not present', ->
      assert.equal -1, [
        1
        2
        3
      ].indexOf(5)
      assert.equal -1, [
        1
        2
        3
      ].indexOf(0)
      return
    return
  return
describe 'PageModel', ->
  pageModel = require(__dirname + '/../app/models/page_model')
  beforeEach (done) ->
    pageModel.Page.drop().then(->
      pageModel.Page.sync force: true
    ).then (->
      done()
      return
    ), (err) ->
      throw err
      return
    return
  describe '#create', ->
    it 'should create page', (done) ->
      console.log("SHIT")
      pageModel.Page.create(
        address: '\/test'
        description: 'test'
        title: 'Test').then ((page) ->
        page.should.not.equal undefined
        if page != undefined
          done()
        return
      )
      return
    return
  describe '#getPage', ->
    it 'should find page', (done) ->
      pageModel.Page.bulkCreate([
        {
          address: '/test'
          description: 'test'
          title: 'Test'
          view: 'main'
        }
        {
          address: '/test1'
          description: 'test1'
          title: 'Test1'
          view: 'about'
        }
        {
          address: '/test2'
          description: 'test2'
          title: 'Test2'
          view: 'contacts'
        }
      ]).then(->
        pageModel.Page.findAll()
      ).then (pages) ->
        pageModel.getPage('/test').then (page) ->
          page.title.should.equal 'Test'
          done()
          return
        return
      return
    return
  describe '#getPages', ->
    it 'should find all pages', (done) ->
      pageModel.Page.bulkCreate([
        {
          address: '/test'
          description: 'test'
          title: 'Test'
          view: 'main'
        }
        {
          address: '/test1'
          description: 'test1'
          title: 'Test1'
          view: 'about'
        }
        {
          address: '/test2'
          description: 'test2'
          title: 'Test2'
          view: 'contacts'
        }
      ]).then ->
        pageModel.getPages().then ((pages) ->
          pages.length.should.equal 3
          pages.map((page) ->
            page.title
          ).should.containDeep [
            'Test'
            'Test1'
            'Test2'
          ]
          done()
          return
        ), (err) ->
          throw err
          done err
          return
        return
      return
    return
  return
describe 'PageController', ->
  pageModel = require(__dirname + '/../app/models/page_model')
  beforeEach (done) ->
    pageModel.Page.drop().then(->
      pageModel.Page.sync force: true
    ).then (->
      done()
      return
    ), (err) ->
      throw err
      return
    return
  describe '#getPages', ->
    it 'should add all pages', (done) ->
      pages = [
        {
          address: '/'
          title: 'Добро пожаловать на HostingNode!'
          description: 'Hosting Node Ваш хостинг, оперативная поддержка, помощь, низкие тарифы и доступные цены. Индивидуальный подход к клиентам'
          keywords: 'hosting, node, linux, windows, хостинг, линукс, ноде, джаваскрипт, яваскрипт, нода, нодежс'
          view: 'main'
        }
        {
          address: '/index.html'
          title: ''
          description: 'Hosting Node Ваш хостинг, оперативная поддержка, помощь, низкие тарифы и доступные цены. Индивидуальный подход к клиентам'
          keywords: 'hosting, node, linux, windows, хостинг, линукс, ноде, джаваскрипт, яваскрипт, нода, нодежс'
          view: 'main'
        }
        {
          address: '/about.html'
          title: 'Почему мы?'
          description: 'Причины выбрать Hosting Node как Ваш хостинг, с оперативнрй поддержкой, помощью, низкими тарифами и доступными цены'
          keywords: 'Konnect Responsive web template, Bootstrap Web Templates, Flat Web Templates, Andriod Compatible web template, Smartphone Compatible web template, free webdesigns for Nokia, Samsung, LG, SonyErricsson, Motorola web design'
          view: 'about'
        }
        {
          address: '/blog.html'
          view: 'blog'
          title: 'О нас'
          keywords: 'hosting, node, linux, windows, хостинг, линукс, ноде, джаваскрипт, яваскрипт, нода, нодежс'
          description: 'Рассказ о Hosting Node Ваш хостинг, оперативная поддержка, помощь, низкие тарифы и доступные цены. Индивидуальный подход к клиентам'
        }
        {
          title: 'Связаться с нами'
          description: 'Страница связи со специалистами лучшего хостинга в мире!'
          keywords: 'hosting, node, linux, windows, хостинг, линукс, ноде, джаваскрипт, яваскрипт, нода, нодежс'
          view: 'support'
          address: '/support.html'
        }
        {
          address: '/plans.html'
          view: 'plans'
          title: ''
          description: ''
          keywords: 'hosting, node, linux, windows, хостинг, линукс, ноде, джаваскрипт, яваскрипт, нода, нодежс'
        }
        {
          address: '/services(.html)?'
          view: 'services'
          title: ''
          description: ''
          keywords: 'hosting, node, linux, windows, хостинг, линукс, ноде, джаваскрипт, яваскрипт, нода, нодежс'
        }
        {
          address: '/refund.html'
          view: 'refund'
          title: ''
          description: ''
          keywords: 'hosting, node, linux, windows, хостинг, линукс, ноде, джаваскрипт, яваскрипт, нода, нодежс'
        }
      ]
      pageModel.Page.bulkCreate(pages).then ->
        pageModel.Page.all().then (page_list) ->
          page_list.length.should.equal pages.length
          done()
          return
        return
      return
    return
  return

# ---
# generated by js2coffee 2.1.0