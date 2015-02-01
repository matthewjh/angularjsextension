requirejs.config({
    baseUrl: 'scripts',
    paths: {
        angular: '../../bower_components/angular/angular',
        'angular-mocks': '../../bower_components/angular-mocks/angular-mocks',
        'angular-scenario': '../../bower_components/angular-scenario/angular-scenario',
        affix: '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/affix',
        alert: '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/alert',
        button: '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/button',
        carousel: '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/carousel',
        collapse: '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/collapse',
        dropdown: '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/dropdown',
        tab: '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/tab',
        transition: '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/transition',
        scrollspy: '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/scrollspy',
        modal: '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/modal',
        tooltip: '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/tooltip',
        popover: '../../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/popover',
        'es5-shim': '../../bower_components/es5-shim/es5-shim',
        json3: '../../bower_components/json3/lib/json3',
        requirejs: '../../bower_components/requirejs/require'
    },
    shim: {
      angular: {
        exports: 'angular'
      }
    },
    packages: [

    ]
});
