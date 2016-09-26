/*jshint esversion: 6 */
let templateLoader = (function() {

	 function get (templateName) {
		return new Promise((resolve, reject) => {
			$.get(`/templates/${templateName}.handlebars`)
				.done((data) => {
					let template = Handlebars.compile(data);
					resolve(template);
				})
				.fail(reject);
		});
	}

	return { 
		get
	};
})();

export { templateLoader };