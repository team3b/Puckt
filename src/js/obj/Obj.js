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
	        this.shape.x = props.x * puckt.canvas.ratio;
	        this.shape.y = props.y * puckt.canvas.ratio;
            this.shape.regX = (props.w / 2) * puckt.canvas.ratio;
            this.shape.regY = (props.h / 2) * puckt.canvas.ratio;
	        this.shape.rotation = props.rotation || 0;
	        this.shape.type = objType;

	        // Set the object's width and height properties
            this.realWidth = props.w;
            this.realHeight = props.h;
            this.canvasWidth = this.realWidth * puckt.canvas.ratio;
            this.canvasHeight = this.realHeight * puckt.canvas.ratio;

	        // Set fixture attributes
	        puckt.util.extendObject(this.fixDef, props.fixDef);

	        // Set bodyDef properties
	        puckt.util.extendObject(this.bodyDef, props.bodyDef);

            this.bodyDef.position = puckt.util.posTob2Vec2(props);
            this.bodyDef.bullet = true;
            this.bodyDef.angle = puckt.util.degreesToRadians(this.shape.rotation);
	        
	        // Create shape's body
	        this.body = this.shape.body = world.CreateBody(this.bodyDef);
	        this.body.CreateFixture(this.fixDef);
	        this.body.SetUserData(this.shape);
		},
		// Sets the position of the object
		setPosition: function (x, y) {
	        this.body.SetPosition(puckt.util.posTob2Vec2({x: x, y: y}));
	    }
	});
})();