const app = (function () {
    const apiService = api;
    const imagesPerPage = 30;
    const SORT_BY = {
        RED: 0,
        GREEN: 1,
        BLUE: 2
    }

    let SORT_TYPE = SORT_BY.RED;
    let loadedImagesCount = 0;

    let imagesArrTemp = [];
    let imagesArr = [];

    const searchValue = function (value) {
        if (!value) {
            imagesArr = imagesArrTemp.length > 0 ? imagesArrTemp.slice() : imagesArr;
            imagesArrTemp = []; // Resets the temp copy
        } else {
            // Keep a TEMP copy of all the images data
            imagesArrTemp = imagesArrTemp.length > 0 ? imagesArrTemp : imagesArr.slice();
            imagesArr = imagesArrTemp.slice();
        }
        const filteredImagesArr = uiService.searchForValue(imagesArr, value);
        imagesArr = filteredImagesArr.slice();

        // preserve the sort type
        loadedImagesCount = 0; // resets the loaded images
        sortImages();

        loadMoreImages(true);
    }

    const loadMoreImages = function(overrideElements) {
        const totalLoadedImages = loadedImagesCount + imagesPerPage;
        let resultHtmlStr = '';

        const imagesToLoad = imagesArr.slice(loadedImagesCount, totalLoadedImages);

        if (loadedImagesCount == 0 && imagesToLoad.length === 0) {
            // no images to show
            uiService.showNoResult();
        } else {
            imagesToLoad.map(function(imageObj){
                resultHtmlStr += uiService.getImageTemplate(imageObj);
            })
    
            uiService.addImagesToDom(resultHtmlStr, overrideElements);
            loadedImagesCount += imagesPerPage;
        }
    };

    const sortImages = function() {
        imagesArr.sort(function (a, b) {
            if (a.colorCodes[SORT_TYPE] > b.colorCodes[SORT_TYPE]) return 1;
            if (a.colorCodes[SORT_TYPE] < b.colorCodes[SORT_TYPE]) return -1;

            return 0;
        });

    };

    const attachEvents = function() {
        document
            .getElementById('showMoreImages')
            .addEventListener('click', function() {
                loadingIndicatorService.show();
                loadMoreImages();

                loadingIndicatorService.hide();
            });

        document
            .getElementById('formSubmit')
            .addEventListener('submit', function(event) {
                event.preventDefault();
                loadingIndicatorService.show();
                
                const value = document.getElementById('searchValue').value;
                searchValue(value);

                loadingIndicatorService.hide();
            });
            
            document
            .getElementById('sortType')
            .addEventListener('change', function(event) {
                loadingIndicatorService.show();

                SORT_TYPE = event.target.value;
                loadedImagesCount = 0; // resets the loaded images
                sortImages();

                loadMoreImages(true);

                loadingIndicatorService.hide();
            });
    };

    const init = function () {
        apiService
            .getData()
            .done(function( data ) {
                if (data) {
                    data.map((imageData) => {
                        imagesArr[imageData.id] = {
                            title: imageData.title,
                            albumId: imageData.albumId,
                            url: imageData.url,
                            thumbnailUrl: imageData.thumbnailUrl,
                            colorCodes: colorService.getColorCodes(imageData.url),
                            hexCode: colorService.getHexCode(imageData.url)
                        };
                    })

                    attachEvents();
                    sortImages();
                    loadMoreImages();
                    loadingIndicatorService.hide();
                }
            });
    };

    return {
        init,
        loadMoreImages
    }
})();