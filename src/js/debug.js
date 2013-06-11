var puckt = puckt || {};

puckt.debug = (function () {
    var DEBUGGING = false,
        debugCanvas;
    
    function isOn() {
        return DEBUGGING;
    }
    
    function proxyEvents(source, dest) {
        for (var i = 2; i < arguments.length; i++) {
            source.addEventListener(arguments[i], function (e) {
                dest.dispatchEvent(e);
            },false); 
        }
    }
    
    function run(fn) {
        if (DEBUGGING) {
            console.log('debig.run', fn);
            fn();
        }
    }
    
    function init() {
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
            
            // Set up event proxies
            //puckt.debug.proxyEvents(debugCanvas, stage.canvas, 'mousedown', 'mousemove', 'mouseup');
        }
    }
    
    return {
        init: init,
        isOn: isOn,
        proxyEvents: proxyEvents,
        run: run,
        canvas: debugCanvas
    }
})();