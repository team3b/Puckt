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
                levelsComplete,
                levelObject = {
                    number: currentLevel.number,
                    stars: stars,
                    collisions: collisions
                },
                popupProps = {
                    content: "<p>Congratulations, you completed level " + currentLevel.number + " with " + stars + " star" + (stars != 1 ? "s" : "") + "!</p>",
                    buttons: [
                        {
                            text: "Proceed",
                            callback: function () {
                                puckt.ui.closePopup();
                                if (!currentGame.data.last) {
                                    currentGame = new puckt.Level(world, ++currentLevel.number);
                                    currentGame.boot(function () {
                                        currentGame.begin();
                                    }, function () {
                                        puckt.ui.openPopup({
                                            content: "<p>We failed to open your level, please refresh or reload the game.</p>",
                                            buttons: [
                                                {
                                                    text: "Reload",
                                                    callback: function () {
                                                        location.reload();
                                                    }
                                                }
                                            ]
                                        })
                                    });
                                    puckt.ui.drawNavigation(currentGame);
                                } else {
                                    puckt.ui.openPopup({
                                        content: "<h1>You're good!</h1><p>Nice job completing all the levels. You have officially been Puckt. Return soon for new levels and features.</p>",
                                        buttons: [
                                            {
                                                text: "Quit",
                                                callback: function () {
                                                    location.reload();
                                                }
                                            }
                                        ]
                                    })
                                }
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
                    location.reload();
                }
            });
            puckt.ui.openPopup(popupProps);
            // TO DO - ensure values are only stored if the score is better
            // Add completed level to local storage, together with attributes
            var levelsComplete = JSON.parse(localStorage.getItem("levelsCompleted"));
            levelsComplete.push(levelObject);
            localStorage.setItem("levelsCompleted", JSON.stringify(levelsComplete));
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
                            location.reload();
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
        // Make the background visible
        document.getElementById('ice-rink').classList.remove('hidden');
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

        // Initialise canvas debugger
        puckt.debug.initCanvas(world);

        // Draw Level
        currentGame = new puckt.Level(world, currentLevel);
        currentGame.boot(function () {
            currentGame.begin();
        }, function () {
            puckt.ui.openPopup({
                content: "<p>We failed to open your level, please refresh or reload the game.</p>"
            });
        });

        // Draw navigation bar
        puckt.ui.drawNavigation(currentGame);
    }

    function tickrolled (e) {
        if (!e.paused) {
            // Update stage
            stage.update();
            
            if (puckt.debug_switch.box2d) {
                world.DrawDebugData.bind(world);
            }
            
            world.Step(1/fps, 10, 10);
            world.ClearForces();
        }
    }
    
    return Game;
})();