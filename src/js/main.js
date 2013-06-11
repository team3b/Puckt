var box2d = {
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
    },
    stage, world,
    mpp = 50;
puckt.main = (function () {
    "use strict";
    var init = function () {
        // Set up stage and enable touch controls
        stage = new createjs.Stage(document.getElementById("ice-rink"));
        createjs.Touch.enable(stage);
        // Create scene
        createScene();
        // Declare settings for scene ticker
        createjs.Ticker.addListener(this);
        createjs.Ticker.setFPS(60);
        createjs.Ticker.useRAF = true;
    },
    createScene = function () {
        // Create world with no gravity
        world = new box2d.b2World(new box2d.b2Vec2(0, 0), true);
        // Enables debugging shapes for box2d
        var debugDraw = new box2d.b2DebugDraw();
        debugDraw.SetSprite(stage.canvas.getContext("2d"));
        debugDraw.SetFlags(box2d.b2DebugDraw.e_shapeBit | box2d.b2DebugDraw.e_jointBit);
        world.SetDebugDraw(debugDraw);
        // Create objects in scene
        var p = new Puck();
        stage.addChild(p.view);
        // Eventually load in the levels into here
        new Touch(p.view);
    },
    tickrolled = function () {
        // Update stage
        stage.update();
        // Un-comment to turn debugging on
        //world.DrawDebugData();
        world.Step(1/60, 10, 10);
        world.ClearForces();
    };
    return {
        init: init,
        tickrolled: tickrolled
    }
}());
// Declare tick function outside of the namespace to ensure it is called
function tick () {
    puckt.main.tickrolled();
}
window.addEventListener("load", puckt.main.init);