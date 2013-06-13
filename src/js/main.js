"use strict";

var box2d, stage;           

puckt = puckt || {};
puckt.canvas = {
    elem: document.createElement('canvas'),
    iceRink: document.getElementById("ice-rink"),
    width: 320,
    height: 410,
    navHeight: 50
};
puckt.pxpm = 30 / puckt.Puck.realRadius;

puckt.main = (function () {
    var createGame = function (startingLevel) {
        // Inject puckt.canvas.elem
        document.body.appendChild(puckt.canvas.elem);
        puckt.canvas.elem.setAttribute("id", "canvas");
        // Set canvas size
        puckt.util.setCanvasSize(puckt.canvas.elem, puckt.canvas.width, puckt.canvas.height);
        // Set canvas to have a margin top (for nav bar)
        puckt.canvas.elem.style.top = puckt.canvas.navHeight + "px";
        // Set ice rink to have a margin top (for nav bar)
        puckt.canvas.iceRink.style.top = puckt.canvas.navHeight + "px";
        // Add background image
        canvg(document.getElementById("ice-rink"), "img/ice_rink.svg");
        // Create test level
        new puckt.Game(startingLevel);
    },

    init = function () {
        // Ensure game is viewed from the home screen
        if (window.navigator.standalone) {
            // Inject menu
            puckt.ui.openPopup({
                content: "<h1>Puckt</h1> <small>beta</small><p>Puckt is a mobile HTML5 game designed to test your visual and mathematical skills. The game was developed during a week-long Game Jam hosted at the University of Portsmouth.</p>",
                buttons: [
                    {
                        text: "New Game",
                        callback: function () {
                            puckt.ui.closePopup();
                            createGame(1);
                        }
                    },
                    {
                        text: "Continue Game",
                        callback: function () {
                            puckt.ui.closePopup();
                            createGame(1); // Get local storage's highest level completed
                        }
                    }
                ]
            })
        } else {
            // Inject install instructions
            puckt.ui.openPopup({
                content: "<h1>Puckt</h1> <small>beta</small><p>To play, you must first add this page to your home screen.</p><i class=\"icon-arrow-down icon-2x\"></i>"
            })
        }
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