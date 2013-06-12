"use strict";

var puckt = puckt || {};
puckt.Wall = (function () {
    var Wall = puckt.Obj.extend({
        init: function (world, props) {
            var s;
            s = new box2d.b2PolygonShape();
            s.SetAsBox(puckt.util.pixelsToMetres(props.w), puckt.util.pixelsToMetres(props.h));

            this.w = props.w;
            this.h = props.h;
            this.lightColour = props.lightColour || '#92d548'

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

            this.shape.toggleLight = this.toggleLight.bind(this);
            this.setLightSwitch(props.isOn === true);
        },
        isOn: false,
        toggleLight: function () {
            this.setLightSwitch(!this.isOn);
        },
        setLightSwitch: function (on) {
            var colour;

            this.isOn = on;
            colour = on ? this.lightColour : '#222222';

            console.log('Wall.setLightSwitch', on, colour);

            this.shape.graphics.clear();
            this.shape.graphics.beginFill(colour).drawRect(0, 0, this.w, this.h);
        }
    });

    return Wall;
})();