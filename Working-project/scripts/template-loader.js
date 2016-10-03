/*jshint esversion: 6 */

import Handlebars from 'handlebars';

function loadTemplate(templateName) {
    let templateUrl = `./templates/${templateName}.html`;

    return new Promise(function (resolve, reject) {
        $.ajax({
            url: templateUrl,
            success: function (data) {
                let template = Handlebars.compile(data);
                resolve(template);
            },
            error: function (err) {
                reject(err);
            }
        });
    });
}

class TemplatesLoader {
    load(templateName) {
        return loadTemplate(templateName);
    }
}

var templatesLoader = new TemplatesLoader();

loadTemplate('facebookShare').then(function(template) {
  Handlebars.registerPartial('facebookShare', template);
});


export {templatesLoader};
