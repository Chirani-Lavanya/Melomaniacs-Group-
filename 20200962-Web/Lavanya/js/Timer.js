
var timeLeft = 60;
var elem = document.getElementById("timer");
var timerId = setInterval(countdown, 1000);
var tracker = 0;
function countdown() {
		min=parseInt(timeLeft/60);
		sec=parseInt(timeLeft%60);
    
    if (timeLeft == -1) {
        stopTimer();
		handleEndGame();
    } else {
        elem.innerHTML =(min <10 ? "0" : "")+min+" : "+(sec <10 ? "0" : "")+sec;
        timeLeft--;
        tracker++;
    }
}


//stop timer
function stopTimer() {
	clearTimeout(timerId);
	var elapsedMin=parseInt(tracker/60);
	var elapsedSec=parseInt(tracker%60);
	document.getElementById('mint').innerHTML= elapsedMin ;
	document.getElementById('secs').innerHTML= elapsedSec-1;
}