"use strict";

var box2d, stage;

puckt = puckt || {};
puckt.canvas = {
    elem: document.createElement('canvas'),
    width: 320,
    height: 420
};
puckt.pxpm = 30 / puckt.Puck.realRadius;

puckt.main = (function () {
    var init = function () {
        // Inject puckt.canvas.elem
        document.body.appendChild(puckt.canvas.elem);
        // Set canvas size
        puckt.util.setCanvasSize(puckt.canvas.elem, puckt.canvas.width, puckt.canvas.height);
        // Add background image
        canvg(document.getElementById("ice-rink"), "img/ice_rink.svg");
        // Create test level
        new puckt.Game();
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
        init: init
    }
}());

window.addEventListener("load", puckt.main.init);