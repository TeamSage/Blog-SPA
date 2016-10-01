/*jshint esversion: 6 */

import { dataService } from 'data';
import { templatesLoader } from 'templates-loader';
import { userData } from 'user-data';
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
    }

        //TODO- load posts 
        // templatesLoader.get('home').
        //     then((templateHTML) => {
        //         let template = Handlebars.compile(templateHTML);
        //         let html = template();
        //         $('#container').html(html);
        //     });
    

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
                        dislikes,
                        "_ic": localStorage.getItem("userCredential")

                    };
                    dataService.addPost(post);

                });

                $('#btn-add-admin').on('click', (ev) => {
                    let username = $('#admin-name').val();
                    let password = $('#admin-pass').val();

                    let admin = {
                        username,
                        password,
                        'isAdmin': true
                    };
                    
                     userData.register(admin)
                        .then((user) => {
                            notifier.success(`${user.username} successfully registered!`);
                            window.location = '#/home';
                        })
                        .catch((err) => {
                            notifier.error(err);
                            console.log(err);
                        });
                });
            });
        });
    }

    function showPosts() {
        Promise.all([dataService.getPosts(), templatesLoader.load('initial-posts'), templatesLoader.load('most-rated'), templatesLoader.load('most-recent')]).
        then(([postsInfo, templateHTML, rated, liked]) => {
            let mostRated = postsInfo.sort((p1, p2) => {
                return (p2.likes - p1.likes);
            }).slice(0, 4);
           
            let lastAdded = postsInfo.slice(0, 4);

            let html = templateHTML(postsInfo);
            $('#wrapper').html(html);

            let ratedHTML = rated(mostRated);
            $('#most-rated').html(ratedHTML);

            let addedHTML = liked(lastAdded);
            $('#most-recent').html(addedHTML);
        });

    }

    function postWorking() {
        Promise.all([dataService.getPosts(), dataService.getUserInfo(), templatesLoader.load('posts')]).
        then(([posts, userInfo, templateHTML]) => {
            let projectionOfPosts = posts.map((p) => {
                let isOwn = p._acl.creator === localStorage.getItem('userID');
                let isAdmin = userInfo.isAdmin;
                if (isAdmin) {
                    isOwn = false;
                }
                return {
                    data: p,
                    isOwn,
                    isAdmin
                };
            });

            $('#wrapper').html(templateHTML(projectionOfPosts));

            $('.btn-del-regular').on('click', function() {

                let dataID = $(this).attr('data-id');

            });

            $('.btn-del-admin').on('click', function() {
                let dataID = $(this).attr('data-id');
                let dataCre = $(this).attr('data-cre');

                dataService.deletePostFromAdmin(dataCre, dataID)
                    .then(() => window.redi);

                window.location = "#/posts";
            });

            $('.btn-like').on('click', function() {
                let dataID = $(this).attr('data-id');
                let dataCre = $(this).attr('data-cre');

                dataService.getPost(dataID, dataCre)
                    .then((data) => {
                         let newData = {
                            title: data.title,
                            content: data.content,
                            categoryes: data.categoryes,
                            user: data.user,
                            likes: data.likes + 1,
                            dislikes: data.dislikes,
                            "_ic": data._ic,
                        };
                        return newData;

                    }).then((newData) => {
                        dataService.updatePost(dataID, newData, newData._ic);
                    });
            });
        });
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
