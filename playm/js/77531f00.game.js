var c=!0,k=null,l=!1;function n(){return function(){}}var p=p||{};
p.d=function(){function d(a,b){return a>b?a-b:b-a}function b(a){return a/p.qa}d=function(a,b){return a>b?a-b:b-a};return{aa:b,L:function(a){return a*p.qa},W:function(a){return a*(Math.PI/180)},Da:function(a){return a*(180/Math.PI)},ja:function(a,b,d){return Math.min(Math.max(d,a),b)},Ua:d,la:function(a){return new q.b2Vec2(b(a.x),b(a.y))},ia:function(a,e){return b(a[a.length-1]-a[0])/(0.0010*d(e[0],e[e.length-1]))},Fa:function(a,b,d){a.setAttribute("width",b);a.setAttribute("height",d)},na:function(a,
b){for(var d in b)a[d]=b[d]},Ea:function(a){for(var b=a.GetBodyList();b!==k;)a.DestroyBody(b),b=b.GetNext();r.cb()}}}();"use strict";p=p||{};
p.Aa=function(){function d(a){a.shape.addEventListener("mousedown",function(){function e(){var e,d,g;if(2<f.length&&(20<f.length?f.splice(0,0.9*f.length):10<f.length&&f.splice(0,0.7*f.length),g=f.length-1,e=p.d.ia([f[0].M.x,f[g].M.x],[f[0].timestamp,f[g].timestamp]),d=p.d.ia([f[0].M.y,f[g].M.y],[f[0].timestamp,f[g].timestamp]),e=new q.b2Vec2(e*p.D.ba,d*p.D.ba),f[g].M.y>=p.canvas.height-112+p.D.ca)){a.body.ApplyImpulse(e,a.body.GetWorldCenter());g=b.slice();for(var h in g)g[h]()}}function d(b){a.body.SetLinearVelocity(new q.b2Vec2(0,
0));a.Ga(p.d.ja(a.radius+1,p.canvas.width-a.radius-1,b.Ha+h.x),p.d.ja(p.canvas.height-104+a.radius,p.canvas.height-a.radius-1,b.Ia+h.y));f.push({M:{x:b.Za,y:b.$a},timestamp:b.Xa.timeStamp})}var f=[],h={};return function(b){var f=a.body.GetPosition();300<p.d.L(f.y)&&(a.body.SetLinearVelocity(new q.b2Vec2(0,0)),h={x:p.d.L(f.x)-b.Ha,y:p.d.L(f.y)-b.Ia},b.addEventListener("mousemove",d),b.addEventListener("mouseup",e))}}())}var b=[];return{init:function(a){a.body.GetMass();d(a)},Qa:d,Pa:function(a){b.push(a)},
eb:function(){b.length=0}}}();"use strict";p=p||{};
p.fa=function(){function d(){var b=this.body.GetPosition();this.shape.set({x:p.d.L(b.x),y:p.d.L(b.y),rotation:p.d.Da(this.body.GetAngle())})}return Class.extend({init:function(b,a,e){this.H=new q.b2FixtureDef;this.n=new q.b2BodyDef;this.shape=new createjs.Ma;this.shape.x=e.x;this.shape.y=e.y;this.shape.ab=e.w/2;this.shape.bb=e.f/2;this.shape.rotation=e.rotation||0;this.shape.type=a;this.w=e.w;this.f=e.f;p.d.na(this.H,e.H);p.d.na(this.n,e.n);this.n.position=p.d.la(e);this.n.bullet=c;this.n.angle=p.d.W(this.shape.rotation);
this.body=this.shape.body=b.CreateBody(this.n);this.body.CreateFixture(this.H);this.body.SetUserData(this.shape);this.shape.addEventListener("tick",d.bind(this))},Ga:function(b,a){this.body.SetPosition(p.d.la({x:b,y:a,w:this.w,f:this.f}))}})}();"use strict";p=p||{};
p.D=function(){var d=p.fa.extend({init:function(b,a){var e;e=new q.b2CircleShape(p.d.aa(a.radius));this._super(b,"puck",{x:a.x,y:a.y,w:2*a.radius,f:2*a.radius,H:{density:d.ba/(Math.PI*Math.pow(d.ca,2)),friction:1,restitution:0.8,shape:e},n:{type:q.b2Body.b2_dynamicBody,angle:a.angle||p.d.W(0)}});this.radius=a.radius;this.body.SetLinearDamping(0.4);this.shape.graphics.ya("#222222").Sa(a.radius,a.radius,a.radius)},Wa:function(){return c}});d.ba=17;d.ca=3.81;d.image=k;return d}();"use strict";p=p||{};
p.l=function(){var d=p.fa.extend({init:function(b,a){var e;e=new q.b2PolygonShape;e.SetAsBox(p.d.aa(a.w)/2,p.d.aa(a.f)/2);this.k=void 0===a.k?"#92d548":a.k;this.$=a.pa===c&&this.P();this._super(b,"wall",{x:a.x,y:a.y,w:a.w,f:a.f,rotation:a.angle,H:{density:5,friction:1,restitution:0.8,shape:e},n:{type:q.b2Body.b2_staticBody,angle:p.d.W(a.angle||0)}});this.shape.U=this.U.bind(this);this.shape.o=this.o.bind(this);this.ra(a.o===c);this.V=[function(){this.Ja()}.bind(this)]},P:function(){return this.k!==
k},o:function(){return this.$},Ja:function(){this.ra(!this.$)},ra:function(b){if(this.P()&&!d.disabled){var a;a=(this.$=b)?this.k:d.Ca;this.shape.graphics.clear();this.shape.graphics.ya(a).Ta(0,0,this.w,this.f);this.shape.hb=b?new createjs.La(a,0,0,15):k}},U:function(b){for(var a in this.V)this.V[a].call(this,b);d.ka.call(this,b)},addEventListener:function(b,a){"collision"==b&&this.V.push(a)}});d.disabled=l;d.ka=n();d.Ca="#222222";return d}();"use strict";p=p||{};
p.N=function(){function d(b,a){this.t=b;this.q=a;this.B=this.J=this.Y=this.Z=0;this.Q=l}d.prototype.ha=function(b,a){var e=this,d=new XMLHttpRequest;d.open("GET","levels/"+this.q+".json",c);d.responseType="text";d.onload=function(f){200==this.status?(e.data=JSON.parse(d.responseText),b(f)):a(f)};d.send(k)};d.prototype.begin=function(){var b=this;this.reset();this.Q=b.data.Q;p.l.ka=function(){b.X||(b.B++,this.P()&&(this.o()?b.J++:b.J--),b.Z===b.J&&b.xa())};this.ua(this.data.Ra);this.wa(this.data.kb);
this.va(this.data.Ya);this.J=this.Y;1===this.q&&!localStorage.getItem("seenTutorial")&&p.e.Ka()};d.prototype.reset=function(){this.J=this.Y=this.Z=0;this.X=c;this.B=0;this.Q=l;p.d.Ea(this.t);this.X=l;p.l.disabled=l};d.sa=n();d.oa=n();d.prototype.xa=function(){this.X=p.l.disabled=c;var b=0,a;for(a in this.data.da)if(this.B<=this.data.da[a])b++;else break;0<b?d.sa.call(this,b,this.B):d.oa.call(this,b,this.B)};d.prototype.ua=function(b){b=b||{};switch(c){case b.top!==l:new p.l(this.t,{k:k,x:p.canvas.width/
2,y:0,w:p.canvas.width,f:0});case b.right!==l:new p.l(this.t,{k:k,x:p.canvas.width,y:p.canvas.height/2,w:0,f:p.canvas.height});case b.bottom!==l:new p.l(this.t,{k:k,x:p.canvas.width/2,y:p.canvas.height,w:p.canvas.width,f:0});case b.left!==l:new p.l(this.t,{k:k,x:0,y:p.canvas.height/2,w:0,f:p.canvas.height})}};d.prototype.wa=function(b){if(b.length)for(var a=0,d=b.length;a<d;a++){var g=new p.l(this.t,{x:b[a].coords.x,y:b[a].coords.y,w:b[a].za.w,f:b[a].za.f,angle:b[a].angle,k:b[a].k,pa:b[a].pa});g.P()&&
(this.Z++,g.o()&&this.Y++);r.addChild(g.shape)}};d.prototype.va=function(b){b=new p.D(this.t,{x:b.coords.x,y:b.coords.y,radius:b.radius});r.addChild(b.shape);p.Aa.init(b)};return d}();"use strict";p=p||{};
p.ta=function(){function d(){a=new q.b2World(new q.b2Vec2(0,0),c);var b=new Box2D.Dynamics.b2ContactListener;b.BeginContact=function(a){var b=a.GetFixtureA().GetBody().GetUserData();(b.type="wall")&&b.U(a)};a.SetContactListener(b);p.debug.init(a);g=new p.N(a,e);g.ha(function(){g.begin()},function(){p.e.s({content:"<p>We failed to open your level, please refresh or reload the game.</p>"})});p.e.ma(g)}function b(b){b.paused||(r.update(),p.debug.run(a.DrawDebugData.bind(a)),a.Step(1/f,10,10),a.ClearForces())}
var a,e,g,f=60;return function(h){r=new createjs.Na(p.canvas.O);createjs.Oa.enable(r);e=h;p.N.sa=function(b,d){var e=this,f,h={q:e.q,da:b,B:d};f={content:"<p>Congratulations, you completed level "+e.q+" with "+b+" star"+(1!=b?"s":"")+"!</p>",h:[{text:"Proceed",j:function(){p.e.u();g.data.Q?p.e.s({content:"<h1>You're good!</h1><p>Nice job completing all the levels. You have officially been Puckt. Return soon for new levels and features.</p>",h:[{text:"Quit",j:function(){location.reload()}}]}):(g=new p.N(a,
++e.q),g.ha(function(){g.begin()},function(){p.e.s({content:"<p>We failed to open your level, please refresh or reload the game.</p>",h:[{text:"Reload",j:function(){location.reload()}}]})}),p.e.ma(g))}}]};b!=e.data.da.length&&f.h.push({text:"Retry",j:function(){p.e.u();g.begin()}});f.h.push({text:"Quit",j:function(){location.reload()}});p.e.s(f);f=JSON.parse(localStorage.getItem("levelsCompleted"));f.push(h);localStorage.setItem("levelsCompleted",JSON.stringify(f))};p.N.oa=function(a){p.e.s({content:"<p>Unlucky, you didn't "+
(a===k?"turn on all the lights":"get any stars")+". Please try again.</p>",h:[{text:"Retry",j:function(){p.e.u();g.begin()}},{text:"Quit",j:function(){location.reload()}}]})};d();createjs.ga.addEventListener("tick",b);createjs.ga.fb(f);createjs.ga.jb=c}}();"use strict";p=p||{};
p.S=function(){function d(a,e){plau(a,e);b[a].removeEventListener("canplay",d)}var b={};return{load:function(a,d,g,f){b[a]=document.createElement("audio");b[a].setAttribute("src",d);b[a].addEventListener("canplay",g,l);b[a].addEventListener("error",f,l);b[a].load();return b[a]},play:function(a,e){b[a]&&(e=e||0,4==b[a].readyState?(b[a].currentTime=e,b[a].play()):b[a].addEventListener("canplay",function(){d(a,e)}));return b[a]},stop:stop,gb:function(a,d){b[a].volume=d},ea:"bgMusic"}}();"use strict";
p=p||{};p.debug={init:n(),o:function(){return l},run:n(),canvas:void 0};"use strict";p=p||{};
p.e=function(){function d(a){var d=document.createElement("aside"),f=document.createElement("section"),h;d.className="message";f.innerHTML=a.content;d.style.width=p.canvas.width+"px";d.style.height=p.canvas.height+p.canvas.C+"px";d.style.opacity="0";if(a.h)for(var m=0;m<a.h.length;m++)h=document.createElement("a"),h.href="",h.className="button",h.innerHTML=a.h[m].text,b(h,a.h[m]),f.appendChild(h);d.appendChild(f);document.body.appendChild(d);setTimeout(function(){d.style.opacity="1"},1)}function b(a,
b){a.addEventListener("click",function(a){a.preventDefault();b.j()})}function a(){var a=document.querySelectorAll(".message");a[0].style.opacity="0";setTimeout(function(){a[0]&&a[0].parentNode.removeChild(a[0])},250)}return{s:d,u:a,Ka:function(){console.log("here");d({content:"<h1>Tutorial</h1><p>Welcome to Puckt.<p>",h:[{text:"Next",j:function(){a();d({content:"Flick the puck to toggle the walls. Line up and release your shot below the blue line. Made a mistake? Don't fret mutton, use the reset button. The less collisions, the more stars. Happy days.</p>",
h:[{text:"Close",j:function(){p.e.u()}}]})}}]});localStorage.setItem("seenTutorial",c)},ma:function(a){var b=document.querySelector("nav"),d=document.createElement("nav"),h=document.createElement("a"),m=document.createElement("a"),s=document.createElement("span");b&&b.parentNode.removeChild(b);d.style.width=p.canvas.width+"px";d.style.height=p.canvas.C+"px";s.id="level_text";s.innerHTML="Level "+a.q;h.className="left";h.href="";h.innerHTML='<i class="icon-large icon-arrow-left"></i>';h.style.height=
p.canvas.C+"px";h.style.width=p.canvas.C+"px";h.addEventListener("click",function(){location.reload()});m.className="right";m.href="";m.innerHTML='<i class="icon-large icon-refresh"></i>';m.style.height=p.canvas.C+"px";m.style.width=p.canvas.C+"px";m.addEventListener("click",function(b){b.preventDefault();a.begin()},l);d.appendChild(h);d.appendChild(m);d.appendChild(s);document.body.appendChild(d)}}}();"use strict";var q,r,p=p||{};
p.canvas={O:document.createElement("canvas"),Va:document.getElementById("ice-rink"),width:320,height:410,C:50};p.qa=30/p.D.ca;
p.Ba=function(){function d(){p.S.load(p.S.ea,"audio/background.mp3",function(){p.S.play(p.S.ea)},function(a){console.log("music fail",a)})}function b(a){document.body.appendChild(p.canvas.O);p.canvas.O.setAttribute("id","canvas");p.d.Fa(p.canvas.O,p.canvas.width,p.canvas.height);canvg(document.getElementById("ice-rink"),"img/ice_rink.svg");new p.ta(a)}q={b2Vec2:Box2D.Common.Math.b2Vec2,b2BodyDef:Box2D.Dynamics.b2BodyDef,b2Body:Box2D.Dynamics.b2Body,b2FixtureDef:Box2D.Dynamics.b2FixtureDef,b2Fixture:Box2D.Dynamics.b2Fixture,
b2World:Box2D.Dynamics.b2World,b2MassData:Box2D.Collision.Shapes.b2MassData,b2PolygonShape:Box2D.Collision.Shapes.b2PolygonShape,b2CircleShape:Box2D.Collision.Shapes.b2CircleShape,b2DebugDraw:Box2D.Dynamics.b2DebugDraw};return{init:function(){var a={content:"<h1>Puckt</h1> <small>beta</small><p>Puckt is a mobile HTML5 game designed to test your visual and mathematical skills.</p>",h:[{text:"New Game",j:function(){p.e.u();localStorage.setItem("levelsCompleted",JSON.stringify([]));b(1)}}]};JSON.parse(localStorage.getItem("levelsCompleted"))&&
0<JSON.parse(localStorage.getItem("levelsCompleted")).length&&a.h.push({text:"Continue Game",j:function(){p.e.u();var a=JSON.parse(localStorage.getItem("levelsCompleted")).pop().q+1;b(a)}});p.debug.o()||navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPod/i)?p.debug.o()||window.navigator.ib?(d(),p.e.s(a)):p.e.s({content:"<h1>Puckt</h1> <small>beta</small><p>To play, you must first add this page to your <strong>Home Screen</strong>.</p>"}):p.e.s({content:"<h1>Puckt</h1> <small>beta</small><p>This game requires an iPhone or iPod Touch running iOS 5 or above.</p>"})}}}();
window.addEventListener("load",p.Ba.init);
