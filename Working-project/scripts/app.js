/*jshint esversion: 6 */
import { controller } from './controllers/controller.js';

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
	on(() => {
		router.navigate('/home');
	}).
	resolve();

