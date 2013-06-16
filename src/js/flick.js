"use strict";

var puckt = puckt || {};
puckt.flick = (function() {
    var mass, callbacks = {flick: []},
     
    attachEvents = function (pk) {
        // Event listener for the initial touch on the puck
        var mousedown = (function () {
            var d = [],
                offset = {},
            
            mousemove = function (e) {
                // Reset velocity of puck once the user moves the Puck
                pk.body.SetLinearVelocity(new box2d.b2Vec2(0, 0));
                
                // Move the puck as the finger move
                pk.setPosition(
                    puckt.util.clamp(
                        pk.radius + 1, 
                        puckt.canvas.realWidth - pk.radius - 1,
                        e.stageX + offset.x
                    ), puckt.util.clamp(
                        puckt.canvas.realHeight - 104 + pk.radius,
                        puckt.canvas.realHeight - pk.radius - 1,
                        e.stageY + offset.y
                    )
                );
                
                // Detail of current movement
                d.push({
                    pos: {x: e.rawX, y: e.rawY},
                    timestamp: e.nativeEvent.timeStamp
                });
            },
            
            mouseup = function(e) {
                var xVel, yVel, end;
                if (d.length > 2) {
                    // Initial checks on release.
                    if (d.length>20)
                        d.splice(0, (d.length*0.9));
                    else if (d.length>10)
                        d.splice(0, (d.length*0.7));
                    // After checks are complete, calculate array length
                    end = d.length - 1;
                    // Calculate the velocity (in metres per second)
                    xVel = puckt.util.calcVelocity([d[0].pos.x, d[end].pos.x], 
                        [d[0].timestamp, d[end].timestamp]);
                    yVel = (puckt.util.calcVelocity([d[0].pos.y, d[end].pos.y], 
                        [d[0].timestamp, d[end].timestamp]));

                    // Convert velocity to b2Vec2()
                    var momentumVect = new box2d.b2Vec2(xVel * puckt.Puck.realMass, yVel * puckt.Puck.realMass);
                    if (d[end].pos.y >= puckt.canvas.realHeight - 112 + puckt.Puck.realRadius) {
                        pk.body.ApplyImpulse(momentumVect, pk.body.GetWorldCenter());
                        onflick();
                    }
                }
            },
            
            mousedown = function (e) {
                console.log('mousedown', e);
                var pos = pk.body.GetPosition();
                if (puckt.util.metresToPixels(pos.y) > 300) {
                    pk.body.SetLinearVelocity(new box2d.b2Vec2(0, 0));
                    offset = {
                        x: puckt.util.metresToPixels(pos.x) - e.stageX,
                        y: puckt.util.metresToPixels(pos.y) - e.stageY
                    };
                    e.addEventListener('mousemove', mousemove);
                    e.addEventListener('mouseup', mouseup);
                }
            };
            
            return mousedown;
        })();

        pk.shape.addEventListener('mousedown', mousedown);

    },

    onflick = function () {
        var flickEvents = callbacks.flick.slice();
        for (var i in flickEvents) {
            flickEvents[i]();
        }
    },

    addFlickEventListener = function (callback) {
        callbacks.flick.push(callback);
    },

    removeAllFlickEventListeners = function () {
        callbacks.flick.length = 0;
    },
    
    init = function(pk) {
        mass = pk.body.GetMass();
        attachEvents(pk);
    };
    
    return {
        init: init,
        attachEvents: attachEvents,
        addFlickEventListener: addFlickEventListener,
        removeAllFlickEventListeners: removeAllFlickEventListeners
    };
})();