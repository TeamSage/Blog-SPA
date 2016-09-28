/*jshint esversion: 6 */
import { requester as request } from './requester.js';

let dataService = (function() {
	function register(user) {
		 let token = 'kid_r1xa-7ta:4d06f90f827d47ebab23e57efb7556e5';
		 let headers = { 'Authorization': 'Basic ' + btoa(token) };
		 let url = 'http://baas.kinvey.com/user/kid_r1xa-7ta';
		 
		 return request.postJSON(user, headers);
	}

	function login(user) {
		let token = 'kid_r1xa-7ta:4d06f90f827d47ebab23e57efb7556e5';
		let headers = { 'Authorization': 'Basic ' + btoa(token) };
		let url = 'http://baas.kinvey.com/user/kid_r1xa-7ta';

		 return request.postJSON(user, headers);
	}

	function logout() {

	}

	function isLoggedIn() {

	}


}());