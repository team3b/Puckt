"use strict";

var puckt = puckt || {};
puckt.Puck = (function () {

    function tick() {
        var pos = this.body.GetPosition();
        pos = puckt.util.b2Vec2ToPos(pos);
        pos.rotation = puckt.util.radiansToDegrees(this.body.GetAngle())
        this.shape.set(pos);
    }

    var Puck = puckt.Obj.extend({
        init: function (world, props) {
            var s, puckImg;
            s = new box2d.b2CircleShape(puckt.util.pixelsToMetres(props.radius * puckt.canvas.ratio));

            this._super(world, "puck", {
                x: props.x,
                y: props.y,
                w: props.radius * 2,
                h: props.radius * 2,
                fixDef: {
                    density: Puck.realWorldMass / (Math.PI * Math.pow(Puck.realWorldRadius, 2)),
                    friction: 1,
                    restitution: 0.8,
                    shape: s
                },
                bodyDef: {
                    type: box2d.b2Body.b2_dynamicBody,
                    angle: props.angle || puckt.util.degreesToRadians(0)
                }
            });

            this.realRadius = props.radius;
            this.canvasRadius = props.radius * puckt.canvas.ratio;
            
            this.body.SetLinearDamping(0.4);

            this.shape.graphics.beginFill('#222222').drawCircle(this.canvasRadius, this.canvasRadius, this.canvasRadius);
            
            // Attach tick event listener
            this.shape.addEventListener('tick', tick.bind(this));
        },
        isInFlickZone: function () {
            // To do: return whether the puck is in the flick zone
            return true;
        }
    });

    Puck.realWorldMass = 0.17 * 100;
    Puck.realWorldRadius = (0.0762 / 2) * 100;
    Puck.image = null;

    return Puck;
})();