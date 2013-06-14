"use strict";

var puckt = puckt || {};
puckt.ui = (function () {
    function openPopup(props) {
        var message = document.createElement("aside"),
            section = document.createElement("section"),
            button;
        // Set class name
        message.className = "message";
        // Add content to message box
        section.innerHTML = props.content;
        // Ensure dimensions are the same dimensions as the canvas
        message.style.width = puckt.canvas.width + "px";
        message.style.height = puckt.canvas.height + puckt.canvas.navHeight + "px";
        // Make transparent (for fading)
        message.style.opacity = "0";
        // Add buttons to message
        if (props.buttons) {
            for (var i=0; i<props.buttons.length; i++) {
                button = document.createElement("a");
                button.href = "";
                button.className = "button";
                button.innerHTML = props.buttons[i].text;
                buttonEvent(button, props.buttons[i]);
                section.appendChild(button);
            }
        }
        // Append section to message
        message.appendChild(section);
        // Append message to body
        document.body.appendChild(message);
        // Set opacity to opaque
        setTimeout(function () {
            message.style.opacity = "1";
        }, 1);
    };

    function buttonEvent (button, props) {
        // Listens for button click
        button.addEventListener("click", function (e) {
            e.preventDefault();
            // Calls callback
            props.callback();
        })
    };

    function closePopup () {
        var message = document.querySelectorAll(".message");
        // Sets opacity to 0
        message[0].style.opacity = "0";
        // Remove element from DOM after transition is over (0.25 seconds)
        setTimeout(function () {
            if (message[0])
                message[0].parentNode.removeChild(message[0]);
        }, 250);
    };

    function tutorial () {
        console.log('here');
        openPopup({
            content: "<h1>Tutorial</h1><p>Welcome to Puckt.<p>",
            buttons: [{
                text: "Next",
                callback: function () {
                    closePopup();
                    openPopup({
                        content: "Use the Puck at the bottom to toggle all the walls. You can move the puck anywhere below the blue line, and must release it in that area. The less collisions, the more stars. Happy days.</p>",
                        buttons: [
                            {
                                text: "Close",
                                callback: function() {
                                    puckt.ui.closePopup();
                                }
                            }
                        ]
                    })
                }
            }]
        });
        localStorage.setItem("seenTutorial", true);
    }

    function drawNavigation (currentGame) {
        var oldNavigation = document.querySelector("nav"),
            navigation = document.createElement("nav"),
            backButton = document.createElement("a"),
            resetButton = document.createElement("a"),
            levelText = document.createElement("span");

        if (oldNavigation) {
            oldNavigation.parentNode.removeChild(oldNavigation);
        }

        // Set up navigation properties
        navigation.style.width = puckt.canvas.width + "px";
        navigation.style.height = puckt.canvas.navHeight + "px";
        // Set up level text
        levelText.id = "level_text";
        levelText.innerHTML = "Level " + currentGame.number;
        // Set up back button properties
        backButton.className = "left";
        backButton.href = "";
        backButton.innerHTML = "<i class=\"icon-large icon-arrow-left\"></i>";
        backButton.style.height = puckt.canvas.navHeight + "px";
        backButton.style.width = puckt.canvas.navHeight + "px";
        backButton.addEventListener("click", function () {
            console.log("back");
        });
        // Set up reset button properties
        resetButton.className = "right";
        resetButton.href = "";
        resetButton.innerHTML = "<i class=\"icon-large icon-refresh\"></i>";
        resetButton.style.height = puckt.canvas.navHeight + "px";
        resetButton.style.width = puckt.canvas.navHeight + "px";
        resetButton.addEventListener("click", function (e) {
            e.preventDefault();
            currentGame.begin();
        }, false);
        // Add buttons to navigation
        navigation.appendChild(backButton);
        navigation.appendChild(resetButton);
        navigation.appendChild(levelText);
        // Add navigation to document
        document.body.appendChild(navigation);
    };
    
    return {
        openPopup: openPopup,
        closePopup: closePopup,
        tutorial: tutorial,
        drawNavigation: drawNavigation
    }
})();