const uiService = (function () {
    const getImageTemplate = function (imageData) {
        return `
            <div class="image-container">
                <span class="image-title"> ${imageData.title} - <b><i>rgb(${imageData.colorCodes}) / HEX: #${imageData.hexCode}</i></b></span>
                <img class="image-large" src="${imageData.url}" alt="${imageData.title}" />
                <img class="image-thumb" src="${imageData.thumbnailUrl}" alt="${imageData.title}" />
            </div>
        `;
    }

    const getNoResultTemplate = function () {
        return `<div id="no-results">
            <span>No records found</span>
        </div>`;
    };

    const addImagesToDom = function (elementsString, override = false) {
        const parentElem = document.getElementById('app');
        if (override) {
            resetUI();
        }
        parentElem.insertAdjacentHTML('beforeend', elementsString);
    }
    
    const resetUI = function() {
        const parentElem = document.getElementById('app');
        parentElem.textContent = ''; // faster than innerHTML = ''
    }

    const searchForValue = function (data, value) {
        data = data || [];
        const result = data.filter(imageData => {
            return imageData.title.search(value) >= 0 || imageData.hexCode.search(value) >= 0;
        });

        return result;
    };

    const showNoResult = function() {
        const appElem = document.getElementById('app');
        resetUI();
        const noResultsTemplate = getNoResultTemplate();
        appElem.insertAdjacentHTML( 'beforeend', noResultsTemplate );
    };

    const hideNoResult = function() {

    };

    return {
        getImageTemplate,
        addImagesToDom,
        searchForValue,
        showNoResult
    }
})();
