"use strict";

var puckt = puckt || {};
puckt.Wall = (function () {
    var Wall = puckt.Obj.extend({
        init: function (world, props) {
            var s;
            s = new box2d.b2PolygonShape();
            s.SetAsBox(puckt.util.pixelsToMetres(props.w) / 2, puckt.util.pixelsToMetres(props.h) / 2);

            this.lightColour = props.lightColour || '#92d548';

            this._super(world, "wall", {
                x: props.x,
                y: props.y,
                w: props.w,
                h: props.h,
                rotation: props.angle,
                fixDef: {
                    density: 5,
                    friction: 1,
                    restitution: 0.8,
                    shape: s
                },
                bodyDef: {
                    type: box2d.b2Body.b2_staticBody,
                    angle: puckt.util.degreesToRadians(props.angle || 0)
                }
            });

            this.shape.collide = this.collide.bind(this);
            this.setLightSwitch(props.isOn === true);

            this.collideEvents = [(function () {
                this.toggleLight();
            }).bind(this)];
        },
        isOn: false,
        toggleLight: function () {
            this.setLightSwitch(!this.isOn);
        },
        setLightSwitch: function (on) {
            var colour;

            this.isOn = on;
            colour = on ? this.lightColour : '#222222';

            this.shape.graphics.clear();
            this.shape.graphics.beginFill(colour).drawRect(0, 0, this.w, this.h);
        },
        collide: function () {
            for (var i in this.collideEvents) {
                this.collideEvents[i](this);
            }
        },
        addEventListener: function (event, fn) {
            if (event == 'collide') {
                this.collideEvents.push(fn);
            }
        }
    });

    return Wall;
})();