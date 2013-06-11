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
                var hyp, opp, ang, v, end;
                // Initial checks on release.
                if (d.length>20)
                    d.splice(0, (d.length*0.9));
                else if (d.length>10)
                    d.splice(0, (d.length*0.7));
                // After checks are complete, calculate array length
                end = d.length - 1;
                // Compute hypotenuse, and opposite edge lengths
                hyp = puckt.util.calcHyp(d[0].pos, d[end].pos);
                opp = puckt.util.findDiff(d[0].pos.x, d[end].pos.x);
                // Calculate the projection
                ang = puckt.util.calcAngle(opp, hyp);
                // Calculate the velocity
                v = puckt.util.calcVelocity(hyp, d);
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