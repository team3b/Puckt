(function(window) {
    var mass;
    
    function Flick(pk) {
        mass = pk.body.GetMass();
        window.PUCKX = pk;
        
        // Event listener for the initial touch on the puck
        var mousedown = (function () {
            pk.body.SetLinearVelocity(new box2d.b2Vec2(0, 0));
            
            var d = [],
                offset = {},
            
            mousemove = function (e) {
                console.log('mousemove', e, pk.body.GetPosition());
                
                // Move the puck as the finger move
                pk.SetPosition(e.stageX + offset.x,
                               e.stageY + offset.y);
                
                // Detail of current movement
                d.push({
                    pos: {x: e.rawX, y: e.rawY},
                    timestamp: e.nativeEvent.timeStamp
                });
            },
            
            mouseup = function(e) {
                console.log('mouseup', e);
                
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
                    var momentumVect = new box2d.b2Vec2(xVel * mass, yVel * mass);
                    console.log('momentumVect', momentumVect);
                    pk.body.ApplyImpulse(momentumVect, pk.body.GetWorldCenter());
                }
            },
            
            mousedown = function (e) {
                console.log('mousedown', e, pk.body, pk.body.GetPosition());
                
                var pos = pk.body.GetPosition();
                offset = {
                    x: pos.x - e.stageX,
                    y: pos.y - e.stageY
                };
                
                e.addEventListener('mousemove', mousemove);
                e.addEventListener('mouseup', mouseup);
            };
            
            return mousedown;
        })();
        
        pk.shape.addEventListener('mousedown', mousedown);
    }
    window.Flick = Flick;
})(window);