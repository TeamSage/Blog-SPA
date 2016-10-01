/*jshint esversion: 6 */
import 'jquery';

function send(method, url, options) { 
    options = options || {};

    var headers = options.headers || {},
        data = options.data || undefined;

    var promise = new Promise(function (resolve, reject) {
        $.ajax({
            url: url,
            method: method,
            contentType: 'application/json',
            headers: headers,
            data: JSON.stringify(data),
            success: function (res) {
                resolve(res);
            },
            error: function (err) {
                reject(err);
            }
        });
    });
    return promise;
 }

 class Requester {
     get(url, options) {
         return send('GET', url, options);
     }

     post(url, options) {
         return send('POST', url, options);
     }

     put(url, options) {
         return send('PUT', url, options);
     }
 }

const requester = new Requester();

export {requester};

// 
// 
// let requester = {
    // get(url) {
        // let promise = new Promise((resolve, reject) => {
            // $.ajax({
                // url,
                // method: 'GET',
                // success(response) {
                    // resolve(response);
                // },
                // error(err) {
                    // reject(err);
                // }
            // });
        // });
        // return promise;
    // },
    // putJSON(url, body, options = {}) {
    	// let headers = options.headers || {};
        // let promise = new Promise((resolve, reject) => {
            // $.ajax({
                // url,
                // method: 'PUT',
                // contentType: 'application/json',
                // data: JSON.stringify(body),
                // headers,
                // success(data) {
                    // resolve(data);
                // },
                // error(err) {
                    // reject(JSON.parse(err.responseText));
                // }
            // });
        // });
        // return promise;
    // },
    // postJSON(url, body, options = {}) {
    	// let headers = options.headers || {};
    	// let promise = new Promise((resolve, reject) => {
    		// $.ajax({
    			// url,
    			// method: 'POST',
    			// contentType: 'application/json',
    			// data: JSON.stringify(body),
    			// headers,
                // success(data) {
                    // resolve(data);
                // },
                // error(err) {
                    // reject(JSON.parse(err.responseText));
                // }
    		// });
    	// });
    	// return promise;
    // },
    // getJSON(url, options = {}) {
    	// let headers = options.headers || {};
    	// let promise = new Promise((resolve, reject) => {
    		// $.ajax({
    			// url,
    			// method: 'GET',
    			// headers,
                // success(response) {
                    // resolve(response);
                // },
                // error(err) {
                    // reject(JSON.parse(err.responseText));
                // }
    		// });
    	// });
// 
        // return promise;
    // }
// 
// };
// 
// export { requester };
// 