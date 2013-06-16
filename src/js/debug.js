"use strict";

var puckt = puckt || {};
puckt.debug = (function () {
    var debugCanvas,
        oldConsole,

    _console = {
        log: function () {
            if (puckt.debug_switch.logging) {
                oldConsole.log(arguments);
            }
        }
    };
    
    function run(fn) {
        if (puckt.debug_switch.logic) {
            fn();
        }
    }

    // Initialise debugging mode
    function init() {
        oldConsole = console;
        console = _console;
    }

    // Initialize the box2d debug canvas, if required
    function initCanvas(world) {
        if (puckt.debug_switch.physics) {
            var debugDraw;
            
            debugCanvas = document.createElement('canvas');
            puckt.util.setCanvasSize(debugCanvas, puckt.canvas.width, puckt.canvas.height);

            puckt.canvas.elem.parentNode.appendChild(debugCanvas);
            
            debugDraw = new box2d.b2DebugDraw();
            debugDraw.SetSprite(debugCanvas.getContext('2d'));
            debugDraw.SetDrawScale(puckt.pxpm);
            debugDraw.SetFillAlpha(0.6);
            debugDraw.SetFlags(box2d.b2DebugDraw.e_shapeBit | box2d.b2DebugDraw.e_jointBit);
            world.SetDebugDraw(debugDraw);
        }
    }

    function initFlick() {

    }

    return {
        init: init,
        initCanvas: initCanvas,
        run: run,
        canvas: debugCanvas,
        console: _console
    }
})();