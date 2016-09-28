
let templatesLoader = {
    get: function(name) {
        let url = `/templates/${name}.html`;
        return requester.get(url);
    }
};

export { templatesLoader };