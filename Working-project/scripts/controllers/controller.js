/*jshint esversion: 6 */
import { dataService } from './data.js';
import { templatesLoader } from '../template-loader.js';

let controller = (function() {

	function home() {
		dataService.isLoggedIn().
        then((isLoggedIn) => {
            if (isLoggedIn) {
              
            }
        });
        //TODO- load posts 
        templatesLoader.get('home').
            then((templateHTML) => {
                let template = Handlebars.compile(templateHTML);
                let html = template();
                $('#container').html(html);
            });
	}

    function register() {
        dataService.isLoggedIn().
        then((isLoggedIn) => {
            if (isLoggedIn) {
                window.location = '#/home';
                return;
            }

            templatesLoader.get('register').
            then((templateHTML) => {
                let template = Handlebars.compile(templateHTML);
                let html = template();
                $('#container').html(html);

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
                });
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

            templatesLoader.get('login').
            then((templateHTML) => {
                let template = Handlebars.compile(templateHTML);
                let html = template();
                 $('#container').html(html);

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

            Promise.all([dataService.getUserInfo, templatesLoader.get('user-panel')]).
            then(([userInfo, templateHTML]) => {
                let template = Handlebars.compile(templateHTML);
                let html = template(userInfo);

                //append to 
                //Add event listener to buttons.
            });
        });
    }

    function showPosts() {
        Promise.all([dataService.getPosts, templatesLoader.get('posts')]).
        then(([postsInfo, templateHTML]) => {
            let template = Handlebars.compile(templateHTML);
            let html = template(postsInfo);
            //append to 
            //Add event listener to buttons.

        });


    }

    function toggleClassWhenLoggedIn() {
    	$('#register-link').addClass('hidden');
        $('#login-link').addClass('hidden');
        $('#logout-link').removeClass('hidden');
    }

    function toggleClassWhenLoggedOut() {
    	$('#register-link').removeClass('hidden');
        $('#login-link').removeClass('hidden');
        $('#logout-link').addClass('hidden');
    }

    return {
        register,
        login,
        logout,
        showUserPanel,
        showPosts,
        home
    };

}());

export { controller };
