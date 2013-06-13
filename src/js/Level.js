"use strict";

var puckt = puckt || {};
puckt.Level = (function () {
    var data, w, number, 
        lightWalls = 0, lightWallsOn = 0, collisions = 0, failTimeout = 4, failTimer, finished;

    function Level (world, lvlNum) {
        w = world;
        number = lvlNum;
    }

    Level.prototype.boot = function (success, fail) {
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
                fail();
            }
        }
        xhr.send(null);
    };

    Level.prototype.begin = function () {
        finished = false;
        // Draw level to canvas
        puckt.Wall.collisionHandler = function () {
            if (!finished) {
                restartFailTimer();
                collisions++;

                if (this.isLightWall()) {
                    if (this.isOn()) {
                        lightWallsOn++;
                    } else {
                        lightWallsOn--;
                    }
                }
                if (lightWalls === lightWallsOn) {
                    console.log("User won with " + collisions + " collision(s)");
                    stopFailTimer();
                    finished = true;
                    puckt.Wall.collisionHandler = function () {};
                    LevelComplete();
                }
            }
        }



        drawBoundaries(data.boundaries);
        drawWalls(data.walls);
        drawPuck(data.puck);
    };

    Level.prototype.reset = function () {
        finished = true;
        stopFailTimer();
        puckt.util.resetWorld(w);
        this.begin();
    }

    Level.successCallback = function () { };
    Level.failCallback = function () { };

    function LevelComplete () {
        var stars = 0;

        for (var i in data.stars) {
            console.log('LevelComplete loop', collisions, data.stars[i], i);
            if (collisions <= data.stars[i]) {
                stars++;
            } else {
                break;
            }
            console.log('LevelComplete loop stars', stars);
        }

        Level.successCallback.call(this, stars, collisions);
    }

    function failLevel () {
        Level.failCallback.call(this, collisions);
    }
    
    function stopFailTimer() {
        clearTimeout(failTimer);
    }

    function startFailTimer () {
        failTimer = setTimeout(failLevel.bind(this), failTimeout);
    }

    function restartFailTimer () {
        stopFailTimer();
        startFailTimer();
    }

    function drawBoundaries (boundaries) {
        boundaries = boundaries || {};
        // Draw the boundaries
        switch (true) {
            case boundaries.top !== false:
                new puckt.Wall(w, {
                    lightColour: null,
                    x: puckt.canvas.width / 2,
                    y: 0,
                    w: puckt.canvas.width,
                    h: 0
                });
            case boundaries.right !== false:
                new puckt.Wall(w, {
                    lightColour: null,
                    x: puckt.canvas.width,
                    y: puckt.canvas.height / 2,
                    w: 0,
                    h: puckt.canvas.height
                });
            case boundaries.bottom !== false:
                new puckt.Wall(w, {
                    lightColour: null,
                    x: puckt.canvas.width / 2,
                    y: puckt.canvas.height,
                    w: puckt.canvas.width,
                    h: 0
                });
            case boundaries.left !== false:
                new puckt.Wall(w, {
                    lightColour: null,
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