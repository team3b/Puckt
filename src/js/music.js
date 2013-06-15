"use strict";

var puckt = puckt || {};
puckt.music = (function () {
	var sounds = {}, counter = 0, music, loader, volume = 1, playing = false,

	load = function (readyCallback) {
		// loader = new createjs.LoadQueue();
		// loader.onComplete = loadHandler;
		// loader.installPlugin(createjs.Sound);
		// loader.loadFile({id: 'bg', src:'audio/background.mp3'});

		// function loadHandler (event) {
		// 	console.log('loadHandler', event, music);
		// 	music = createjs.Sound.createInstance('bg');
		// 	console.log('loadHandler', event, music);
		// 	music.setVolume(volume);
		// 	music.play();
		// }

	},

	play = function () {
		// if (music != null) {
		// 	music.play();
		// }
	},

	stop = function () {
		// if (music != null) {
		// 	music.stop();
		// }
	},

	setVolume = function (vol) {
		// volume = vol;
		// if (music != null) {
		// 	music.setVolume(volume);
		// }
	};

	return {
		load: load,
		play: play,
		stop: stop,
		setVolume: setVolume
	};
})();