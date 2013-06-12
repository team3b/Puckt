"use strict";

var box2d, stage, fps = 60, canvasWidth = 300, canvasHeight = 440,

puckt = puckt || {};
puckt.pxpm = 30 / puckt.Puck.realRadius;

puckt.main = (function () {
    var canvas, ice_rink, debugCanvas, world,
    createScene = function () {
        // Create world with no gravity
        world = new box2d.b2World(new box2d.b2Vec2(0, 0), true);

        // Add ice rink to canvas
        ice_rink = document.getElementById("ice-rink");
        canvg(ice_rink, "img/ice_rink.svg");

        var contactListener = new Box2D.Dynamics.b2ContactListener;
        contactListener.BeginContact = function(contact) {
           var shape = contact.GetFixtureA().GetBody().GetUserData();

           if (shape.type = "light") {
               shape.collide();
           }
        };
        world.SetContactListener(contactListener);
       
        // Initialise debugger
        puckt.debug.init(world);

        // Create test level
        new puckt.Level(world, 1);
    },
    tickrolled = function (e) {
        if (!e.paused) {
            // Update stage
            stage.update();
            
            puckt.debug.run(world.DrawDebugData);
            
            world.Step(1/fps, 10, 10);
            world.ClearForces();
        }
    },
   init = function () {
        // Set up stage and enable touch controls
        canvas = document.getElementById("canvas");
        puckt.util.setCanvasSize(canvas, canvasWidth, canvasHeight);
        
        stage = new createjs.Stage(canvas);
        createjs.Touch.enable(stage);
        
        // Create scene
        createScene();
        
        // Declare settings for scene ticker
        createjs.Ticker.addEventListener('tick', tickrolled);
        createjs.Ticker.setFPS(fps);
        createjs.Ticker.useRAF = true;
    };
    
    // Set the options for the box2d variable
    box2d = {
        b2Vec2 : Box2D.Common.Math.b2Vec2,
        b2BodyDef : Box2D.Dynamics.b2BodyDef,
        b2Body : Box2D.Dynamics.b2Body,
        b2FixtureDef : Box2D.Dynamics.b2FixtureDef,
        b2Fixture : Box2D.Dynamics.b2Fixture,
        b2World : Box2D.Dynamics.b2World,
        b2MassData : Box2D.Collision.Shapes.b2MassData,
        b2PolygonShape : Box2D.Collision.Shapes.b2PolygonShape,
        b2CircleShape : Box2D.Collision.Shapes.b2CircleShape,
        b2DebugDraw : Box2D.Dynamics.b2DebugDraw
    };
    return {
        init: init,
        tickrolled: tickrolled
    }
}());

window.addEventListener("load", puckt.main.init);