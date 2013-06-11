var puckt = puckt || {};

puckt.debug = (function () {
    var debugOn = false;
    
    function isDebugOn() {
        return debugOn;
    }
    
    function proxyEvents(source, dest) {
        for (var i = 2; i < arguments.length; i++) {
            source.addEventListener(arguments[i], function (e) {
                dest.dispatchEvent(e);
            },false); 
        }
    }
    
    function run(fn) {
        if (debugOn) {
            fn();
        }
    }
    
    return {
        isDebugOn: isDebugOn,
        proxyEvents: proxyEvents,
        run: run
    }
})();