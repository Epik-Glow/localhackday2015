
httpGetAsync("http://45.55.144.205:8080/room", blah);


function httpGetAsync(url, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
	if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
	    callback(xmlHttp.responseText);
    }
    xmlHttp.open("POST", url, true); // true for asynchronous
    xmlHttp.send(null);
    console.log("hello");
}

function blah(e){
    console.log(e);

    // 2. This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // 3. This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.






    var player;
    function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', {
	    height: '390',
	    width: '640',
	    videoId: 'M7lc1UVf-VE',
	    events: {
		'onReady': onPlayerReady,
		'onStateChange': onPlayerStateChange
	    }
	});

	// 4. The API will call this function when the video player is ready.
	function onPlayerReady(event) {
	    event.target.playVideo();
	}

	// 5. The API calls this function when the player's state changes.
	//    The function indicates that when playing a video (state=1),
	//    the player should play for six seconds and then stop.
	var done = false;
	function onPlayerStateChange(event) {
	    console.log(event.data)
	    if (event.data == YT.PlayerState.PLAYING && !done) {
		setTimeout(stopVideo, 6000);
		done = true;
	    }
	}


	function asdf() {
	    if (player.getPlayerState() === 1) {
		console.log("hello");
		player.pauseVideo();
	    } else {
		player.playVideo();
	    }
	}


    }
}
