/*jshint esversion: 6 */
import { controller } from './controllers/controller.js';
let router = new Navigo(null, true);

router.
	on('login', controller.login).
	on('home', controller.home).
	on(() => {
		router.navigate('/home');
	}).
	resolve();

