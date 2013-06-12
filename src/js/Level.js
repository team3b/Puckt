"use strict";

var puckt = puckt || {};
puckt.Level = (function () {
    var level, w, number;

    function Level (world, lvlNum) {
        w = world;
        number = lvlNum;
    }

    Level.prototype.boot = function (success, failed) {
        // AJAX call to retreive level definition
        var xhr = new XMLHttpRequest();
        xhr.open("GET", 'levels/' + number + '.json', true);
        xhr.responseType = 'text';
        // Once ready state is 4
        xhr.onload = function (e) {
            if (this.status == 200) {
                level = JSON.parse(xhr.responseText);
                success();
            } else {
                failed();
            }
        }
        xhr.send(null);
    };

    Level.prototype.begin = function () {
        // Draw level to canvas
        drawBoundaries(level.boundaries);
        drawWalls(level.walls);
        drawPuck(level.puck);
    };

    function drawBoundaries (boundaries) {
        // Draw the boundaries
        switch (true) {
            case boundaries.top:
                new puckt.Wall(w, {
                    x: 0,
                    y: 0,
                    w: puckt.canvas.width,
                    h: 0
                });
            case boundaries.left:
                new puckt.Wall(w, {
                    x: 0,
                    y: 0,
                    w: 0,
                    h: puckt.canvas.height
                });
            case boundaries.bottom:
                new puckt.Wall(w, {
                    x: 0,
                    y: puckt.canvas.height,
                    w: puckt.canvas.width,
                    h: 0
                });
            case boundaries.right:
                new puckt.Wall(w, {
                    x: puckt.canvas.width,
                    y: 0,
                    w: 0,
                    h: puckt.canvas.height
                })
                break;
        }
    }

    function drawWalls (walls) {
        if (walls.length) {
            for (var i=0, len=walls.length; i<len; i++) {
                // Create Wall object
                var wall = new puckt.Wall(w, {
                    x: walls[i].coords.x,
                    y: walls[i].coords.y,
                    w: walls[i].dimensions.w,
                    h: walls[i].dimensions.h,
                    angle: walls[i].angle,
                    lightColour: walls[i].lightColours
                });
                stage.addChild(wall.shape);
            }
        }
    }

    function drawPuck (puck) {
        // Create Puck object
        var p = new puckt.Puck(w, {
            x: puck.x,
            y: puck.y,
            radius: puck.radius
        });
        stage.addChild(p.shape);
        // Eventually load in the levels into here
        puckt.flick.init(p);
    }
    
    return Level;
})();