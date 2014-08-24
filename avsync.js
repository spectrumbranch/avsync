var AVSync = function(videoID, audioID) {
	//get references
	var mrvideo = Popcorn('#'+videoID);
	var mraudio = Popcorn('#'+audioID);
	
	var _mrvideo = document.getElementById(videoID);

	
	/*****
		EVENTS
	*****/
	//http://popcornjs.org/popcorn-docs/media-methods/#on
	//http://popcornjs.org/popcorn-docs/events/
	mrvideo.on('play', function() {
		mraudio.play();
	});
	
	mrvideo.on('pause', function() {
		mraudio.pause();
	});
	
	mrvideo.ended('pause', function() {
		mraudio.pause();
	});

	mrvideo.on('seeked', function(e) {
		mraudio.currentTime(mrvideo.currentTime());
	});

	//volumechange and muted events only fire from the video element if the video has audio.
	//we solve this by exporting video with complete silence but still a valid audio track.
	mrvideo.on('volumechange', function(e) {
		if (mrvideo.media.muted) {
			mraudio.mute();
		} else {
			 mraudio.unmute();
		}
		mraudio.volume(mrvideo.volume());
	});
	
	mrvideo.on('muted', function(e) {
		mraudio.unmute(mrvideo.unmute());
	});
	
	//stop right clicking, etc
	_mrvideo.addEventListener('contextmenu', function(e) {
		e.preventDefault();
		return false;
	});
}