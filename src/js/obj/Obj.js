"use strict";

var puckt = puckt || {};
puckt.Obj = (function () {
    function tick() {
        var pos = this.body.GetPosition();
        this.shape.set({
            x: puckt.util.metresToPixels(pos.x),
            y: puckt.util.metresToPixels(pos.y),
            rotation: puckt.util.degreesToRadians(this.body.GetAngle())
        });
    }

	return Class.extend({
		init: function (world, objType, props) {
			console.log('Obj.init', world, objType, props);
	        this.fixDef = new box2d.b2FixtureDef();
	        this.bodyDef = new box2d.b2BodyDef();
	        this.shape = new createjs.Shape();

	        // Set shape properties
	        this.shape.x = props.x;
	        this.shape.y = props.y;
	        this.shape.type = objType;

	        // Set fixture attributes
	        puckt.util.extendObject(this.fixDef, props.fixDef);

	        // Set bodyDef properties
	        puckt.util.extendObject(this.bodyDef, props.bodyDef);
	        this.bodyDef.position = new box2d.b2Vec2(puckt.util.pixelsToMetres(props.x),
	                                                 puckt.util.pixelsToMetres(props.y));
	        
	        // Create shape's body
	        this.body = this.shape.body = world.CreateBody(this.bodyDef);
	        this.body.CreateFixture(this.fixDef);
	        this.body.SetUserData(this.shape);
	        
	        // Attach tick event listener
	        this.shape.addEventListener('tick', tick.bind(this));
		},
		setPosition: function (x, y) {
	        this.body.SetPosition(new box2d.b2Vec2(puckt.util.pixelsToMetres(x),
	                                               puckt.util.pixelsToMetres(y)));
	    }
	});
})();