/*jshint esversion: 6 */
import { requester as request } from 'requester';
import {kinveyConst} from 'kinvey-constants';
import { notifier } from 'notifier';

let dataService = (function() {

    const HTTP_HEADER_KEY = 'Authorization',
        USER_CREDENTIAL = 'userCredential',
        USER = 'user';


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
        return request.get(url, {
            headers: options.headers
        });
    }

      function getUserInfoById(id, header) {
        let options = {
            headers: {
                [HTTP_HEADER_KEY]: header
            }
        };
        let url = `http://baas.kinvey.com/user/${kinveyConst.APP_ID}/${id}`;
         return request.get(url, {
            headers: options.headers
        });
    }


    function addPost(post) {
        let options = {
            headers: {
                [HTTP_HEADER_KEY]: localStorage.getItem(USER_CREDENTIAL)
            }
        };

        let url = `http://baas.kinvey.com/appdata/${kinveyConst.APP_ID}/Posts`;

        return request.post(url, {
            headers: options.headers,
            data: post
        });
    }

    function getPosts() {
        let options = {
            headers: {
                [HTTP_HEADER_KEY]: localStorage.getItem(USER_CREDENTIAL)
            }
        };
        let url = `http://baas.kinvey.com/appdata/${kinveyConst.APP_ID}/Posts`;

        return request.get(url, {
            headers: options.headers
        });
    }

    function getPost(id) {
         let options = {
            headers: {
                [HTTP_HEADER_KEY]: localStorage.getItem(USER_CREDENTIAL)
            }
        };
         let url = `http://baas.kinvey.com/appdata/${kinveyConst.APP_ID}/Posts/${id}`;
         return request.get(url, options);
    }

     function updatePost(id, body, header) {
        let options = {
            headers: {
                [HTTP_HEADER_KEY]: header
            },
            data: body
        };
        let url = `http://baas.kinvey.com/appdata/${kinveyConst.APP_ID}/Posts/${id}`;
        return request.put(url,options);
    }
    function deletePostFromAdmin(header, id) {
        let options = {
            headers: {
                [HTTP_HEADER_KEY]: header
            }
        };
        let url = `http://baas.kinvey.com/appdata/${kinveyConst.APP_ID}/Posts/${id}`;

        return request.delete(url, options);
    }


    function deletePostFromRegularUser(id) {
        let options = {
            headers: {
                [HTTP_HEADER_KEY]: localStorage.getItem(USER_CREDENTIAL)
            }
        };
        let url = `http://baas.kinvey.com/appdata/${kinveyConst.APP_ID}/Posts/${id}`;

        return request.delete(url, options);
    }




    return {
        // register,
        // login,
        // logout,
        isLoggedIn,
        getUserInfo,
        getPosts,
        addPost,
        getPost,
        updatePost,
        deletePostFromAdmin,
        getUserInfoById,
        deletePostFromRegularUser
    };

}());

export { dataService };
