var puckt = puckt || {};
puckt.util = (function () {
    "use strict";
    // Convert pixels to representive metres
    var convertToMetres = function (pixels) {
        return pixels * (1 / mppx);
    },
    // Takes a distance in pixels, and an array of times, converts pixels to
    // metres, and calculates the time period covered
    calcVelocity = function (distances, timestamps) {
        var distance = convertToMetres(distances[distances.length-1]-distances[0]),
            time = findDiff(timestamps[0], timestamps[timestamps.length-1]);
        return distance / time;
    },
    // A helper function to find the difference between two numbers
    findDiff = function (num1, num2) {
        return (num1 > num2) ? num1 - num2 : num2 - num1;
    };
    return {
        convertToMetres: convertToMetres,
        calcVelocity: calcVelocity,
        findDiff: findDiff
    }
}());