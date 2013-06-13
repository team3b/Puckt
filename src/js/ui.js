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
        message.style.height = puckt.canvas.height + "px";
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
    
    return {
        openPopup: openPopup,
        closePopup: closePopup
    }
})();