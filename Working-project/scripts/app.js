/*jshint esversion: 6 */
import Navigo from 'navigo';
import { controller } from 'controller';

let router = new Navigo(null, true);

// router.on(() => {
// 	console.log('haha');
// 	router.navigate('/home');
// }).resolve();

router.
	on('login', controller.login).
	on('register', controller.register).
	on('logout', controller.logout).
	on('user-panel', controller.showUserPanel).
	on('home', controller.home).
	on('posts', controller.showPosts).
	on('posts/:user', (params) => controller.showUserPosts(params)).
	on(() => {
		router.navigate('/home');
	}).
	resolve();

