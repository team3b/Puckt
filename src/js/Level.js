"use strict";

var puckt = puckt || {};
puckt.Level = (function () {
    var data, w, number, 
        lightWalls = 0, lightWallsOn = 0, collisions = 0;

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
                data = JSON.parse(xhr.responseText);
                success();
            } else {
                failed();
            }
        }
        xhr.send(null);
    };

    Level.prototype.begin = function (won, lost) {
        // Draw level to canvas
        drawBoundaries(data.boundaries);
        drawWalls(data.walls);
        drawPuck(data.puck);
        puckt.Wall.collisionHandler = function (on) {
            collisions++;
            if (on) {
                lightWallsOn++;
            } else {
                lightWallsOn--;
            }
            console.log(collisions, lightWallsOn, lightWalls);
            if (lightWalls === lightWallsOn) {
                console.log("User won with " + collisions + " collision");
                LevelComplete(won);
            }
        }
    };

    Level.prototype.reset = function () {
        puckt.util.resetWorld(w);
        this.begin();
    }

    function LevelComplete (callback) {
        //won(stars, collisions);
    }

    function drawBoundaries (boundaries) {
        boundaries = boundaries || {};
        // Draw the boundaries
        switch (true) {
            case boundaries.top !== false:
                new puckt.Wall(w, {
                    x: puckt.canvas.width / 2,
                    y: 0,
                    w: puckt.canvas.width,
                    h: 0
                });
            case boundaries.right !== false:
                new puckt.Wall(w, {
                    x: puckt.canvas.width,
                    y: puckt.canvas.height / 2,
                    w: 0,
                    h: puckt.canvas.height
                });
            case boundaries.bottom !== false:
                new puckt.Wall(w, {
                    x: puckt.canvas.width / 2,
                    y: puckt.canvas.height,
                    w: puckt.canvas.width,
                    h: 0
                });
            case boundaries.left !== false:
                new puckt.Wall(w, {
                    x: 0,
                    y: puckt.canvas.height / 2,
                    w: 0,
                    h: puckt.canvas.height
                })
                break;
        }
    }

    function drawWalls (walls) {
        // Check it isn't empty
        if (walls.length) {
            for (var i=0, len=walls.length; i<len; i++) {
                // Create Wall object
                var wall = new puckt.Wall(w, {
                    x: walls[i].coords.x,
                    y: walls[i].coords.y,
                    w: walls[i].dimensions.w,
                    h: walls[i].dimensions.h,
                    angle: walls[i].angle,
                    lightColour: walls[i].lightColour,
                    lightOn: walls[i].lightOn
                });

                if (wall.isLightWall()) {
                    lightWalls++;
                    if (wall.isOn()) lightWallsOn++;
                }

                stage.addChild(wall.shape);
            }
        }
    }

    function drawPuck (puck) {
        // Create Puck object
        var p = new puckt.Puck(w, {
            x: puck.coords.x,
            y: puck.coords.y,
            radius: puck.radius
        });
        stage.addChild(p.shape);
        // Eventually load in the levels into here
        puckt.flick.init(p);
    }
    
    return Level;
})();