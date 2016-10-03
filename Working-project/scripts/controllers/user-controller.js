import 'jquery';
import {templatesLoader} from 'templates-loader';
import {notifier} from 'notifier';
import {userData} from 'user-data';
import {validator} from 'validator';
import {cleaner} from 'cleaner';
import * as toastr from "toastr";

const mainContainer = $('#wrapper');

class UserController {
    register() {
        templatesLoader.load('register')
            .then((templateHTML) => {
                mainContainer.html(templateHTML);
            })
            .then(() => {
                $('#btn-reg').on('click', (ev) => {
                    let $fullName = $('#fullName'),
                        $username = $('#username'),
                        $password = $('#password'),
                        $confirmPassword = $('#confirmPassword'),
                        $email = $('#email');


                    let fullName = $fullName.val(),
                        username = $username.val(),
                        password = $password.val(),
                        confirmPassword = $confirmPassword.val(),
                        email = $email.val();

                    // Validations
                    if(!validator.validateUser(username)) {
                        toastr.error('Username must be between 5 and 20 symbols!', 'Blog admin');
                        cleaner.cleanInputField($username);
                        return;
                    }

                    if(!validator.validatePassword(password)) {
                        toastr.error('Password must be between 5 and 20 symbols!', 'Blog admin');
                        cleaner.cleanInputField($password, $confirmPassword);
                        return;
                    }

                    if(!validator.validateEmail(email)) {
                        toastr.error('E-mail is not valid!', 'Blog admin');
                        cleaner.cleanInputField($email);
                        return;
                    }

                    if(password !== confirmPassword) {
                        toastr.error('Password doesnt match', 'Blog admin');
                        cleaner.cleanInputField($password, $confirmPassword);
                    }
                        
                    let newUser = {
                        username,
                        password,
                        fullName,
                        email,

                    };

                    userData.register(newUser)
                        .then((user) => {
                            toastr.success('Successfully registered!', 'Blog admin');
                        })
                        .catch((err) => {
                            notifier.error(err);
                            console.log(err);
                        });

                    ev.preventDefault();
                    return false;  
                });
            });
    }

    login() {
        templatesLoader.load('login')
            .then((templateHTML) => {
                mainContainer.html(templateHTML);
            })
            .then(() => {
                $('#btn-log').on('click', (ev) => {

                    let $username = $('#userName-log'),
                        $password = $('#password-log');

                    let username = $username.val(),
                        password = $password.val();

                    // Validations

                    //   if (!validator.validateUser(username)) {
                    //     toastr.error('Username must be between 5 and 20 symbols!', 'Blog admin');
                    //     cleaner.cleanInputField($username);
                    //     return;
                    // }

                    // if (!validator.validatePassword(password)) {
                    //     toastr.error('Password must be between 5 and 20 symbols!', 'Blog admin');
                    //     cleaner.cleanInputField($password, $confirmPassword);
                    //     return;
                    // }

                    let user = {
                        username,
                        password
                    };

                    userData.login(user)
                        .then((user) => {
                            toastr.success('You are logged in!', 'Blog admin');
                        })
                        .catch((err) => {
                            toastr.error(`${err} occured`, 'Blog admin');
                            console.log(err);
                        });

                    ev.preventDefault();
                    return false;
                });

            });
    }
    
    logout() {
        userData.logout()
            .then(() => {
                localStorage.removeItem('user');
                localStorage.removeItem('userCredential');

            })
            .then(() => {
                toastr.success('You are logged out!', 'Blog admin');
            })
            .catch((err) => {
                toastr.error('You are not logged in!', 'Blog admin');
                console.log(err);
            })
    }
}

const userController = new UserController();

export {userController};