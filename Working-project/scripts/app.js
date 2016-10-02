/*jshint esversion: 6 */
import Navigo from 'navigo';
import { controller } from 'controller';
import {userController} from 'user-controller';

let router = new Navigo(null, true);

router.
	on('login', userController.login).
	on('about', controller.showAbout).
	on('register', userController.register).
	on('logout', userController.logout).
	on('user-panel', controller.showUserPanel).
	on('posts/:id', (params) => controller.showPostByID(params)).
	on('posts', (params) => controller.postWorking(params)).
	on('user/:userID', (params) => controller.showUserPosts(params)).
	on('home', controller.home).
	on(() => {
		router.navigate('/home');
	}).
	resolve();

