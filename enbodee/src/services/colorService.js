const colorService = (function () {

    const hexToRGB = function (hex) {
        // I am converting the hex to a rgb so i could get the correct red color instead of doing doing some custom staff 
        // like replacing a char from the hex with a higher number or else
        return (hex = hex.replace('#', '')).match(new RegExp('(.{' + hex.length/3 + '})', 'g')).map(function(l) { return parseInt(hex.length%2 ? l+l : l, 16) });
    }

    const hexRgbConverter = function (hexCode) {
        if (hexCode.length === 0) {
            return '0';
        }

        return parseInt(hexCode, 16);
    }

    const hexToRGBFallback = function (hex) {
        const hexArr = [];
        for (let i = 0; i < hex.length; i+=2) {
            const substractedHexCode = hex.substring(i, i+2);
            hexArr.push(
                // the common approach for having a single char hex code is to add "0" to it
                hexRgbConverter( substractedHexCode.length <= 1 ? '0' + substractedHexCode : substractedHexCode )
            );
        }

        return hexArr;
    };

    const getHexCode = function(imgUrl) {
        return imgUrl.split('/').pop();
    }

    const getColorCodes = function (imgUrl) {
        const colorCode = getHexCode(imgUrl);

        // P.S.
        // We need to consider that the task requires us to get the color code from the image URL
        // But some hex values returned from the server are not valid so we need to do a check here
        // If for example the color code was required to be taken from the image itself - then we wont need to do that
        return isHexValid(colorCode)
            ? hexToRGB(colorCode)
            : hexToRGBFallback(colorCode); 
    }

    const isHexValid = function (hex) {
        return /^([0-9A-F]{3}){1,2}$/i.test(hex);
    }

    return {
        getColorCodes,
        getHexCode
    }
})();