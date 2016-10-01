SystemJS.config({
    transpiler: 'plugin-babel',

    map: {
        'plugin-babel': './node_modules/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': './node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',
        // libs
        'navigo': './bower_components/navigo/lib/navigo.js',
        'bootstrap': './bower_components/bootstrap/dist/js/bootstrap.js',
        'jquery': './bower_components/jquery/dist/jquery.js',
        'handlebars': './bower_components/handlebars/handlebars.js',
        'toastr': './bower_components/toastr/toastr.js',
        // scripts
        'app': './scripts/app.js',
        'data': './scripts/data.js',
        'user-data': './scripts/user-data.js',
        // utils
        'validator': './scripts/validator.js',
        'notifier': './scripts/notifier.js',
        'cleaner': './scripts/cleaner.js',
        'kinvey-constants': './scripts/constants/kinvey-constants.js',
        'requester': './scripts/requester.js',
        'templates-loader': './scripts/template-loader.js',
        // controllers
        'controller': './scripts/controllers/controller.js',
        'user-controller': './scripts/controllers/user-controller.js'
    }
});

System.import('app');