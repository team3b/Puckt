"use strict";

var puckt = puckt || {};
puckt.Puck = (function () {

    function tick() {
        var pos = this.body.GetPosition();
        this.shape.set({
            x: puckt.util.metresToPixels(pos.x) * puckt.canvas.ratio,
            y: puckt.util.metresToPixels(pos.y) * puckt.canvas.ratio,
            rotation: puckt.util.radiansToDegrees(this.body.GetAngle())
        });
    }

    var Puck = puckt.Obj.extend({
        init: function (world, props) {
            var s, puckImg;
            s = new box2d.b2CircleShape(puckt.util.pixelsToMetres(props.radius));

            this._super(world, "puck", {
                x: props.x,
                y: props.y,
                w: props.radius * 2,
                h: props.radius * 2,
                fixDef: {
                    density: Puck.realMass / (Math.PI * Math.pow(Puck.realRadius, 2)),
                    friction: 1,
                    restitution: 0.8,
                    shape: s
                },
                bodyDef: {
                    type: box2d.b2Body.b2_dynamicBody,
                    angle: props.angle || puckt.util.degreesToRadians(0)
                }
            });

            this.radius = props.radius;
            
            this.body.SetLinearDamping(0.4);

            this.shape.graphics.beginFill('#222222').drawCircle(props.radius * puckt.canvas.ratio, props.radius * puckt.canvas.ratio, props.radius * puckt.canvas.ratio);
            
            // Attach tick event listener
            this.shape.addEventListener('tick', tick.bind(this));
        },
        isInFlickZone: function () {
            // To do: return whether the puck is in the flick zone
            return true;
        }
    });

    Puck.realMass = 0.17 * 100;
    Puck.realRadius = (0.0762 / 2) * 100;
    Puck.image = null;

    return Puck;
})();