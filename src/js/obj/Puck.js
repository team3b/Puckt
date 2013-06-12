"use strict";

var puckt = puckt || {};
puckt.Puck = (function () {
    return puckt.Obj.extend({
        init: function (world, props) {
            console.log('Puck.init', world, props);
            var s;
            s = new box2d.b2CircleShape(puckt.util.pixelsToMetres(props.radius));

            this._super(world, "puck", {
                x: props.x,
                y: props.y,
                fixDef: {
                    density: puckt.puck_mass / (Math.PI * Math.pow(puckt.puck_radius, 2)),
                    friction: 0.01,
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
})();