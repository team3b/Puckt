(function(window) {
    function Touch(target) {
        // Event listener for the initial touch on the puck
        
        var mousedown = (function () {
            var d = [],
                offset = {},
            
            mousemove = function (e) {
                // Move the puck as the finger move
                target.x = e.stageX + offset.x;
                target.y = e.stageY + offset.y;
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
                    yVel = -(puckt.util.calcVelocity([d[0].pos.y, d[end].pos.y], 
                        [d[0].timestamp, d[end].timestamp]));

                    // Convert velocity to b2Vec2()
                    var vector = new box2d.b2Vec2(xVel, yVel);
                    console.log(target.body.GetWorldCenter);
                    // Get center point of puck
                    console.log(e.target.body.GetWorldCenter());
                }
            },
            
            mousedown = function (e) {
                offset = {
                    x: target.x - e.stageX,
                    y: target.y - e.stageY
                };
                
                e.addEventListener('mousemove', mousemove);
                e.addEventListener('mouseup', mouseup);
            };
            
            return mousedown;
        })();
        
        target.addEventListener('mousedown', mousedown);
    }
    window.Touch = Touch;
})(window);