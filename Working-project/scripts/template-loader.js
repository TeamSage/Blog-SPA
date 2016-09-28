/*jshint esversion: 6 */
import { requester as request } from './controllers/requester.js';

let templatesLoader = {
    get: function(name) {
        let url = `/templates/${name}.html`;
        return request.get(url);
    }
};

export { templatesLoader };