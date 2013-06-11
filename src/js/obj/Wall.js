"use strict";

puckt.Wall = (function () {
    function Wall(x, y, w, h) {
        this.fixDef = new box2d.b2FixtureDef();
        this.bodyDef = new box2d.b2BodyDef();
        this.shape = new createjs.Shape();
        
        // Set shape properties
        this.shape.scale = 1;
        this.shape.x = x;
        this.shape.y = y;
        this.shape.graphics.beginFill('#222222').drawRect(0, 0, w, h);
        
        // Set fixture attributes
        this.fixDef.density = 5;
        this.fixDef.friction = 0.5;
        this.fixDef.restitution = 0.8;
        this.fixDef.shape = new box2d.b2PolygonShape();
        this.fixDef.shape.SetAsBox(puckt.util.convertToMetres(w), puckt.util.convertToMetres(y));
        
        // Ensure wall is not affected by forces
        this.bodyDef.type = box2d.b2Body.b2_staticBody;
        this.bodyDef.position = new box2d.b2Vec2(x, y);
        
        // Create shape's body
        this.body = this.shape.body = world.CreateBody(this.bodyDef);
        this.body.CreateFixture(this.fixDef);
        this.body.SetUserData(this.shape);
        
        // Attach tick event listener
        this.shape.addEventListener('tick', tick.bind(this));
    }
    
    Wall.prototype.SetPosition = function (x, y) {
        this.body.SetPosition(new box2d.b2Vec2(puckt.util.convertToMetres(x), puckt.util.convertToMetres(y)));
    };
    
    function tick() {
        var pos = this.body.GetPosition();
        this.shape.set({
            x: puckt.util.convertFromMetres(pos.x),
            y: puckt.util.convertFromMetres(pos.y),
            rotation: this.body.GetAngle() * (180 / Math.PI)
        });
    }
    
    return Wall;
})();