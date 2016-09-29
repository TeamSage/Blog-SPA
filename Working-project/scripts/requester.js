/*jshint esversion: 6 */

let requester = {
    get(url) {
        let promise = new Promise((resolve, reject) => {
            $.ajax({
                url,
                method: 'GET',
                success(response) {
                    resolve(response);
                },
                error(err) {
                    reject(err);
                }
            });
        });
        return promise;
    },
    putJSON(url, body, options = {}) {
    	let headers = options.headers || {};
        let promise = new Promise((resolve, reject) => {
            $.ajax({
                url,
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(body),
                headers,
                success(data) {
                    resolve(data);
                },
                error(err) {
                    reject(JSON.parse(err.responseText));
                }
            });
        });
        return promise;
    },
    postJSON(url, body, options = {}) {
    	let headers = options.headers || {};
    	let promise = new Promise((resolve, reject) => {
    		$.ajax({
    			url,
    			method: 'POST',
    			contentType: 'application/json',
    			data: JSON.stringify(body),
    			headers,
                success(data) {
                    resolve(data);
                },
                error(err) {
                    reject(JSON.parse(err.responseText));
                }
    		});
    	});
    	return promise;
    },
    getJSON(url, options = {}) {
    	let headers = options.headers || {};
    	let promise = new Promise((resolve, reject) => {
    		$.ajax({
    			url,
    			method: 'GET',
    			headers,
                success(response) {
                    resolve(response);
                },
                error(err) {
                    reject(JSON.parse(err.responseText));
                }
    		});
    	});

        return promise;
    }

};

export { requester };
