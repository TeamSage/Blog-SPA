/*jshint esversion: 6 */

let dataRequest = (function() {

    function regUser(username, password, isAdmin) {
        let obj = { username, password };

        if (isAdmin) {
            obj['isAdmin'] = isAdmin;
        }

        let token = 'kid_rk6Wp6yT:c706f76d3e0544e599b972a667b9a1c5';
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'http://baas.kinvey.com/user/kid_rk6Wp6yT',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(obj),
                headers: { 'Authorization': 'Basic ' + btoa(token) },
                success: function(data) {
                    resolve(data);
                },
                error: function(err) {
                    reject(JSON.parse(err.responseText));
                }
            });
        });
    }

    function retrieveInfo(username, password) {
        return new Promise((resolve, reject) => {
            $.ajax({
                beforeSend: function(request) {
                    request.setRequestHeader('Authorization', 'Basic ' + btoa(username + ':' + password));
                },
                url: 'http://baas.kinvey.com/user/kid_rk6Wp6yT/_me',
                dataType: "json",
                method: 'GET',
                contentType: 'application/json',
                success: function(data) {
                    console.log(data);
                    resolve(data);
                },
                error: (er) => reject(JSON.parse(er.responseText)),
            });
        });
    }

    function userLogIn(username, password) {
        let token = 'kid_rk6Wp6yT:c706f76d3e0544e599b972a667b9a1c5';
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'http://baas.kinvey.com/user/kid_rk6Wp6yT/login',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ username, password }),
                headers: { 'Authorization': 'Basic ' + btoa(token) },
                success: function(data) {
                    resolve(data);
                },
                error: function(err) {
                    reject(JSON.parse(err.responseText));
                }
            });
        });
    }

    function addMovie(name) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: '   http://baas.kinvey.com/appdata/kid_rk6Wp6yT/movies',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ name }),
                headers: { 'Authorization': localStorage.userCredential },
                success: function(data) {
                    resolve(data);
                },
                error: function(err) {
                    reject(JSON.parse(err.responseText));
                }
            });
        });
    }

    function retrieveMovies() {
        return new Promise((resolve, reject) => {
            $.ajax({
                beforeSend: function(request) {
                    request.setRequestHeader('Authorization', localStorage.userCredential);
                },
                url: 'http://baas.kinvey.com/appdata/kid_rk6Wp6yT/movies',
                method: 'GET',
                contentType: 'application/json',
                success: function(data) {
                    console.log(data);
                    resolve(data);
                },
                error: (er) => reject(JSON.parse(er.responseText))
            });
        });
    }

    function getMovie(id) {

        return new Promise((resolve, reject) => {
            $.ajax({
                url: `http://baas.kinvey.com/appdata/kid_rk6Wp6yT/movies/${id}`,
                method: 'GET',
                contentType: 'application/json',
                headers: { 'Authorization': localStorage.userCredential },
                success: function(data) {
                    console.log(data);
                    resolve(data);
                },
                error: (er) => reject(JSON.parse(er.responseText))
            });
        });
    }

    function addActor(id, actor) {

        return new Promise((resolve, reject) => {
            getMovie(id)
                .then((data) => {
                    if (!data.actors) {
                        data.actors = [];
                    }
                    data.actors.push(actor);
                    console.log(id);
                    $.ajax({
                        url: `http://baas.kinvey.com/appdata/kid_rk6Wp6yT/movies/${id}`,
                        method: 'PUT',
                        contentType: 'application/json',
                        data: JSON.stringify(data),
                        headers: { 'Authorization': localStorage.userCredential },
                        success: function(data) {
                            console.log(data);
                            resolve(data);
                        },
                        error: (er) => reject(JSON.parse(er.responseText))
                    });
                });
        });
    }

    function deleteMovie(id) {
        return new Promise((resolve, reject) => {
            $.ajax({
                beforeSend: function(request) {
                    request.setRequestHeader('Authorization', localStorage.userCredential);

                },
                url: `http://baas.kinvey.com/appdata/kid_rk6Wp6yT/movies/${id}`,
                method: 'DELETE',
                contentType: 'application/json',
                headers: { 'Authorization': localStorage.userCredential },
                success: function(data) {
                    resolve(data);
                },
                error: (er) => {
                    reject(JSON.parse(er.responseText));
                }
            });
        });
    }
    return {
        reg: regUser,
        getInfo: retrieveInfo,
        login: userLogIn,
        add: addMovie,
        getAll: retrieveMovies,
        get: getMovie,
        delete: deleteMovie,
        addActor: addActor
    };
}());

export { dataRequest };
