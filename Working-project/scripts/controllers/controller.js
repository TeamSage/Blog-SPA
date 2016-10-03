/*jshint esversion: 6 */

import { dataService } from 'data';
import { templatesLoader } from 'templates-loader';
import { userData } from 'user-data';
import { notifier } from 'notifier';

let controller = (function() {

    function home() {
        dataService.isLoggedIn().
        then((isLoggedIn) => {
            if (isLoggedIn) {
                showPosts();
            } else {
                $('#most-rated').html('');
                $('#most-recent').html('');
                window.location = '#/login';
            }
        });
    }

    function showUserPanel() {
        dataService.isLoggedIn().
        then((isLoggedIn) => {
            if (!isLoggedIn) {
                window.location = "#/home";
                return;
            }

            Promise.all([dataService.getUserInfo(), templatesLoader.load('user-panel')]).
            then(([userInfo, templateHTML]) => {

                $('#most-rated').html('');

                $('#most-recent').html('');

                $('#wrapper').html(templateHTML(userInfo));

                $('#btn-post-add').on('click', (ev) => {
                    let content = $('#content-post').val();
                    let title = $('#title-post').val();
                    let categoryes = $('#category').val().split(',').
                    filter(el => el.length !== 0).
                    map((el) => el.trim());

                    let user = localStorage.getItem('user');
                    let likes = 1;
                    let dislikes = 0;
                    let post = {
                        title,
                        content,
                        categoryes,
                        user,
                        likes,
                        dislikes,
                        "_ic": localStorage.getItem("userCredential")

                    };
                    dataService.addPost(post);
                    window.location = "#/home";
                    ev.preventDefault();
                    return false;
                });

                $('#btn-add-admin').on('click', (ev) => {
                    let username = $('#admin-name').val();
                    let password = $('#admin-pass').val();

                    let admin = {
                        username,
                        password,
                        'isAdmin': true
                    };

                    userData.register(admin)
                        .then((user) => {
                            notifier.success(`${user.username} successfully registered!`);
                            window.location = '#/home';
                        })
                        .catch((err) => {
                            notifier.error(err);
                            console.log(err);
                        });


                    ev.preventDefault();
                    return false;
                });
            });
        }).catch((err) => {
            notifier.error("You are not logged in");
        });
    }

    function showPosts() {
        Promise.all([dataService.getPosts(), templatesLoader.load('initial-posts'), templatesLoader.load('most-rated'), templatesLoader.load('most-recent')]).
        then(([postsInfo, templateHTML, rated, liked]) => {
            postsInfo = postsInfo.map((p) => {
                let date = new Date(p._kmd.ect);
                return {
                    post: p,
                    date
                };
            });

            let lastAdded = postsInfo.sort((p1, p2) => {
                return (p2.date - p1.date);
            }).slice(0, 4);

            let mostRated = postsInfo.sort((p1, p2) => {
                return (p2.post.likes - p1.post.likes);
            }).slice(0, 4);



            let html = templateHTML(postsInfo);
            $('#wrapper').html(html);

            let ratedHTML = rated(mostRated);
            $('#most-rated').html(ratedHTML);

            let addedHTML = liked(lastAdded);
            $('#most-recent').html(addedHTML);

            $('.more').on('click', function() {
                let dataID = $(this).attr('data-id');
                let currentPost = postsInfo.filter((p) => {
                    return p.post._id === dataID;
                });

                templatesLoader.load('just-post')
                    .then((template) => {
                        let html = template(currentPost[0]);
                        $('#wrapper').html(html);
                    });
            });

            localStorage.setItem('posts', JSON.stringify(postsInfo));
        }).catch((err) => {
            notifier.error("You are not logged in");
        });
    }

    function postWorking(params) {
        let category = getQueryParams(window.location.hash).ategory;

        Promise.all([dataService.getPosts(), dataService.getUserInfo(), templatesLoader.load('posts')]).
        then(([posts, userInfo, templateHTML]) => {
            if (category) {
                category = category.toLowerCase();
                posts = posts.filter((p) => {

                    return p.categoryes.find((p) => {
                        return (p.toLowerCase() === category);
                    });
                });
            }

            let projectionOfPosts = posts.map((p) => {
                let isOwn = p._acl.creator === localStorage.getItem('userID');
                let date = new Date(p._kmd.ect);
                let isAdmin = userInfo.isAdmin;
                if (isAdmin) {
                    isOwn = false;
                }
                return {
                    data: p,
                    isOwn,
                    isAdmin,
                    date
                };
            });

            $('#wrapper').html(templateHTML(projectionOfPosts));

            $('#most-rated').html('');

            $('#most-recent').html('');

            $('.btn-del-regular').on('click', function(ev) {

                let dataID = $(this).attr('data-id');

                dataService.deletePostFromRegularUser(dataID)
                    .then(() => {
                        notifier.success(`You have successfully deleated post!`);
                        window.location = "#/posts";

                    });

                ev.preventDefault();
                
                return false;

            });

            $('.btn-del-admin').on('click', function(ev) {
                let dataID = $(this).attr('data-id');
                let dataCre = $(this).attr('data-cre');

                dataService.deletePostFromAdmin(dataCre, dataID)
                    .then(() => {
                        notifier.success(`You have successfully deleated post!`);
                        window.location = "#/posts";
                    });

                ev.preventDefault();
                
                return false;
            });

            $('.btn-like').on('click', function(ev) {
                let dataID = $(this).attr('data-id');
                let dataCre = $(this).attr('data-cre');
                dataService.getPost(dataID, dataCre)
                    .then((data) => {
                        let newData = {
                            title: data.title,
                            content: data.content,
                            categoryes: data.categoryes,
                            user: data.user,
                            likes: data.likes + 1,
                            dislikes: data.dislikes,
                            _ic: data._ic,
                        };
                        return newData;

                    }).then((newData) => {
                        dataService.updatePost(dataID, newData, newData._ic);
                    });
                window.location = "#/posts";

                ev.preventDefault();
                return false;

            });

            $('.btn-dislike').on('click', function(ev) {
                let dataID = $(this).attr('data-id');
                let dataCre = $(this).attr('data-cre');

                dataService.getPost(dataID, dataCre)
                    .then((data) => {
                        let newData = {
                            title: data.title,
                            content: data.content,
                            categoryes: data.categoryes,
                            user: data.user,
                            likes: data.likes,
                            dislikes: data.dislikes + 1,
                            _ic: data._ic,
                        };
                        return newData;

                    }).then((newData) => {
                        dataService.updatePost(dataID, newData, newData._ic);
                    });

                window.location = "#/posts";

                ev.preventDefault();
                return false;

            });

            $('#btn-paging').on('click', function() {
                let page = $('#page').val();
                let count = $('#count').val();
                let postsInSinglePage;
                page = +page;
                count = +count;
                
                let collectionLength = projectionOfPosts.length;

                if (((page * count) + count) > collectionLength) {
                    count = projectionOfPosts.length - (page * count);
                }

                if ((page < 0) || (count <= 0)) {
                    postsInSinglePage = projectionOfPosts.slice();
                } else {
                    postsInSinglePage = projectionOfPosts.slice(0)
                        .splice(page * count, count);
                }

                let html = templateHTML(postsInSinglePage);
                $('#wrapper').html(html);

                window.location = "#/posts";

            });
        }).catch((err) => {
            notifier.error("You are not logged in");
        });
    }

    function showPostByID(params) {
        let id = params.id;

        templatesLoader.load('just-post')
            .then((template) => {
                let post = JSON.parse(localStorage.getItem('posts'))
                    .filter((p) => {
                        return p.post._id === id;
                    })[0];

                let html = template(post);
                $('#wrapper').html(html);
            });
    }

    function getQueryParams(query) {
        query = query.replace(/^.*\?/, '');

        let hash, vars = {},
            hashes = query.substr(1)
            .split('&').forEach(val => {
                hash = val.split('=');
                vars[hash[0]] = hash[1];
            });
        return vars;
    }


    function showUserPosts(params) {

        let dataID = params.userID;

        let dataCre = getQueryParams(window.location.hash).re;
        Promise.all([dataService.getUserInfoById(dataID, dataCre), templatesLoader.load('user-posts')])
            .then(([userInfo, template]) => {
                let posts = JSON.parse(localStorage.getItem('posts'));
                let userPosts = posts.filter((p) => {
                    return p.post._acl.creator === userInfo._id;
                });

                let postCount = userPosts.length;
                let likes = 0;
                let dislikes = 0;
                userPosts.forEach((p) => {
                    likes += p.post.likes;
                    dislikes += p.post.dislikes;
                });
                let userStatistic = {
                    username: userInfo.username,
                    postCount,
                    likes,
                    dislikes,
                    fullName: userInfo.fullName,
                    email: userInfo.email
                };

                let htmlToRender = template(userStatistic);

                $('#wrapper').html(htmlToRender);
            });
    }

    function showAbout() {
        templatesLoader.load('about')
            .then((template) => {
                let html = template();
                $('#wrapper').html(html);

            });

    }


    return {
        showUserPanel,
        showPosts,
        home,
        showUserPosts,
        postWorking,
        showPostByID,
        showAbout
    };

}());

export { controller };
