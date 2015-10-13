
httpGetAsync("http://45.55.144.205:8080/room", getRoom);

function httpGetAsync(url, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
	if (xmlHttp.readyState == 4 && xmlHttp.status == 201)
	    callback(xmlHttp.responseText);
    }
    xmlHttp.open("POST", url, true); // true for asynchronous
    xmlHttp.send(null);

}



var player;

function onYouTubeIframeAPIReady() {
    console.log("hello");
    player = new YT.Player('player', {
	height: '390',
	width: '640',
	videoId: 'M7lc1UVf-VE',
	events: {
	    'onReady': onPlayerReady,
	    'onStateChange': onPlayerStateChange
	}
    });
}


function onPlayerReady(event) {
    event.target.playVideo();
}


var done = false;
function onPlayerStateChange(event) {
    console.log(event.data)
    if (event.data == YT.PlayerState.PLAYING && !done) {
	setTimeout(stopVideo, 6000);
	done = true;
    }
}

function getRoom(e) {
    roomCode = e;

    var socket = io("ws://45.55.144.205:8080");
    
    socket.on('connection', function() {
	socket.emit('roomCodeHost', e);
    });



    socket.on('roomHost', function(e) {
	if (!e.exists) {
	    $("#header").html("Something went wrong");
	} else {
	    socket.emit('vidReq', "por favor");
	}
    });
    
    socket.on('vidResponse', function(e) {
	
	
	
	
    });



	    

    


    console.log(e);
    $("#header").html("You are connected to room " + e + ".");

    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


}

