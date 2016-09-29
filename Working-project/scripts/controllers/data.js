/*jshint esversion: 6 */
import { requester as request } from './requester.js';

let dataService = (function() {

    const HTTP_HEADER_KEY = 'Authorization',
        USER_CREDENTIAL = 'userCredential',
        USER = 'user';


    function register(user) {
        let token = 'kid_r1xa-7ta:4d06f90f827d47ebab23e57efb7556e5';
        let options = {
            headers: {
                [HTTP_HEADER_KEY]: 'Basic ' + btoa(token)
            }
        };

        let url = 'http://baas.kinvey.com/user/kid_r1xa-7ta';

        return request.postJSON(url, user, options).
        then((data) => {
            localStorage.setItem(USER_CREDENTIAL, 'Basic ' + btoa(user.userName + ':' + user.password));
             localStorage.setItem(USER, user.username);
            return data;
        });
    }

    function login(user) {
        let token = 'kid_r1xa-7ta:4d06f90f827d47ebab23e57efb7556e5';
        let options = {
            headers: {
                [HTTP_HEADER_KEY]: 'Basic ' + btoa(token)
            }
        };
        let url = 'http://baas.kinvey.com/user/kid_r1xa-7ta/login';

        return request.postJSON(url, user, options).
        then((data) => {
            localStorage.setItem(USER_CREDENTIAL, 'Basic ' + btoa(user.username + ':' + user.password));
            localStorage.setItem(USER, user.username);
            return data;
        });
    }

    function logout() {
        return Promise.resolve().
        then(() =>{
         localStorage.removeItem(USER_CREDENTIAL);
         localStorage.removeItem(USER);
     });
    }

    function isLoggedIn() {
        return Promise.resolve().
        then(() => !!localStorage.getItem(USER_CREDENTIAL));
    }

    function getUserInfo() {
        let options = {
            headers: {
                [HTTP_HEADER_KEY]: localStorage.getItem(USER_CREDENTIAL)
            }
        };
        let url = 'http://baas.kinvey.com/user/kid_r1xa-7ta/_me';
        return request.getJSON(url, options);
    }

    function addPost(post) {
        let options = {
            headers: {
                [HTTP_HEADER_KEY]: localStorage.getItem(USER_CREDENTIAL)
            }
        };

        let url = 'http://baas.kinvey.com/appdata/kid_r1xa-7ta/Posts';

        return request.postJSON(url, post, options);
    }

    function getPosts() {
        let options = {
            headers: {
                [HTTP_HEADER_KEY]: localStorage.getItem(USER_CREDENTIAL)
            }
        };
        let url = 'http://baas.kinvey.com/appdata/kid_r1xa-7ta/Posts';

        return request.getJSON(url, options);
    }

    return {
        register,
        login,
        logout,
        isLoggedIn,
        getUserInfo,
        getPosts,
        addPost
    };

}());

export { dataService };
