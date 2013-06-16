"use strict";

var puckt = puckt || {};
puckt.Obj = (function () {
	// Define and return the Obj class
	return Class.extend({
		// Instatniate a new instance of the Obj class
		init: function (world, objType, props) {
			// Create 
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

	        // Set a w (width) and h (height) property on the object
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
		},
		// Sets the position of the object
		setPosition: function (x, y) {
	        this.body.SetPosition(puckt.util.dimTob2Vec2({x: x, y: y, w: this.w, h: this.h}));
	    }
	});
})();