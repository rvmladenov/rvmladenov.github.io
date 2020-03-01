const loadingIndicatorService = (function () {

    const show = function () {
        document.getElementById('page-loading').classList.add('loading');
    };

    const hide = function () {
        const timeout = setTimeout(function() {
            document.getElementById('page-loading').classList.remove('loading');
            clearTimeout(timeout); // clears the memory from the timeout because it will remain in the background as a memory leak
        }, 1000);
    };

    return {
        show,
        hide
    }
})();
