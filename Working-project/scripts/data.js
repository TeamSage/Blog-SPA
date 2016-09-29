/*jshint esversion: 6 */
import { requester as request } from 'requester';
import {kinveyConst} from 'kinvey-constants';

let dataService = (function() {

    const HTTP_HEADER_KEY = 'Authorization',
        USER_CREDENTIAL = 'userCredential',
        USER = 'user';


    function register(user) {
        let token = `${kinveyConst.APP_ID}:${kinveyConst.APP_SECRET}`;
        let options = {
            headers: {
                [HTTP_HEADER_KEY]: 'Basic ' + btoa(token)
            }
        };

        let url = `http://baas.kinvey.com/user/${kinveyConst.APP_ID}`;

        return request.postJSON(url, user, options).
        then((data) => {
            localStorage.setItem(USER_CREDENTIAL, 'Basic ' + btoa(user.userName + ':' + user.password));
             localStorage.setItem(USER, user.username);
            return data;
        });
    }

    function login(user) {
        let token = `${kinveyConst.APP_ID}:${kinveyConst.APP_SECRET}`;
        let options = {
            headers: {
                [HTTP_HEADER_KEY]: 'Basic ' + btoa(token)
            }
        };
        let url = `http://baas.kinvey.com/user/${kinveyConst.APP_ID}/login`;

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
        let url = `http://baas.kinvey.com/user/${kinveyConst.APP_ID}/_me`;
        return request.getJSON(url, options);
    }

    function addPost(post) {
        let options = {
            headers: {
                [HTTP_HEADER_KEY]: localStorage.getItem(USER_CREDENTIAL)
            }
        };

        let url = `http://baas.kinvey.com/appdata/${kinveyConst.APP_ID}/Posts`;

        return request.postJSON(url, post, options);
    }

    function getPosts() {
        let options = {
            headers: {
                [HTTP_HEADER_KEY]: localStorage.getItem(USER_CREDENTIAL)
            }
        };
        let url = `http://baas.kinvey.com/appdata/${kinveyConst.APP_ID}/Posts`;

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
