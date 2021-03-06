"use strict";

var box2d, stage,

puckt = puckt || {};
puckt.canvas = {
    elem: document.createElement('canvas'),
    realWidth: 320,
    realHeight: 410,
    navHeight: 50
};
puckt.pxpm = 30 / puckt.Puck.realWorldRadius;

puckt.main = (function () {
    // Initialise the debugger
    puckt.debug.init();

    var createGame = function (startingLevel) {
        var context;

        // Inject puckt.canvas.elem
        document.body.appendChild(puckt.canvas.elem);
        puckt.canvas.elem.setAttribute("id", "canvas");

        // Set puckt.canvas properties
        context = puckt.canvas.elem.getContext('2d');
        puckt.canvas.devicePixelRatio = window.devicePixelRatio || 1;
        puckt.canvas.backingStoreRatio = context.webkitBackingStorePixelRatio ||
                                         context.mozBackingStorePixelRatio ||
                                         context.msBackingStorePixelRatio ||
                                         context.oBackingStorePixelRatio ||
                                         context.backingStorePixelRatio || 1;

        puckt.canvas.ratio = puckt.canvas.devicePixelRatio / puckt.canvas.backingStoreRatio;

        puckt.canvas.width = puckt.canvas.realWidth * puckt.canvas.ratio;
        puckt.canvas.height = puckt.canvas.realHeight * puckt.canvas.ratio;

        // Set canvas size
        puckt.util.setCanvasSize(puckt.canvas.elem, puckt.canvas.realWidth, puckt.canvas.realHeight);
        // Set canvas to have a margin top (for nav bar)
        // puckt.canvas.elem.style.top = puckt.canvas.navHeight + "px";
        // Set ice rink to have a margin top (for nav bar)
        // puckt.canvas.iceRink.style.top = puckt.canvas.navHeight + "px";

        new puckt.Game(startingLevel);
    },

    loadAssets = function () {
        puckt.music.load(puckt.music.BACKGROUND_MUSIC, 'audio/background.mp3', function (e) {
            puckt.music.play(puckt.music.BACKGROUND_MUSIC);
        }, function (e) {
            console.log('music fail', e);
        });
    },

    init = function () {
        var popupProps = {
            content: "<h1>Puckt</h1> <small>beta</small><p>Puckt is a mobile HTML5 game designed to test your visual and mathematical skills.</p>",
            buttons: [
                {
                    text: "New Game",
                    callback: function () {
                        puckt.ui.closePopup();
                        // Set up local storage
                        localStorage.setItem("levelsCompleted", JSON.stringify([]));
                        createGame(1);
                    }
                }
            ]
        };
        // Check to see if the user can continue a previous game
        if (JSON.parse(localStorage.getItem("levelsCompleted")) && JSON.parse(localStorage.getItem("levelsCompleted")).length > 0) {
            popupProps.buttons.push({
                text: "Continue Game",
                callback: function () {
                    puckt.ui.closePopup();
                    var highestLevel = JSON.parse(localStorage.getItem("levelsCompleted")).pop().number + 1;
                    createGame(highestLevel);
                }
            });
        }
        // Ensure game is viewed from the home screen and on an iPhone or iPod
        if (puckt.debug_switch.bypassDeviceCheck || (navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
            if (puckt.debug_switch.bypassDeviceCheck || window.navigator.standalone) {
                // Inject menu
                loadAssets();
                puckt.ui.openPopup(popupProps);
            } else {
                // Inject install instructions
                puckt.ui.openPopup({
                    content: "<h1>Puckt</h1> <small>beta</small><p>To play, you must first add this page to your <strong>Home Screen</strong>.</p>"
                })
            }
        } else {
            // Inject install instructions
            puckt.ui.openPopup({
                content: "<h1>Puckt</h1> <small>beta</small><p>This game requires an iPhone or iPod Touch running iOS 5 or above.</p>"
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

window.addEventListener("load", puckt.main.init, false);