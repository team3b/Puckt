"use strict";

var puckt = puckt || {};
puckt.Level = (function () {
    var level, w;
    function Level (world, number) {
        w = world;
        get(number);
    }

    function get (number) {
        // AJAX call to retreive level definition
        var xhr = new XMLHttpRequest();
        xhr.open("GET", 'levels/' + number + '.json', true);
        xhr.responseType = 'text';
        // Once ready state is 4
        xhr.onload = function (e) {
            if (this.status == 200) {
                level = JSON.parse(xhr.responseText);
                // Draw boundaries
                drawBoundaries(level.boundaries);
                // Draw walls
                drawWall(level.walls);
                // Draw Puck
            }
        }
        xhr.send(null);
    }

    function drawBoundaries (boundaries) {
        // Draw the boundaries
        switch (true) {
            case boundaries.top:
                new puckt.Wall(w, {
                    x: 0,
                    y: 0,
                    w: canvasWidth,
                    h: 0
                });
            case boundaries.left:
                new puckt.Wall(w, {
                    x: 0,
                    y: 0,
                    w: 0,
                    h: canvasHeight
                });
            case boundaries.bottom:
                new puckt.Wall(w, {
                    x: 0,
                    y: canvasHeight,
                    w: canvasWidth,
                    h: 0
                });
            case boundaries.right:
                new puckt.Wall(w, {
                    x: canvasWidth,
                    y: 0,
                    w: 0,
                    h: canvasHeight
                })
                break;
        }
    }

    function drawWall (walls) {
        // Draw the walls
        if (walls.length) {
            for (var i=0, len=walls.length; i<len; i++) {
                var wall = new puckt.Wall(w, {
                    x: walls[i].coords.x,
                    y: walls[i].coords.y,
                    w: walls[i].dimensions.w,
                    h: walls[i].dimensions.h,
                    angle: walls[i].angle
                });
                stage.addChild(wall.shape);
            }
        }
    }
    
    return Level;
})();