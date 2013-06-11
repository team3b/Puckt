var puckt = puckt || {};
puckt.util = (function () {
    "use strict";
    // Given two sets of coordinates, return the longest edge
    var calcHyp = function (coord1, coord2) {
        // Find the difference between coords
        var a = findDiff(coord1.x, coord2.x),
            b = findDiff(coord1.y, coord2.y);
        return Math.sqrt(Math.pow(a,2) + Math.pow(b,2));
    },
    // Given the opposite edge and hypotenuse, return the angle
    calcAngle = function (opp, hyp) {
        // Negate Negation, return radians
        opp = Math.abs(opp);
        return Math.asin(opp/hyp); 
    },
    // Takes a distance in pixels, and an array of times, converts pixels to
    // metres, and calculates the time period covered
    calcVelocity = function (dist, data) {
        var time = findDiff(data[0].timestamp, data[data.length-1].timestamp);
        // mpp is equiv to 1m (in game terms - not crazy big aspect ratios)
        dist = dist * (1 / mpp);
        return dist / time;
    },
    // A helper function to find the difference between two numbers
    findDiff = function (num1, num2) {
        return (num1 > num2) ? num1 - num2 : num2 - num1;
    };
    return {
        calcHyp: calcHyp,
        calcAngle: calcAngle,
        calcVelocity: calcVelocity,
        findDiff: findDiff
    }
}());