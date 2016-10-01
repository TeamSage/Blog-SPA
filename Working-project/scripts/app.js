/*jshint esversion: 6 */
import Navigo from 'navigo';
import { controller } from 'controller';
import {userController} from 'user-controller';

let router = new Navigo(null, true);

// router.on(() => {
// 	console.log('haha');
// 	router.navigate('/home');
// }).resolve();

router.
	on('login', userController.login).
	on('register', userController.register).
	on('logout', userController.logout).
	on('user-panel', controller.showUserPanel).
	on('home', controller.home).
	on('posts', controller.postWorking).
	on('posts/:user', (params) => controller.showUserPosts(params)).
	on(() => {
		router.navigate('/home');
	}).
	resolve();

