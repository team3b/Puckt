"use strict";

var puckt = puckt || {};
puckt.Level = (function () {
    var failTimeout = 4000;

    function Level (world, num) {
        this.world = world;
        this.number = num;
        this.lightWalls = 0;
        this.initialLightsOn = 0;
        this.lightWallsOn = 0;
        this.collisions = 0;
    }

    Level.prototype.boot = function (success, fail) {
        var theLevel = this,
        // AJAX call to retreive level definition
        xhr = new XMLHttpRequest();
        xhr.open("GET", 'levels/' + this.number + '.json', true);
        xhr.responseType = 'text';
        // Once ready state is 4
        xhr.onload = function (e) {
            if (this.status == 200) {
                theLevel.data = JSON.parse(xhr.responseText);
                success(e);
            } else {
                fail(e);
            }
        };
        xhr.send(null);
    };

    Level.prototype.begin = function () {
        var theLevel = this;
        this.reset();

        // When the user flicks the puck, start the fail timer,
        // then remove the flick event
        puckt.flick.addFlickEventListener(function () {
            // TO DO: only execute this if the puck is in the puck zone when the event is triggered
            theLevel.restartFailTimer();
        });

        // Draw level to canvas
        puckt.Wall.collisionHandler = function () {
            if (!theLevel.finished) {
                theLevel.restartFailTimer();
                theLevel.collisions++;

                if (this.isLightWall()) {
                    if (this.isOn()) {
                        theLevel.lightWallsOn++;
                    } else {
                        theLevel.lightWallsOn--;
                    }
                }
                if (theLevel.lightWalls === theLevel.lightWallsOn) {
                    theLevel._levelComplete();
                }
            }
        }

        this._drawBoundaries(this.data.boundaries);
        this._drawWalls(this.data.walls);
        this._drawPuck(this.data.puck);

        this.lightWallsOn = this.initialLightsOn;
    };

    Level.prototype.reset = function () {
        this.lightWalls = 0;
        this.initialLightsOn = 0;
        this.lightWallsOn = 0;
        this.finished = true;
        this.stopFailTimer();
        this.collisions = 0;
        puckt.util.resetWorld(this.world);
        this.finished = false;
        puckt.Wall.disabled = false;
    }

    Level.successCallback = function () { };
    Level.failCallback = function () { };

    Level.prototype._levelComplete = function () {
        puckt.Wall.disabled = true;
        this.stopFailTimer();
        this.finished = true;

        var stars = 0;
        for (var i in this.data.stars) {
            if (this.collisions <= this.data.stars[i]) {
                stars++;
            } else {
                break;
            }
        }

        if (stars > 0) {
            Level.successCallback.call(this, stars, this.collisions);
        } else {
            Level.failCallback.call(this,stars, this.collisions);
        }
    }
    
    Level.prototype.stopFailTimer = function () {
        //console.log('stopFailTimer', this, this.failTimer);
        //clearTimeout(this.failTimer);
        //console.log('stopFailTimer finished', this.failTimer);
    }

    Level.prototype.startFailTimer = function () {
        //this.failTimer = setTimeout(this._failLevel(), failTimeout);
    }

    Level.prototype.restartFailTimer = function () {
        this.stopFailTimer();
        this.startFailTimer();
    }

    Level.prototype._failLevel = function () {
        Level.failCallback.call(this, this.collisions);
    }

    Level.prototype._drawBoundaries = function (boundaries) {
        boundaries = boundaries || {};
        // Draw the boundaries
        switch (true) {
            case boundaries.top !== false:
                new puckt.Wall(this.world, {
                    lightColour: null,
                    x: puckt.canvas.width / 2,
                    y: 0,
                    w: puckt.canvas.width,
                    h: 0
                });
            case boundaries.right !== false:
                new puckt.Wall(this.world, {
                    lightColour: null,
                    x: puckt.canvas.width,
                    y: puckt.canvas.height / 2,
                    w: 0,
                    h: puckt.canvas.height
                });
            case boundaries.bottom !== false:
                new puckt.Wall(this.world, {
                    lightColour: null,
                    x: puckt.canvas.width / 2,
                    y: puckt.canvas.height,
                    w: puckt.canvas.width,
                    h: 0
                });
            case boundaries.left !== false:
                new puckt.Wall(this.world, {
                    lightColour: null,
                    x: 0,
                    y: puckt.canvas.height / 2,
                    w: 0,
                    h: puckt.canvas.height
                })
                break;
        }
    }

    Level.prototype._drawWalls = function (walls) {
        // Check it isn't empty
        if (walls.length) {
            for (var i=0, len=walls.length; i<len; i++) {
                // Create Wall object
                var wall = new puckt.Wall(this.world, {
                    x: walls[i].coords.x,
                    y: walls[i].coords.y,
                    w: walls[i].dimensions.w,
                    h: walls[i].dimensions.h,
                    angle: walls[i].angle,
                    lightColour: walls[i].lightColour,
                    lightOn: walls[i].lightOn
                });

                if (wall.isLightWall()) {
                    this.lightWalls++;
                    if (wall.isOn()) this.initialLightsOn++;
                }

                stage.addChild(wall.shape);
            }
        }
    }

    Level.prototype._drawPuck = function (puck) {
        // Create Puck object
        var p = new puckt.Puck(this.world, {
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