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

            this.shape.collision = this.collision.bind(this);
            this.shape.isOn = this.isOn.bind(this);
            this.setLightSwitch(props.isOn === true);

            this.collisionEvents = [(function () {
                this.toggleLight();
            }).bind(this)];
        },
        on: false,
        isOn: function () { return this.on },
        toggleLight: function () {
            this.setLightSwitch(!this.on);
        },
        setLightSwitch: function (on) {
            var colour;

            this.on = on;
            colour = this.lightColour != null && on ? this.lightColour : Wall.offColour;

            this.shape.graphics.clear();
            this.shape.graphics.beginFill(colour).drawRect(0, 0, this.w, this.h);
        },
        collision: function (on, contact) {
            for (var i in this.collisionEvents) {
                this.collisionEvents[i](this, on, contact);
            }
            Wall.collisionHandler.call(this, on, contact);
        },
        addEventListener: function (event, fn) {
            if (event == 'collision') {
                this.collisionEvents.push(fn);
            }
        }
    });

    // This will be overwritten elsewhere
    Wall.collisionHandler = function () { };

    Wall.offColour = '#222222';

    return Wall;
})();