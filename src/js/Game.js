"use strict";

var puckt = puckt || {};
puckt.Game = (function () {
    var world, level = 8, fps = 60;

    function Game () {
        // Create stage and enable touch
        stage = new createjs.Stage(puckt.canvas.elem);
        createjs.Touch.enable(stage);

        // Set the scene
        createWorld();

        // Declare settings for scene ticker
        createjs.Ticker.addEventListener('tick', tickrolled);
        createjs.Ticker.setFPS(fps);
        createjs.Ticker.useRAF = true;
    }

    function createWorld () {
        var currentGame;
        // Create world with no gravity
        world = new box2d.b2World(new box2d.b2Vec2(0, 0), true);

        // Contact Listener
        var contactListener = new Box2D.Dynamics.b2ContactListener;
        contactListener.BeginContact = function(contact) {
           var shape = contact.GetFixtureA().GetBody().GetUserData();

           if (shape.type = "wall") {
               shape.collision(!shape.isOn(), contact);
           }
        };
        world.SetContactListener(contactListener);

        // Initialise debugger
        puckt.debug.init(world);

        // Draw Level
        currentGame = new puckt.Level(world, level);
        currentGame.boot(function () {
            currentGame.begin();
        }, function () {
            console.log("Ah, man!");
        });
    }

    function tickrolled (e) {
        if (!e.paused) {
            // Update stage
            stage.update();
            
            puckt.debug.run(world.DrawDebugData.bind(world));
            
            world.Step(1/fps, 10, 10);
            world.ClearForces();
        }
    }
    
    return Game;
})();