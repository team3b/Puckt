(function(window) {
	function Puck() {
		var fixtureDef = new box2d.b2FixtureDef(),
            bodyDef = new box2d.b2BodyDef(),
            _this = this;
        // Create shape (will eventually be a bitmap or SVG)
        this.view = new createjs.Shape();
        // Style existing shape
        this.view.graphics.beginFill("#222222").drawCircle(150, (440/8)*7, 25);
        // Set scale
        this.view.scaleX = this.view.scaleY = this.view.scale = 1;
        // Set attributes for fixture
        fixtureDef.density = 5;
        fixtureDef.friction = 0.5;
        fixtureDef.resitution = 0.8;
        // Ensure the puck is affected by forces (gravity etc.)
        bodyDef.type = box2d.b2Body.b2_dynamicBody;
        // Set the fixture shape size the same as the object (for collisions)
        fixtureDef.shape = new box2d.b2CircleShape(25);
        // Create shape's body
        this.view.body = world.CreateBody(bodyDef);
        this.view.body.CreateFixture(fixtureDef);
        // Set tick function listener
        this.view.addEventListener("tick", function () {
        	tick(_this.view.body);
        });
	}
	function tick(view) {
		this.x = view.GetPosition().x;
        this.y = view.GetPosition().y;
        this.rotation = view.GetAngle() * (180 / Math.PI); //converts radians to degrees
	}
	window.Puck = Puck;
})(window);