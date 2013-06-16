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
    findDiff = function (num1, num2) {
        return (num1 > num2) ? num1 - num2 : num2 - num1;
    },
    clamp = function (min, max, x) {
        return Math.min(Math.max(x, min), max);
    },
    // A helper function to find the difference between two numbers
    findDiff = function (num1, num2) {
        return (num1 > num2) ? num1 - num2 : num2 - num1;
    },
    // Takes pixel x-axis, y-axis, width, & height and returns a b2Vect2 object
    dimTob2Vec2 = function (props) {
        return new box2d.b2Vec2(pixelsToMetres(props.x), pixelsToMetres(props.y)); 
    },
    // Takes a distance in pixels, and an array of times, converts pixels to
    // metres, and calculates the time period covered
    calcVelocity = function (distances, timestamps) {
        var distance = pixelsToMetres(distances[distances.length-1]-distances[0]),
            time = findDiff(timestamps[0], timestamps[timestamps.length-1]);
        return distance / (time * 0.001);
    },
    // Set the width and height of an HTML canvas element
    setCanvasSize = function (canvas, width, height) {
        if (puckt.canvas.devicePixelRatio !== puckt.canvas.backingStoreRatio) {
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';

            width *= puckt.canvas.ratio;
            height *= puckt.canvas.ratio;
        }
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
    },
    // Extend an object with more properties, overwriting exiting ones
    extendObject = function (original, newProps) {
        for (var prop in newProps) {
            original[prop] = newProps[prop];
        }
    },
    // Flushes out all the shit you got
    resetWorld = function (world) {
        var body = world.GetBodyList();
        while (body !== null) {
            world.DestroyBody(body);
            body = body.GetNext();
        }
        stage.removeAllChildren();
    };
    return {
        pixelsToMetres: pixelsToMetres,
        metresToPixels: metresToPixels,
        degreesToRadians: degreesToRadians,
        radiansToDegrees: radiansToDegrees,
        clamp: clamp,
        findDiff: findDiff,
        dimTob2Vec2: dimTob2Vec2,
        calcVelocity: calcVelocity,
        setCanvasSize: setCanvasSize,
        extendObject: extendObject,
        resetWorld: resetWorld
    }
}());