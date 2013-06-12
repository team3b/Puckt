"use strict";
var box2d, world, stage, fps = 60, canvasWidth = 300, canvasHeight = 440;

var puckt = puckt || {};

puckt.puck_radius = 0.0762 / 2;
puckt.puck_mass = 0.17;

puckt.pxpm = 30 / puckt.puck_radius;

puckt.main = (function () {
    var canvas, debugCanvas,
    createScene = function () {
        // Create world with no gravity
        world = new box2d.b2World(new box2d.b2Vec2(0, 0), true);

        var contactListener = new Box2D.Dynamics.b2ContactListener;
        contactListener.BeginContact = function(contact, manifold) {
           console.log(contact);
        };
        world.SetContactListener(contactListener);
       
        // Initialise debugger
        puckt.debug.init();

        // Draw walls round the outside, round the outside, round the outside...
        drawPerimeterWalls();
        
        // Create objects in scene
        var p = new puckt.Puck(canvasWidth / 2, canvasHeight / 8 * 7, 15);
        console.log('stage.addChild', stage.addChild(p.shape));
        
        // Eventually load in the levels into here
        new Flick(p);
    },
    // Bit hacky, possibly loop through a JSON object of walls to draw?
    drawPerimeterWalls = function () {
        var top = new puckt.Wall(0, 0, canvasWidth, 0),
            right = new puckt.Wall(canvasWidth, 0, 0, canvasHeight),
            bottom = new puckt.Wall(0, canvasHeight, canvasWidth, 0),
            left = new puckt.Wall(0, 0, 0, canvasHeight);
        stage.addChild(top.shape);
        stage.addChild(right.shape);
        stage.addChild(bottom.shape);
        stage.addChild(left.shape);
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
        canvas = document.getElementById("ice-rink");
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