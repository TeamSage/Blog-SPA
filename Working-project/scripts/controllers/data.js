/*jshint esversion: 6 */
import { requester as request } from './requester.js';

let dataService = (function() {

    const HTTP_HEADER_KEY = 'Authorization',
        USER_CREDENTIAL = 'userCredential';


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
            return data;
        });
    }

    function logout() {
        return Promise.resolve().
        then(() => localStorage.removeItem(USER_CREDENTIAL));
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
        let url = 'http://baas.kinvey.com/user/kid_rk6Wp6yT/_me';
        return request.getJSON(url, options);
    }

    function getPosts() {
        let options = {
            headers: {
                [HTTP_HEADER_KEY]: localStorage.getItem(USER_CREDENTIAL)
            }
        };
        let url = 'http://baas.kinvey.com/appdata/kid_r1xa/movies';

        return request.getJSON(url, options);
    }

    return {
        register,
        login,
        logout,
        isLoggedIn,
        getUserInfo,
        getPosts

    };

}());

export { dataService };
