var puckt = puckt || {};
puckt.util = (function () {
    "use strict";
    // Convert pixels to representive metres
    var pixelsToMetres = function (pixels) {
        return pixels / puckt.pxpm;
    },
    metresToPixels = function (metres) {
        return metres * puckt.pxpm;
    },
    // Takes a distance in pixels, and an array of times, converts pixels to
    // metres, and calculates the time period covered
    calcVelocity = function (distances, timestamps) {
        var distance = pixelsToMetres(distances[distances.length-1]-distances[0]),
            time = findDiff(timestamps[0], timestamps[timestamps.length-1]);
        return distance / (time * 0.001);
    },
    // A helper function to find the difference between two numbers
    findDiff = function (num1, num2) {
        return (num1 > num2) ? num1 - num2 : num2 - num1;
    },
    
    // Set the width and height of an HTML canvas element
    setCanvasSize = function (canvas, width, height) {
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
    };
    
    return {
        pixelsToMetres: pixelsToMetres,
        metresToPixels: metresToPixels,
        calcVelocity: calcVelocity,
        findDiff: findDiff,
        setCanvasSize: setCanvasSize
    }
}());