/*jshint esversion: 6 */

import {kinveyConst} from 'kinvey-constants';
import {requester} from 'requester';
import 'jquery';

const HTTP_HEADER_KEY = 'Authorization',
        USER_CREDENTIAL = 'userCredential',
        USER = 'user';

class UserData {
    register(user) {
        let token = `${kinveyConst.APP_ID}:${kinveyConst.APP_SECRET}`;
        let options = {
            headers: {
                [HTTP_HEADER_KEY]: 'Basic ' + btoa(token)
            }
        };

        let url = `https://baas.kinvey.com/user/${kinveyConst.APP_ID}`;

        let theUser = {
            username: user.username,
            password: user.password,
            fullName: user.fullName,
            email: user.email,
            isAdmin: user.isAdmin
        };

        return requester.post(url, {
            headers: options.headers,
            data: theUser
        }).
        then((data) => {
            if (!data.isAdmin){
                 localStorage.setItem(USER_CREDENTIAL, 'Basic ' + btoa(user.username + ':' + user.password));
                  localStorage.setItem(USER, user.username);
                  localStorage.setItem('userID', data._id);
            }

             return data;
        });
    }

    login(user) {
        let token = `${kinveyConst.APP_ID}:${kinveyConst.APP_SECRET}`;
        let options = {
            headers: {
                [HTTP_HEADER_KEY]: 'Basic ' + btoa(token)
            }
        };
        let url = `https://baas.kinvey.com/user/${kinveyConst.APP_ID}/login`;

        return requester.post(url, {
            headers: options.headers,
            data: user
        }).
        then((data) => {
            localStorage.setItem(USER_CREDENTIAL, 'Basic ' + btoa(user.username + ':' + user.password));
            localStorage.setItem(USER, user.username);
            localStorage.setItem('userID', data._id);
            return data;
        });
    }

    logout() {
        return Promise.resolve().
        then(() =>{
            localStorage.removeItem(USER_CREDENTIAL);
            localStorage.removeItem(USER);
            localStorage.removeItem('userID');
        })
        .then(() => {
            window.location = '#/home';
        });
    }
}

const userData = new UserData();

export {userData};