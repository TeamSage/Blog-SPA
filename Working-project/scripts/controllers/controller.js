/*jshint esversion: 6 */
import { dataService } from 'data';
import { templatesLoader } from 'templates-loader';

let controller = (function() {

    function home() {
        dataService.isLoggedIn().
        then((isLoggedIn) => {
            if (isLoggedIn) {
                showPosts();
            } else {
                templatesLoader.load('index-notLoggedIn')
                    .then((templ) => $('#wrapper').html(templ));
            }
        });


        //TODO- load posts 
        // templatesLoader.get('home').
        //     then((templateHTML) => {
        //         let template = Handlebars.compile(templateHTML);
        //         let html = template();
        //         $('#container').html(html);
        //     });
    }

    // function register() {
    //     dataService.isLoggedIn().
    //     then((isLoggedIn) => {
    //         if (isLoggedIn) {
    //             window.location = '#/home';
    //             return;
    //         }

    //         templatesLoader.load('register').
    //         then((templateHTML) => {
    //             $('#wrapper').html(templateHTML);
    //         }).then(() => {
    //             $('#btn-reg').on('click', (ev) => {
    //                 let userName = $('#firstName').val();
    //                 let password = $('#password').val();
    //                 let user = {
    //                     username,
    //                     password
    //                 };
    //                 dataService.register(user).
    //                 then(() => {
    //                     toggleClassWhenLoggedIn();
    //                     window.location = '#/home';
    //                 });
    //                 ev.preventDefault();
    //                 return false;
    //             });
    //         });
    //     });
    // }

    // function login() {
    //     dataService.isLoggedIn().
    //     then((isLoggedIn) => {
    //         if (isLoggedIn) {
    //             window.location = '#/home';
    //             return;
    //         }

    //         templatesLoader.load('login').
    //         then((templateHTML) => {
    //                 $('#wrapper').html(templateHTML);
    //             })
    //             .then(() => {
    //                 $('#btn-log').on('click', (ev) => {
    //                     let username = $('#userName-log').val();
    //                     let password = $('#password-log').val();
    //                     let user = {
    //                         username,
    //                         password
    //                     };

    //                     dataService.login(user).
    //                     then(() => {
    //                         toggleClassWhenLoggedIn();
    //                         window.location = '#/home';
    //                     });
    //                     ev.preventDefault();
    //                     return false;
    //                 });
    //             });
    //     });
    // }

    // function logout() {
    //     dataService.logout().
    //     then(() => {
    //         toggleClassWhenLoggedOut();
    //         window.location = '#/home';
    //     });
    // }

    function showUserPanel() {
        dataService.isLoggedIn().
        then((isLoggedIn) => {
            if (!isLoggedIn) {
                window.location = "#/home";
                return;
            }

            Promise.all([dataService.getUserInfo(), templatesLoader.load('userpanel')]).
            then(([userInfo, templateHTML]) => {
                $('#wrapper').html(templateHTML(userInfo));

                $('#btn-post-add').on('click', (ev) => {
                    let content = $('#content-post').val();
                    let title = $('#title-post').val();
                    let categoryes = $('#category-post').val().split(',').
                    filter(el => el.length !== 0).
                    map((el) => el.trim());

                    let user = localStorage.getItem('user');
                    let likes = 1;
                    let dislikes = 0;
                    let post = {
                        title,
                        content,
                        categoryes,
                        user,
                        likes,
                        dislikes
                    };
                    dataService.addPost(post);

                });

                $('#btn-add-admin').on('click', (ev) => {
                    let username = $('#admin-name').val();
                    let password = $('#admin-pass').val();

                    let admin = {
                        username,
                        password,
                        'isAdmin' : true
                    };
                    dataService.register(admin);
                });
            });
        });
    }

    function showPosts() {
        Promise.all([dataService.getPosts(), templatesLoader.load('post'), templatesLoader.load('most-rated')]).
        then(([postsInfo, templateHTML, rated]) => {
            let mostRated = postsInfo.sort((p1, p2) => {
                return (p2.likes - p1.likes);
            }).slice(0, 4);
            localStorage.setItem('mostRated', mostRated);

            let lastAdded = postsInfo.slice(0, 4);
            localStorage.setItem('lastAdded', lastAdded);


            let html = templateHTML(postsInfo);
            $('#wrapper').html(html);

            let ratedHTML = rated(mostRated);
            $('#most-rated').html(ratedHTML);
            //append to 
            //Add event listener to buttons.

        });


    }   

    function postWorking() {
        Promise.all([dataService.getPosts(), templatesLoader.load('post')]).
            then(([posts, templateHTML]) => {
                let projectionOfPosts = posts.map((p) => {
                    let isOwn = p._acl.creator === localStorage.getItem('userID');
                    return  {
                        data: p,
                        isOwn
                    };
                });

                $('#wrapper').html(templateHTML(projectionOfPosts));

                $('.btn-del').on('click',function(){
                    
                    let dataID = $(this).attr('data-id');

                    dataService.deletePost(dataID);
                    debugger;
                   
                    //dataService.deletePost(url);
                });
            });
    }

    function loadPopularPosts() {

    }

    function showUserPosts(params) {
        //debugger;
        Promise.all([dataService.getPosts(), templatesLoader.load('user')]).
        then(([posts, templateHTML]) => {
            posts = posts.filter((post) => {
                return post.user === params.user;
            });


            let user = params.user;
            let obj = {
                user,
                posts
            };
            $('#wrapper').html(templateHTML(obj));
        });
    }

    function toggleClassWhenLoggedIn() {
        $('#register-link').addClass('hidden');
        $('#login-link').addClass('hidden');
        $('#logout-link').removeClass('hidden');
        $('#userpanel-link').removeClass('hidden');

    }

    function toggleClassWhenLoggedOut() {
        $('#register-link').removeClass('hidden');
        $('#login-link').removeClass('hidden');
        $('#logout-link').addClass('hidden');
        $('#userpanel-link').addClass('hidden');

    }

    return {
        // register,
        // login,
        // logout,
        showUserPanel,
        showPosts,
        home,
        showUserPosts,
        postWorking
    };

}());

export { controller };
