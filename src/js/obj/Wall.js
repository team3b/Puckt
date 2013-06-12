"use strict";

var puckt = puckt || {};
puckt.Wall = (function () {
    return puckt.Obj.extend({
        init: function (world, props) {
            console.log('Wall.init', world, props);
            var s;
            s = new box2d.b2PolygonShape();
            s.SetAsBox(puckt.util.pixelsToMetres(props.w), puckt.util.pixelsToMetres(props.h));

            this.w = props.w;
            this.h = props.h;

            this._super(world, "wall", {
                x: props.x,
                y: props.y,
                fixDef: {
                    density: 5,
                    friction: 0.5,
                    restitution: 0.8,
                    shape: s
                },
                bodyDef: {
                    type: box2d.b2Body.b2_staticBody,
                    angle: props.angle || 0
                }
            });
        }
    });
})();