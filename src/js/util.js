"use strict";

var puckt = puckt || {};
puckt.util = (function () {
    // Convert pixels to representive metres
    var pixelsToMetres = function (pixels) {
        return pixels / puckt.pxpm;
    },
    metresToPixels = function (metres) {
        return metres * puckt.pxpm;
    },
    degreesToRadians = function (deg) {
        return deg * (Math.PI / 180); // To do: cache this value
    },
    radiansToDegrees = function (rad) {
        return rad * (180 / Math.PI); // To do: cache this value
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
    },

    // Extend an object with more properties, overwriting exiting ones
    extendObject = function (original, newProps) {
        for (var prop in newProps) {
            original[prop] = newProps[prop];
        }
    };
    
    return {
        pixelsToMetres: pixelsToMetres,
        metresToPixels: metresToPixels,
        degreesToRadians: degreesToRadians,
        radiansToDegrees: radiansToDegrees,
        calcVelocity: calcVelocity,
        findDiff: findDiff,
        setCanvasSize: setCanvasSize,
        extendObject: extendObject
    }
}());