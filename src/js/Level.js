"use strict";

var puckt = puckt || {};
puckt.Level = (function () {
    var lvl;
    function Level (number) {
        // Level constructor
        get(number);
    }

    function get (number) {
        // AJAX call to retreive level definition
        var xhr = new XMLHttpRequest();
        xhr.open("GET", 'levels/'+number+'.json', true);
        xhr.responseType = 'text';
        // Once ready state is 4
        xhr.onload = function (e) {
            if (this.status == 200) {
                lvl = JSON.parse(xhr.responseText);
                console.log(lvl);
            }
        }
        xhr.send(null);
    }

    function drawBoundaries () {
        // Draw the boundaries
    }

    function draw () {
        // Draw the object
    }
    
    return Level;
})();