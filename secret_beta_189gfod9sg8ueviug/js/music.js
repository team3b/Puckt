"use strict";

var puckt = puckt || {};
puckt.music = (function () {
	var sounds = {}, counter = 0, music,

	load = function (readyCallback) {
		createjs.Sound.addEventListener("fileload", loadHandler);
		createjs.Sound.registerSound("audio/background.mp3", "backgroundMusic", 1);

		function loadHandler (event) {
			music = createjs.Sound.createInstance(event.id);
			readyCallback();
		}

	},

	play = function () {
		music.play();
	},

	setVolume = function (vol) {
		music.setVolume(vol);
	};

	return {
		load: load,
		play: play,
		setVolume: setVolume
	};
})();