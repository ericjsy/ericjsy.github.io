var minutes = 2;
var seconds = 0;

var interval = setInterval(timer, 1000);

function timer() {
	console.log("timer called")
	
	if (seconds == 0) {
		seconds = 59;
		minutes--;
		
		document.getElementById('timer').style.color = "#D9D9D9";
		document.getElementById('sec').innerHTML = seconds;
		document.getElementById('min').innerHTML = minutes;
	} else {
		seconds--;
		document.getElementById('sec').innerHTML = (seconds < 10) ? "0" + seconds : seconds;
	}
	
	if (minutes == 0 && seconds == 30) {
		document.getElementById('timer').style.color = "orange";
	}
	
	if (minutes == 0 && seconds == 10) {
		document.getElementById('timer').style.color = "red";
	}
	
	if (minutes == 0 && seconds == 0) {
		// autodraft
		minutes = 2;
	}

}

function resetTimer() {
	console.log("resetTimer called");
	
	minutes = 2;
	seconds = 0;
	
	document.getElementById('timer').style.color = "#D9D9D9";
	document.getElementById('sec').innerHTML = "0" + seconds;
	document.getElementById('min').innerHTML = minutes;
	
}

function clearTimer() {
	console.log("clearTimer called");

	clearInterval(interval);
	
}