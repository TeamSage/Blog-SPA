SystemJS.config({
    transpiler: 'plugin-babel',

    map: {
        'plugin-babel': './node_modules/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': './node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',
        // libs
        'navigo': './bower_components/navigo/lib/navigo.js',
        'bootst rap': './bower_components/bootstrap/dist/js/bootstrap.js',
        'jquery': './bower_components/jquery/dist/jquery.js',
        'handlebars': './bower_components/handlebars/handlebars.js',
        'toastr': './bower_components/toastr/toastr.js',
        // scripts
        'app': './scripts/app.js',
        'data': './scripts/data.js',
        // utils
        'kinvey-constants': './scripts/constants/kinvey-constants.js',
        'requester': './scripts/requester.js',
        'templates-loader': './scripts/template-loader.js',
        // controllers
        'controller': './scripts/controllers/controller.js',
    }
});

System.import('app');