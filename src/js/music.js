"use strict";

var puckt = puckt || {};
puckt.music = (function () {
	var sounds = {}, counter = 0, music, loader,

	load = function (readyCallback) {
		loader = new createjs.LoadQueue();
		loader.onComplete = loadHandler;
		loader.installPlugin(createjs.Sound);
		loader.loadFile({id: 'bg', src:'audio/background.mp3'});
		// createjs.Sound.addEventListener("fileload", loadHandler);
		// createjs.Sound.registerSound("audio/background.mp3", "backgroundMusic", 1);

		function loadHandler (event) {
			console.log('loadHandler', event, music);
			music = createjs.Sound.createInstance('bg');
			console.log('loadHandler', event, music);
			music.play();
		}

	},

	play = function () {
		// music.play();
	},

	setVolume = function (vol) {
		// music.setVolume(vol);
	};

	return {
		load: load,
		play: play,
		setVolume: setVolume
	};
})();