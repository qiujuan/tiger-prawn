$(function () {
  $('.morris-data').each(function () {
    var data = JSON.parse(this.innerHTML);
    data.element = $(this).data('target');
    new Morris.Line(data);
  });

  function isLogin() {
    body.start(true);
    var route = Backbone.history.start({
      root: '/tiger-prawn/'
    });
    if (!route) {
      location.hash = '#/dashboard';
    }
  }
  function notLogin() {
    body.start();
    location.hash = '#/user/login'
    Backbone.history.start({
      root: '/tiger-prawn'
    });
  }

  // start here
  var context = Nervenet.createContext()
    , me = new tp.model.Me()
    , body = new tp.view.Body({
      el: 'body'
    });

  // map values
  context
    .mapValue('me', me)
    .mapValue('body', body);
  context
    .inject(me)
    .inject(tp.component.Manager)
    .inject(tp.popup.Manager)
    .inject(tp.service.Manager)
    .mapEvent('edit-model', tp.controller.editModelCommand);

  // routers
  context.createInstance(tp.router.Base);
  context.createInstance(tp.router.AD);
  context.createInstance(tp.router.Stat);

  // 验证用户身份
  me.fetch({
    success: isLogin,
    error: notLogin
  });

  // GA
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-35957679-15', 'auto');
  ga('send', 'pageview');
});