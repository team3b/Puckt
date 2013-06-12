"use strict";

var puckt = puckt || {};
puckt.Puck = (function () {
    var Puck = puckt.Obj.extend({
        init: function (world, props) {
            var s;
            s = new box2d.b2CircleShape(puckt.util.pixelsToMetres(props.radius));

            this._super(world, "puck", {
                x: props.x,
                y: props.y,
                w: props.radius * 2,
                h: props.radios * 2,
                fixDef: {
                    density: Puck.realMass / (Math.PI * Math.pow(Puck.realRadius, 2)),
                    friction: 1,
                    restitution: 0.8,
                    shape: s
                },
                bodyDef: {
                    type: box2d.b2Body.b2_dynamicBody,
                    angle: props.angle || 0
                }
            });



            this.shape.graphics.beginFill('#222222').drawCircle(0, 0, props.radius);
        }
    });

    Puck.realMass = 0.17 * 100;
    Puck.realRadius = (0.0762 / 2) * 100;

    return Puck;
})();