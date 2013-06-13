"use strict";

var puckt = puckt || {};
puckt.music = (function () {
	var sounds = {}, counter = 0,

	load = function (readyCallback) {
		createjs.Sound.addEventListener("fileload", loadHandler);
		// createjs.Sound.addEventListener("complete", readyCallback);
		createjs.Sound.registerSound("audio/background.mp3", "backgroundMusic", 1);
		createjs.Sound.registerSound("audio/title.mp3", "titleMusic", 1);

		function loadHandler (event) {
			console.log('loadHandler', event);
			sounds[event.id] = createjs.Sound.createInstance(event.id);
			counter ++;

			// To do: find a better way of doing this
			if (counter == 2) readyCallback();
		}

	};

	return {
		load: load,
		sounds: sounds
	};
})();