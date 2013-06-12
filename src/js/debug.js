"use strict";

var puckt = puckt || {};
puckt.debug = (function () {
    var DEBUGGING = true,
        debugCanvas;
    
    function isOn() {
        return DEBUGGING;
    }
    
    function run(fn) {
        if (DEBUGGING) fn();
    }
    
    function init(world) {
        if (DEBUGGING) {
            var debugDraw;
            
            debugCanvas = document.createElement('canvas');
            puckt.util.setCanvasSize(debugCanvas, canvasWidth, canvasHeight);
            
            
            var oldStage = stage;
            stage = new createjs.Stage(debugCanvas);
            oldStage.canvas.parentNode.appendChild(debugCanvas);
            createjs.Touch.enable(stage);
            
            debugDraw = new box2d.b2DebugDraw();
            debugDraw.SetSprite(stage.canvas.getContext("2d"));
            debugDraw.SetFlags(box2d.b2DebugDraw.e_shapeBit | box2d.b2DebugDraw.e_jointBit);
            world.SetDebugDraw(debugDraw);
        }
    }
    
    return {
        init: init,
        isOn: isOn,
        run: run,
        canvas: debugCanvas
    }
})();