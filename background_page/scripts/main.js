define([
  'config'
  ],
  function() {
    require(['ng-decorator'], function (ngDecorator) {
      alert(ngDecorator.ngModule);
    });

    return 'hello';
  });

