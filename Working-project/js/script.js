(function() {
    'use strict';
            
    $(document).ready(function() {
        setDisabledClass();
        $('#categories-drop-down').multiselect();
    });

    function setDisabledClass() {
        const addPostButton = $('.btn-add-post');
        const allPostsButton = $('.btn-view-post');
        const userPostsButton = $('.btn-my-post');
        const message = "You must be logged in";

        if (true) { // isLoggedIn
            addPostButton.on('mouseover', function() {
                addPostButton.addClass('disabled');
                addPostButton.html(message);
                addPostButton.css({ "color": "#f44242" });
            });
            allPostsButton.on('mouseover', function() {
                allPostsButton.addClass('disabled');
                allPostsButton.html(message);
                allPostsButton.css({ "color": "#f44242" });

            });
            userPostsButton.on('mouseover', function() {
                userPostsButton.addClass('disabled');
                userPostsButton.html(message);
                userPostsButton.css({ "color": "#f44242" });

            });
        }
    }

})();