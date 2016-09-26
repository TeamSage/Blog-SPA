/*jshint esversion: 6 */
import { dataRequest } from './data.js';
import { templateLoader as templ } from './template-loader.js';
let router = new Navigo(null, false);

router.on(() => {
    console.log('asd');
    templ.get('main-page')
        .then((data) => {
            $('#wrapper').html(data);
        });
}).resolve();

router.
on('log-reg', (params) => {
    templ.get('login')
        .then((data) => {
            $('#wrapper').html(data);

        });
}).resolve();

router.on('log', (params) => {
    let userName = $('#username').val();
    let password = $('#password').val();

    Promise.all([dataRequest.login(userName, password), templ.get('user-panel')])
        .then(([info, template]) => {

            localStorage.setItem('authtoken', info._kmd.authtoken);
            localStorage.setItem('userID', info._id);
            localStorage.setItem('userCredential', 'Basic ' + btoa(userName + ':' + password));
            localStorage.setItem('isAdmin', info.isAdmin);


            let html = template(info);
            $('#wrapper').html(html);
        });
}).resolve();

router.on('register', (params) => {
    let userName = $('#username').val();
    let password = $('#password').val();

    let isAdmin = document.getElementById('check').checked;

    Promise.all([dataRequest.reg(userName, password, isAdmin), templ.get('user-panel')])
        .then(([info, template]) => {

            localStorage.setItem('authtoken', info._kmd.authtoken);
            localStorage.setItem('userID', info._id);
            localStorage.setItem('userCredential', 'Basic ' + btoa(userName + ':' + password));
            localStorage.setItem('isAdmin', info.isAdmin);


            let html = template(info);
            $('#wrapper').html(html);
        });
}).resolve();

router.on('logout', (params) => {
    localStorage.clear();
    router.navigate('');

}).resolve();

router.on('add', (params) => {
    let movieName = $('#movieName').val();
    dataRequest.add(movieName);

}).resolve();

router.on('listMovies', (params) => {
    Promise.all([dataRequest.getAll(), templ.get('list-movies')])
        .then(([info, template]) => {
            info = info.filter((el) => el._acl.creator === localStorage.userID);
            $('#wrapper').html(template(info));
        });
}).resolve();

router.on('listMovies/:id', (params) => {
    Promise.all([dataRequest.get(params.id), templ.get('movie-info')])
        .then(([movie, template]) => {
            console.log(movie);
            $('#wrapper').html(template(movie));
            localStorage.setItem('movieID', params.id);
        }).then(() => {

            $('#add-actor').on('click', (ev) => {
                let actor = $('#actor').val();
                dataRequest.addActor(localStorage.movieID, actor)
                    .then( () => {
                        router.navigate(`listMovies/${localStorage.movieID}`);
                    });
            });
        });

}).resolve();




$('#btn-reg').on('click', (ev) => {
    let username = $('#username').val();
    let password = $('#password').val();

    dataRequest.reg(username, password)
        .then((info) => {
            console.log(info._kmd.authtoken);
            localStorage.setItem('authtoken', info._kmd.authtoken);
            localStorage.setItem('userID', info);
            localStorage.setItem('userCredential', btoa('Basic ' + info.username + ':' + info.password));
            console.log(info);
        });

});

$('#btn-log').on('click', (ev => {
    let username = $('#user').val();
    let password = $('#pass').val();

    dataRequest.login(username, password)
        .then((info) => {
            console.log(username);
            console.log(password);

            localStorage.setItem('authtoken', info._kmd.authtoken);
            localStorage.setItem('userID', info._id);
            localStorage.setItem('userCredential', 'Basic ' + btoa(username + ':' + password));

            console.log(info);
        });

}));

$('#btn-add').on('click', (ev) => {
    let movieName = $('#movie').val();
    dataRequest.add(movieName)
        .then((info) => {
            console.log(info);

        });

});

$('#btn-generate').on('click', (ev) => {
    dataRequest.getAll()
        .then((info) => console.log(info));
});
