"use strict";

var puckt = puckt || {};
puckt.debug = (function () {
    var DEBUGGING_PHYSICS = false,
        DEBUGGING = false,
        debugCanvas;
    
    function isOn() {
        return DEBUGGING;
    }
    
    function run(fn) {
        if (DEBUGGING) {
            fn();
        }
    }

    function init(world) {
        if (DEBUGGING_PHYSICS) {
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
        isOn: isOn,
        run: run,
        canvas: debugCanvas
    }
})();