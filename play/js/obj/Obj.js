"use strict";

var puckt = puckt || {};
puckt.Obj = (function () {
    function tick() {
        var pos = this.body.GetPosition();
        this.shape.set({
            x: puckt.util.metresToPixels(pos.x),
            y: puckt.util.metresToPixels(pos.y),
            rotation: puckt.util.radiansToDegrees(this.body.GetAngle())
        });
    }

	return Class.extend({
		init: function (world, objType, props) {
	        this.fixDef = new box2d.b2FixtureDef();
	        this.bodyDef = new box2d.b2BodyDef();
	        this.shape = new createjs.Shape();

	        // Set shape properties
	        this.shape.x = props.x;
	        this.shape.y = props.y;
            this.shape.regX = props.w / 2;
            this.shape.regY = props.h / 2;
	        this.shape.rotation = props.rotation || 0;
	        this.shape.type = objType;

            this.w = props.w;
            this.h = props.h;

	        // Set fixture attributes
	        puckt.util.extendObject(this.fixDef, props.fixDef);

	        // Set bodyDef properties
	        puckt.util.extendObject(this.bodyDef, props.bodyDef);

            this.bodyDef.position = puckt.util.dimTob2Vec2(props);
            this.bodyDef.bullet = true;
            this.bodyDef.angle = puckt.util.degreesToRadians(this.shape.rotation);
	        
	        // Create shape's body
	        this.body = this.shape.body = world.CreateBody(this.bodyDef);
	        this.body.CreateFixture(this.fixDef);
	        this.body.SetUserData(this.shape);
	        
	        // Attach tick event listener
	        this.shape.addEventListener('tick', tick.bind(this));
		},
		setPosition: function (x, y) {
	        this.body.SetPosition(puckt.util.dimTob2Vec2({x: x, y: y, w: this.w, h: this.h}));
	    }
	});
})();