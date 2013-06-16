"use strict";

var puckt = puckt || {};
puckt.debug = (function () {
    var debugCanvas,

    // Initialise debugging mode
    init = function () {
        if (puckt.debug_switch.clearLocalStorage) {
            localStorage.setItem("levelsCompleted", JSON.stringify([]));
        }
    },

    // Initialize the box2d debug canvas, if required
    initCanvas = function (world) {
        if (puckt.debug_switch.box2d_debug) {
            var debugDraw;
            
            debugCanvas = document.createElement('canvas');
            puckt.util.setCanvasSize(debugCanvas, puckt.canvas.scaledWidth, puckt.canvas.scaledHeight);

            puckt.canvas.elem.parentNode.appendChild(debugCanvas);
            
            debugDraw = new box2d.b2DebugDraw();
            debugDraw.SetSprite(debugCanvas.getContext('2d'));
            debugDraw.SetDrawScale(puckt.pxpm);
            debugDraw.SetFillAlpha(0.6);
            debugDraw.SetFlags(box2d.b2DebugDraw.e_shapeBit | box2d.b2DebugDraw.e_jointBit);
            world.SetDebugDraw(debugDraw);
        }
    },

    // Initialise flick debugging
    initFlick = function() {

    },
    
    // Execute a function if debug logic is turned on
    run = function (fn) {
        if (puckt.debug_switch.logic) {
            fn();
        }
    },

    // Log things to toe console, if debug logging is turned on
    log = function () {
        if (puckt.debug_switch.logging) {
            console.log.apply(console, arguments);
        }
    };

    return {
        init: init,
        initCanvas: initCanvas,
        run: run,
        log: log,
        canvas: debugCanvas
    }
})();