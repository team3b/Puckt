"use strict";

var puckt = puckt || {};
puckt.Game = (function () {
    var world, currentLevel, currentGame, fps = 60;

    function Game (startingLevel) {
        // Create stage and enable touch
        stage = new createjs.Stage(puckt.canvas.elem);
        createjs.Touch.enable(stage);
        currentLevel = startingLevel;

        puckt.Level.successCallback = function (stars, collisions) {
            var currentLevel = this,
            popupProps = {
                content: "<p>Congratulations, you completed level " + currentLevel.number + " with " + stars + " star" + (stars != 1 ? "s" : "") + "!</p>",
                buttons: [
                    {
                        text: "Proceed",
                        callback: function () {
                            var levelText = document.getElementById("level_text");
                            puckt.ui.closePopup();
                            currentGame = new puckt.Level(world, ++currentLevel.number);
                            currentGame.boot(function () {
                                currentGame.begin();
                            }, function () {
                                // To do: display failure dialog
                                console.log("Ah, man!");
                            });
                            levelText.innerHTML = "Level " + currentLevel.number;
                        }
                    }
                ]
            };

            if (stars != currentLevel.data.stars.length) {
                popupProps.buttons.push({
                    text: "Retry",
                    callback: function () {
                        puckt.ui.closePopup();
                        currentGame.begin();
                    }
                });
            }

            popupProps.buttons.push(
            {
                text: "Quit",
                callback: function () {
                    puckt.ui.closePopup();
                    // Return to Navigation
                }
            });

            puckt.ui.openPopup(popupProps);
        }

        puckt.Level.failCallback = function (stars, collisions) {
            var currentLevel = this,
            reason = stars === null ? "turn on all the lights" : "get any stars";

            puckt.ui.openPopup({
                content: "<p>Unlucky, you didn't " + reason + ". Please try again.</p>",
                buttons: [
                    {
                        text: "Retry",
                        callback: function () {
                            puckt.ui.closePopup();
                            currentGame.begin();
                        }
                    },
                    {
                        text: "Quit",
                        callback: function () {
                            puckt.ui.closePopup();
                            // Return to Navigation
                        }
                    }
                ]
            })
        }

        // Set the scene
        createWorld();

        // Declare settings for scene ticker
        createjs.Ticker.addEventListener('tick', tickrolled);
        createjs.Ticker.setFPS(fps);
        createjs.Ticker.useRAF = true;
    }

    function createWorld () {
        // Create world with no gravity
        world = new box2d.b2World(new box2d.b2Vec2(0, 0), true);

        // Contact Listener
        var contactListener = new Box2D.Dynamics.b2ContactListener;
        contactListener.BeginContact = function(contact) {
           var shape = contact.GetFixtureA().GetBody().GetUserData();

           if (shape.type = "wall") {
               shape.collision(contact);
           }
        };
        world.SetContactListener(contactListener);

        // Initialise debugger
        puckt.debug.init(world);

        // Draw Level
        currentGame = new puckt.Level(world, currentLevel);
        currentGame.boot(function () {
            currentGame.begin();
        }, function () {
            console.log("Ah, man!");
        });

        // Draw navigation bar
        puckt.ui.drawNavigation(currentGame);
    }

    function tickrolled (e) {
        if (!e.paused) {
            // Update stage
            stage.update();
            
            puckt.debug.run(world.DrawDebugData.bind(world));
            
            world.Step(1/fps, 10, 10);
            world.ClearForces();
        }
    }
    
    return Game;
})();