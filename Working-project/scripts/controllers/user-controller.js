import 'jquery';
import {templatesLoader} from 'templates-loader';
import {notifier} from 'notifier';
import {userData} from 'user-data';
import {validator} from 'validator';
import {cleaner} from 'cleaner';

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
                        notifier.error('Username must be between 5 and 20 symbols!');
                        cleaner.cleanInputField($username);
                        return;
                    }

                    if(!validator.validatePassword(password)) {
                        notifier.error('Password must be between 5 and 20 symbols!');
                        cleaner.cleanInputField($password, $confirmPassword);
                        return;
                    }

                    if(!validator.validateEmail(email)) {
                        notifier.error('E-mail is not valid!');
                        cleaner.cleanInputField($email);
                        return;
                    }

                    if(password !== confirmPassword) {
                        notifier.error('Password doesnt match');
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
                            notifier.success(`${user.username} successfully registered!`);
                            window.location = '#/home';
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
                    //     notifier.error('Username must be between 5 and 20 symbols!');
                    //     cleaner.cleanInputField($username);
                    //     return;
                    // }

                    // if (!validator.validatePassword(password)) {
                    //     notifier.error('Password must be between 5 and 20 symbols!');
                    //     cleaner.cleanInputField($password, $confirmPassword);
                    //     return;
                    // }

                    let user = {
                        username,
                        password
                    };

                    userData.login(user)
                        .then((user) => {
                            notifier.success(`${user.username} successfully logged in!`);
                            window.location = '#/home';
                        })
                        .catch((err) => {
                            notifier.error(`${err} occured`);
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
                notifier.success(`You have logged out successfully!`);
                window.location = '#/home';
            })
            .catch((err) => {
                notifier.error('You are not logged in');
                console.log(err);
            })
    }
}

const userController = new UserController();

export {userController};