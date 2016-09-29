/*jshint esversion: 6 */
import { dataService } from 'data';
import { templatesLoader } from 'templates-loader';

let controller = (function() {

	function home() {
		dataService.isLoggedIn().
        then((isLoggedIn) => {
            if (isLoggedIn) {
                showPosts();
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

    function register() {
        dataService.isLoggedIn().
        then((isLoggedIn) => {
            if (isLoggedIn) {
                window.location = '#/home';
                return;
            }

            templatesLoader.load('register').
            then((templateHTML) => {
                $('#container').html(templateHTML);
            }).then(() => {
                $('#btn-reg').on('click', (ev) => {
                    let userName = $('#firstName').val();
                    let password = $('#password').val();
                    let user = {
                        userName,
                        password
                    };
                    dataService.register(user).
                    then(() => {
                    	toggleClassWhenLoggedIn();
                        window.location = '#/home';
                    });
                    ev.preventDefault();
                    return false;
            })
            });
        });
    }

    function login() {
        dataService.isLoggedIn().
        then((isLoggedIn) => {
            if (isLoggedIn) {
                window.location = '#/home';
                return;
            }

            templatesLoader.load('login').
            then((templateHTML) => {
                 $('#container').html(templateHTML);
            })
            .then(() => {
                $('#btn-log').on('click', (ev) => {
                let username = $('#userName-log').val();
                let password = $('#password-log').val();
                let user = {
                    username,
                    password
                };

                dataService.login(user).
                then(() => {
                    toggleClassWhenLoggedIn();
                    window.location = '#/home';
                });
                ev.preventDefault();
                return false;
                 });
            });
        });
    }

    function logout() {
        dataService.logout().
        then(() => {
            toggleClassWhenLoggedOut();
            window.location = '#/home';
        });
    }

    function showUserPanel() {
        dataService.isLoggedIn().
        then((isLoggedIn) => {
            if (!isLoggedIn) {
                window.location = "#/home";
                return;
            }

            Promise.all([dataService.getUserInfo(), templatesLoader.load('userpanel')]).
            then(([userInfo, templateHTML]) => {

                 $('#container').html(templateHTML);

                 $('#btn-post-add').on('click', (ev) => {
                    let content = $('#content-post').val();
                    let title = $('#title-post').val();
                    let categoryes = $('#category-post').val().split(',').
                        filter(el => el.length !== 0) .
                        map((el) => el.trim());

                    let user = localStorage.getItem('user');
                    let likes = 0;
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
            });
        });
    }

    function showPosts() {
        //debugger;
        Promise.all([dataService.getPosts(), templatesLoader.get('home')]).
        then(([postsInfo, templateHTML]) => {

            let template = Handlebars.compile(templateHTML);
            let html = template(postsInfo);
             $('#container').html(html);

            //append to 
            //Add event listener to buttons.

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
                $('#container').html(templateHTML);
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
        register,
        login,
        logout,
        showUserPanel,
        showPosts,
        home,
        showUserPosts
    };

}());

export { controller };
