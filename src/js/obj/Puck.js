"use strict";

var puckt = puckt || {};
puckt.Puck = (function () {
    function Puck(x, y, radius) {
        this.fixDef = new box2d.b2FixtureDef();
        this.bodyDef = new box2d.b2BodyDef();
        this.shape = new createjs.Shape();
        
        // Set shape properties
        this.shape.x = x;
        this.shape.y = y;
        this.shape.graphics.beginFill('#222222').drawCircle(0, 0, radius);
        
        // Set fixture attributes
        this.fixDef.density = puckt.puck_mass / (Math.PI * Math.pow(puckt.puck_radius, 2));
        console.log('d', this.fixDef.density);
        this.fixDef.friction = 0.01;
        this.fixDef.restitution = 0.8;
        this.fixDef.shape = new box2d.b2CircleShape(puckt.util.pixelsToMetres(radius));
        
        // Ensure puck is affected by forces
        this.bodyDef.type = box2d.b2Body.b2_dynamicBody;
        this.bodyDef.position = new box2d.b2Vec2(puckt.util.pixelsToMetres(x), puckt.util.pixelsToMetres(y));
        
        // Create shape's body
        this.body = this.shape.body = world.CreateBody(this.bodyDef);
        this.body.CreateFixture(this.fixDef);
        this.body.SetUserData(this.shape);
        
        // Attach tick event listener
        this.shape.addEventListener('tick', tick.bind(this));
    }
    
    Puck.prototype.SetPosition = function (x, y) {
        this.body.SetPosition(new box2d.b2Vec2(puckt.util.pixelsToMetres(x), puckt.util.pixelsToMetres(y)));
        console.log('Puck.SetPosition', x, y, this.body.GetPosition());
    };
    
    function tick() {
        var pos = this.body.GetPosition();
        
        this.shape.set({
            x: puckt.util.metresToPixels(pos.x),
            y: puckt.util.metresToPixels(pos.y),
            rotation: this.body.GetAngle() * (180 / Math.PI)
        });
    }
    
    return Puck;
})();