'use strict';var puckt=puckt||{};
puckt.util=function(){var c=function(b){return b/puckt.pxpm},a=function(b,a){return b>a?b-a:a-b},a=function(b,a){return b>a?b-a:a-b};return{pixelsToMetres:c,metresToPixels:function(b){return b*puckt.pxpm},degreesToRadians:function(b){return b*(Math.PI/180)},radiansToDegrees:function(b){return b*(180/Math.PI)},clamp:function(b,a,e){return Math.min(Math.max(e,b),a)},findDiff:a,dimTob2Vec2:function(b){return new box2d.b2Vec2(c(b.x),c(b.y))},calcVelocity:function(b,d){var e=c(b[b.length-1]-b[0]),g=a(d[0],
d[d.length-1]);return e/(0.0010*g)},setCanvasSize:function(b,a,e){b.setAttribute("width",a);b.setAttribute("height",e)},extendObject:function(b,a){for(var e in a)b[e]=a[e]},resetWorld:function(b){for(var a=b.GetBodyList();null!==a;)b.DestroyBody(a),a=a.GetNext();stage.removeAllChildren()}}}();"use strict";puckt=puckt||{};
puckt.flick=function(){var c=[],a=function(b){var a=function(){var a=[],d={},f=function(c){b.body.SetLinearVelocity(new box2d.b2Vec2(0,0));b.setPosition(puckt.util.clamp(b.radius+1,puckt.canvas.width-b.radius-1,c.stageX+d.x),puckt.util.clamp(puckt.canvas.height-104+b.radius,puckt.canvas.height-b.radius-1,c.stageY+d.y));a.push({pos:{x:c.rawX,y:c.rawY},timestamp:c.nativeEvent.timeStamp})},h=function(d){var h,f;if(2<a.length&&(20<a.length?a.splice(0,0.9*a.length):10<a.length&&a.splice(0,0.7*a.length),
d=a.length-1,h=puckt.util.calcVelocity([a[0].pos.x,a[d].pos.x],[a[0].timestamp,a[d].timestamp]),f=puckt.util.calcVelocity([a[0].pos.y,a[d].pos.y],[a[0].timestamp,a[d].timestamp]),h=new box2d.b2Vec2(h*puckt.Puck.realMass,f*puckt.Puck.realMass),a[d].pos.y>=puckt.canvas.height-112+puckt.Puck.realRadius)){b.body.ApplyImpulse(h,b.body.GetWorldCenter());d=c.slice();for(var g in d)d[g]()}};return function(a){var c=b.body.GetPosition();300<puckt.util.metresToPixels(c.y)&&(b.body.SetLinearVelocity(new box2d.b2Vec2(0,
0)),d={x:puckt.util.metresToPixels(c.x)-a.stageX,y:puckt.util.metresToPixels(c.y)-a.stageY},a.addEventListener("mousemove",f),a.addEventListener("mouseup",h))}}();b.shape.addEventListener("mousedown",a)};return{init:function(b){b.body.GetMass();a(b)},attachEvents:a,addFlickEventListener:function(b){c.push(b)},removeAllFlickEventListeners:function(){c.length=0}}}();"use strict";puckt=puckt||{};
puckt.Obj=function(){function c(){var a=this.body.GetPosition();this.shape.set({x:puckt.util.metresToPixels(a.x),y:puckt.util.metresToPixels(a.y),rotation:puckt.util.radiansToDegrees(this.body.GetAngle())})}return Class.extend({init:function(a,b,d){this.fixDef=new box2d.b2FixtureDef;this.bodyDef=new box2d.b2BodyDef;this.shape=new createjs.Shape;this.shape.x=d.x;this.shape.y=d.y;this.shape.regX=d.w/2;this.shape.regY=d.h/2;this.shape.rotation=d.rotation||0;this.shape.type=b;this.w=d.w;this.h=d.h;puckt.util.extendObject(this.fixDef,
d.fixDef);puckt.util.extendObject(this.bodyDef,d.bodyDef);this.bodyDef.position=puckt.util.dimTob2Vec2(d);this.bodyDef.bullet=!0;this.bodyDef.angle=puckt.util.degreesToRadians(this.shape.rotation);this.body=this.shape.body=a.CreateBody(this.bodyDef);this.body.CreateFixture(this.fixDef);this.body.SetUserData(this.shape);this.shape.addEventListener("tick",c.bind(this))},setPosition:function(a,b){this.body.SetPosition(puckt.util.dimTob2Vec2({x:a,y:b,w:this.w,h:this.h}))}})}();"use strict";
puckt=puckt||{};
puckt.Puck=function(){var c=puckt.Obj.extend({init:function(a,b){var d;d=new box2d.b2CircleShape(puckt.util.pixelsToMetres(b.radius));this._super(a,"puck",{x:b.x,y:b.y,w:2*b.radius,h:2*b.radius,fixDef:{density:c.realMass/(Math.PI*Math.pow(c.realRadius,2)),friction:1,restitution:0.8,shape:d},bodyDef:{type:box2d.b2Body.b2_dynamicBody,angle:b.angle||puckt.util.degreesToRadians(0)}});this.radius=b.radius;this.body.SetLinearDamping(0.4);this.shape.graphics.beginFill("#222222").drawCircle(b.radius,b.radius,
b.radius)},isInFlickZone:function(){return!0}});c.realMass=17;c.realRadius=3.81;c.image=null;return c}();"use strict";puckt=puckt||{};
puckt.Wall=function(){var c=puckt.Obj.extend({init:function(a,b){var c;c=new box2d.b2PolygonShape;c.SetAsBox(puckt.util.pixelsToMetres(b.w)/2,puckt.util.pixelsToMetres(b.h)/2);this.lightColour=void 0===b.lightColour?"#92d548":b.lightColour;this.on=!0===b.lightOn&&this.isLightWall();this._super(a,"wall",{x:b.x,y:b.y,w:b.w,h:b.h,rotation:b.angle,fixDef:{density:5,friction:1,restitution:0.8,shape:c},bodyDef:{type:box2d.b2Body.b2_staticBody,angle:puckt.util.degreesToRadians(b.angle||0)}});this.shape.collision=
this.collision.bind(this);this.shape.isOn=this.isOn.bind(this);this.setLightSwitch(!0===b.isOn);this.collisionEvents=[function(){this.toggleLight()}.bind(this)]},isLightWall:function(){return null!==this.lightColour},isOn:function(){return this.on},toggleLight:function(){this.setLightSwitch(!this.on)},setLightSwitch:function(a){if(this.isLightWall()&&!c.disabled){var b;b=(this.on=a)?this.lightColour:c.offColour;this.shape.graphics.clear();this.shape.graphics.beginFill(b).drawRect(0,0,this.w,this.h);
this.shape.shadow=a?new createjs.Shadow(b,0,0,15):null}},collision:function(a){for(var b in this.collisionEvents)this.collisionEvents[b].call(this,a);c.collisionHandler.call(this,a)},addEventListener:function(a,b){"collision"==a&&this.collisionEvents.push(b)}});c.disabled=!1;c.collisionHandler=function(){};c.offColour="#222222";return c}();"use strict";puckt=puckt||{};
puckt.Level=function(){function c(a,b){this.world=a;this.number=b;this.collisions=this.lightWallsOn=this.initialLightsOn=this.lightWalls=0;this.last=!1}c.prototype.boot=function(a,b){var c=this,e=new XMLHttpRequest;e.open("GET","levels/"+this.number+".json",!0);e.responseType="text";e.onload=function(g){200==this.status?(c.data=JSON.parse(e.responseText),a(g)):b(g)};e.send(null)};c.prototype.begin=function(){var a=this;this.reset();this.last=a.data.last;puckt.Wall.collisionHandler=function(){a.finished||
(a.collisions++,this.isLightWall()&&(this.isOn()?a.lightWallsOn++:a.lightWallsOn--),a.lightWalls===a.lightWallsOn&&a._levelComplete())};this._drawBoundaries(this.data.boundaries);this._drawWalls(this.data.walls);this._drawPuck(this.data.puck);this.lightWallsOn=this.initialLightsOn;1===this.number&&!localStorage.getItem("seenTutorial")&&puckt.ui.tutorial()};c.prototype.reset=function(){this.lightWallsOn=this.initialLightsOn=this.lightWalls=0;this.finished=!0;this.collisions=0;this.last=!1;puckt.util.resetWorld(this.world);
this.finished=!1;puckt.Wall.disabled=!1};c.successCallback=function(){};c.failCallback=function(){};c.prototype._levelComplete=function(){this.finished=puckt.Wall.disabled=!0;var a=0,b;for(b in this.data.stars)if(this.collisions<=this.data.stars[b])a++;else break;0<a?c.successCallback.call(this,a,this.collisions):c.failCallback.call(this,a,this.collisions)};c.prototype._failLevel=function(){c.failCallback.call(this,this.collisions)};c.prototype._drawBoundaries=function(a){a=a||{};switch(!0){case !1!==
a.top:new puckt.Wall(this.world,{lightColour:null,x:puckt.canvas.width/2,y:0,w:puckt.canvas.width,h:0});case !1!==a.right:new puckt.Wall(this.world,{lightColour:null,x:puckt.canvas.width,y:puckt.canvas.height/2,w:0,h:puckt.canvas.height});case !1!==a.bottom:new puckt.Wall(this.world,{lightColour:null,x:puckt.canvas.width/2,y:puckt.canvas.height,w:puckt.canvas.width,h:0});case !1!==a.left:new puckt.Wall(this.world,{lightColour:null,x:0,y:puckt.canvas.height/2,w:0,h:puckt.canvas.height})}};c.prototype._drawWalls=
function(a){if(a.length)for(var b=0,c=a.length;b<c;b++){var e=new puckt.Wall(this.world,{x:a[b].coords.x,y:a[b].coords.y,w:a[b].dimensions.w,h:a[b].dimensions.h,angle:a[b].angle,lightColour:a[b].lightColour,lightOn:a[b].lightOn});e.isLightWall()&&(this.lightWalls++,e.isOn()&&this.initialLightsOn++);stage.addChild(e.shape)}};c.prototype._drawPuck=function(a){a=new puckt.Puck(this.world,{x:a.coords.x,y:a.coords.y,radius:a.radius});stage.addChild(a.shape);puckt.flick.init(a)};return c}();"use strict";
puckt=puckt||{};
puckt.Game=function(){function c(){b=new box2d.b2World(new box2d.b2Vec2(0,0),!0);var a=new Box2D.Dynamics.b2ContactListener;a.BeginContact=function(a){var b=a.GetFixtureA().GetBody().GetUserData();(b.type="wall")&&b.collision(a)};b.SetContactListener(a);puckt.debug.init(b);e=new puckt.Level(b,d);e.boot(function(){e.begin()},function(){puckt.ui.openPopup({content:"<p>We failed to open your level, please refresh or reload the game.</p>"})});puckt.ui.drawNavigation(e)}function a(a){a.paused||(stage.update(),
puckt.debug.run(b.DrawDebugData.bind(b)),b.Step(1/g,10,10),b.ClearForces())}var b,d,e,g=60;return function(f){stage=new createjs.Stage(puckt.canvas.elem);createjs.Touch.enable(stage);d=f;puckt.music.play("backgroundMusic");puckt.Level.successCallback=function(a,c){var d=this,g,f={number:d.number,stars:a,collisions:c};g={content:"<p>Congratulations, you completed level "+d.number+" with "+a+" star"+(1!=a?"s":"")+"!</p>",buttons:[{text:"Proceed",callback:function(){puckt.ui.closePopup();e.data.last?
puckt.ui.openPopup({content:"<h1>You're good!</h1><p>Nice job completing all the levels. You have officially been Puckt. Return soon for new levels and features.</p>",buttons:[{text:"Quit",callback:function(){location.reload()}}]}):(e=new puckt.Level(b,++d.number),e.boot(function(){e.begin()},function(){puckt.ui.openPopup({content:"<p>We failed to open your level, please refresh or reload the game.</p>",buttons:[{text:"Reload",callback:function(){location.reload()}}]})}),puckt.ui.drawNavigation(e))}}]};
a!=d.data.stars.length&&g.buttons.push({text:"Retry",callback:function(){puckt.ui.closePopup();e.begin()}});g.buttons.push({text:"Quit",callback:function(){location.reload()}});puckt.ui.openPopup(g);g=JSON.parse(localStorage.getItem("levelsCompleted"));g.push(f);localStorage.setItem("levelsCompleted",JSON.stringify(g))};puckt.Level.failCallback=function(a,b){puckt.ui.openPopup({content:"<p>Unlucky, you didn't "+(null===a?"turn on all the lights":"get any stars")+". Please try again.</p>",buttons:[{text:"Retry",
callback:function(){puckt.ui.closePopup();e.begin()}},{text:"Quit",callback:function(){location.reload()}}]})};c();createjs.Ticker.addEventListener("tick",a);createjs.Ticker.setFPS(g);createjs.Ticker.useRAF=!0}}();"use strict";puckt=puckt||{};puckt.music=function(){return{load:function(c){},play:function(){},stop:function(){},setVolume:function(c){}}}();"use strict";puckt=puckt||{};puckt.debug=function(){return{init:function(c){},isOn:function(){return!1},run:function(c){},canvas:void 0}}();"use strict";
puckt=puckt||{};
puckt.ui=function(){function c(b){var c=document.createElement("aside"),g=document.createElement("section"),f;c.className="message";g.innerHTML=b.content;c.style.width=puckt.canvas.width+"px";c.style.height=puckt.canvas.height+puckt.canvas.navHeight+"px";c.style.opacity="0";if(b.buttons)for(var h=0;h<b.buttons.length;h++)f=document.createElement("a"),f.href="",f.className="button",f.innerHTML=b.buttons[h].text,a(f,b.buttons[h]),g.appendChild(f);c.appendChild(g);document.body.appendChild(c);setTimeout(function(){c.style.opacity=
"1"},1)}function a(a,b){a.addEventListener("click",function(a){a.preventDefault();b.callback()})}function b(){var a=document.querySelectorAll(".message");a[0].style.opacity="0";setTimeout(function(){a[0]&&a[0].parentNode.removeChild(a[0])},250)}return{openPopup:c,closePopup:b,tutorial:function(){console.log("here");c({content:"<h1>Tutorial</h1><p>Welcome to Puckt.<p>",buttons:[{text:"Next",callback:function(){b();c({content:"Flick the puck to toggle the walls. Line up and release your shot below the blue line. Made a mistake? Don't fret mutton, use the reset button. The less collisions, the more stars. Happy days.</p>",
buttons:[{text:"Close",callback:function(){puckt.ui.closePopup()}}]})}}]});localStorage.setItem("seenTutorial",!0)},drawNavigation:function(a){var b=document.querySelector("nav"),c=document.createElement("nav"),f=document.createElement("a"),h=document.createElement("a"),k=document.createElement("span");b&&b.parentNode.removeChild(b);c.style.width=puckt.canvas.width+"px";c.style.height=puckt.canvas.navHeight+"px";k.id="level_text";k.innerHTML="Level "+a.number;f.className="left";f.href="";f.innerHTML=
'<i class="icon-large icon-arrow-left"></i>';f.style.height=puckt.canvas.navHeight+"px";f.style.width=puckt.canvas.navHeight+"px";f.addEventListener("click",function(){location.reload()});h.className="right";h.href="";h.innerHTML='<i class="icon-large icon-refresh"></i>';h.style.height=puckt.canvas.navHeight+"px";h.style.width=puckt.canvas.navHeight+"px";h.addEventListener("click",function(b){b.preventDefault();a.begin()},!1);c.appendChild(f);c.appendChild(h);c.appendChild(k);document.body.appendChild(c)}}}();
"use strict";var box2d,stage,puckt=puckt||{};puckt.canvas={elem:document.createElement("canvas"),iceRink:document.getElementById("ice-rink"),width:320,height:410,navHeight:50};puckt.pxpm=30/puckt.Puck.realRadius;
puckt.main=function(){var c=function(a){document.body.appendChild(puckt.canvas.elem);puckt.canvas.elem.setAttribute("id","canvas");puckt.util.setCanvasSize(puckt.canvas.elem,puckt.canvas.width,puckt.canvas.height);puckt.canvas.elem.style.top=puckt.canvas.navHeight+"px";puckt.canvas.iceRink.style.top=puckt.canvas.navHeight+"px";canvg(document.getElementById("ice-rink"),"img/ice_rink.svg");new puckt.Game(a)},a=function(){puckt.music.load(function(){})};box2d={b2Vec2:Box2D.Common.Math.b2Vec2,b2BodyDef:Box2D.Dynamics.b2BodyDef,
b2Body:Box2D.Dynamics.b2Body,b2FixtureDef:Box2D.Dynamics.b2FixtureDef,b2Fixture:Box2D.Dynamics.b2Fixture,b2World:Box2D.Dynamics.b2World,b2MassData:Box2D.Collision.Shapes.b2MassData,b2PolygonShape:Box2D.Collision.Shapes.b2PolygonShape,b2CircleShape:Box2D.Collision.Shapes.b2CircleShape,b2DebugDraw:Box2D.Dynamics.b2DebugDraw};return{init:function(){var b={content:"<h1>Puckt</h1> <small>beta</small><p>Puckt is a mobile HTML5 game designed to test your visual and mathematical skills.</p>",buttons:[{text:"New Game",
callback:function(){puckt.ui.closePopup();localStorage.setItem("levelsCompleted",JSON.stringify([]));c(1)}}]};JSON.parse(localStorage.getItem("levelsCompleted"))&&0<JSON.parse(localStorage.getItem("levelsCompleted")).length&&b.buttons.push({text:"Continue Game",callback:function(){puckt.ui.closePopup();var a=JSON.parse(localStorage.getItem("levelsCompleted")).pop().number+1;c(a)}});puckt.debug.isOn()||navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPod/i)?puckt.debug.isOn()||window.navigator.standalone?
(a(),puckt.ui.openPopup(b)):puckt.ui.openPopup({content:"<h1>Puckt</h1> <small>beta</small><p>To play, you must first add this page to your <strong>Home Screen</strong>.</p>"}):puckt.ui.openPopup({content:"<h1>Puckt</h1> <small>beta</small><p>This game requires an iPhone or iPod Touch running iOS 5 or above.</p>"})}}}();window.addEventListener("load",puckt.main.init);