"use strict";

var puckt = puckt || {};
puckt.Puck = (function () {
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


            this.body.SetLinearDamping(0.4);
            //this.body.SetAngularDamping(0.4);

            // puckImg = new Image(props.w, props.h);
            // puckImg.src = 'img/puck.svg';
            // this.shape.graphics.beginBitmapFill(puckImg).drawCircle(props.radius, props.radius, props.radius);

            this.shape.graphics.beginFill('#222222').drawCircle(props.radius, props.radius, props.radius);
        },
        isInFlickZone: function () {
            // To do: return whether the puck is in the flick zone
            return true;
        }
    });

    Puck.realMass = 0.17 * 100;
    Puck.realRadius = (0.0762 / 2) * 100;

    return Puck;
})();