"use strict";

var puckt = puckt || {};
puckt.music = (function () {
	var music = {},

	load = function (id, src, readyCallback, failCallback) {
		music[id] = document.createElement('audio');
		music[id].setAttribute('src', src);
		music[id].addEventListener('canplay', readyCallback, false);
		music[id].addEventListener('error', failCallback, false);
		music[id].load();

		// Set the volume to 0 when debuggind, so we don't go insane
		puckt.debug.run(function () {
			music[id].volume = 0;
		});

		return music[id];
	},

	play = function (id, pos) {
		if (music[id]) {
			pos = pos || 0;

			if (music[id].readyState == 4) {
				music[id].currentTime = pos;
				music[id].play();
			} else {
				music[id].addEventListener('canplay', function () {
					playWhenReady(id, pos);
				});
			}
		}
		return music[id];
	},

	pause = function (id) {
		if (music[id]) {
			music[id].pause();
		}
	},

	setVolume = function (id, vol) {
		music[id].volume = vol;
	};

	function playWhenReady(id, pos) {
		plau(id, pos);
		music[id].removeEventListener('canplay', playWhenReady);
	}

	return {
		load: load,
		play: play,
		stop: stop,
		setVolume: setVolume,
		BACKGROUND_MUSIC: 'bgMusic'
	};
})();