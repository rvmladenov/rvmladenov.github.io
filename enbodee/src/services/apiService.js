const api = (function () {
    const getData = function () {
        return $.getJSON("https://jsonplaceholder.typicode.com/photos");
    } // TODO(Optional): add the on fail functionality

    return {
        getData
    }
})();
