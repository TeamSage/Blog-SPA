(function() {
    'use strict';

    $(document).ready(function() {
        setActiveClass();
    });

    function setActiveClass() {
        $('.navbar-nav.navbar-right li').each(function() {
            var item = $(this);
            item.on('click', function() {
                var item = $(this);
                item.addClass('active');
                

            });
});
    }

})();
