var moves = 1;
var p1Score = 0;
var p2Score = 0;
var p1Wins = 0;
var p2Wins = 0;
var ties = 0;

/* Tracks player moves */
function playerMove(position) {
	console.log(position + " clicked");
	
	if (document.getElementById(position).getAttribute('data-value') != 'X' && document.getElementById(position).getAttribute('data-value') != 'O') {
	
		if (moves % 2 == 0) {
			document.getElementById(position).innerHTML = "&Omicron;";
			document.getElementById(position).className = "orange"
			document.getElementById(position).style.opacity = 1;
			document.getElementById(position).setAttribute('data-value', 'O');
		} else {
			document.getElementById(position).innerHTML = "&Chi;";
			document.getElementById(position).className = "aqua"
			document.getElementById(position).style.opacity = 1;
			document.getElementById(position).setAttribute('data-value', 'X');
		}
	
		moves++;
		winCondition();
		
		if (moves == 10) {
			alert("It's a draw!");
			resetBoard();
			ties++;
			document.getElementById("tie1").innerHTML = ties;
			document.getElementById("tie2").innerHTML = ties;
		}
	
	}
	
}

/* Checks for a winner (3 in a row) */
function winCondition() {
	
	var winner = false;
	var name = "";
	
	var win = [ 	
		// rows
		{ positionA: "r1c1", positionB: "r1c2", positionC: "r1c3" },
		{ positionA: "r2c1", positionB: "r2c2", positionC: "r2c3" },
		{ positionA: "r3c1", positionB: "r3c2", positionC: "r3c3" },
		// columns
		{ positionA: "r1c1", positionB: "r2c1", positionC: "r3c1" },
		{ positionA: "r1c2", positionB: "r2c2", positionC: "r3c2" },
		{ positionA: "r1c3", positionB: "r2c3", positionC: "r3c3" },
		// diagonals
		{ positionA: "r1c1", positionB: "r2c2", positionC: "r3c3" },
		{ positionA: "r1c3", positionB: "r2c2", positionC: "r3c1" } 
	];
	
	for (var i = 0; i < win.length; i++) {
		
		var A = document.getElementById(win[i].positionA);
		var B = document.getElementById(win[i].positionB);
		var C = document.getElementById(win[i].positionC);
		
		if (A.getAttribute('data-value') == B.getAttribute('data-value')) {
			if (B.getAttribute('data-value') == C.getAttribute('data-value')) {
				console.log("win condition triggered");
				A.className = "highlight";
				B.className = "highlight";
				C.className = "highlight";
				winner = true;
				
				if (A.getAttribute('data-value') == "X") {
					p1Score++;
					document.getElementById("score1").innerHTML = p1Score;
					name = document.getElementById("player1").innerHTML;
					
				} else {
					p2Score++;
					document.getElementById("score2").innerHTML = p2Score;
					name = document.getElementById("player2").innerHTML;
				}
			}
		}
		
	}
	
	checkSetting();
	
	if (winner) {
		alert(name + " won!");
		resetBoard();		
	}

}

/* Clears game content */
function resetBoard() {
	console.log("reset triggered");
	
	var board = ["r1c1", "r1c2", "r1c3", "r2c1", "r2c2", "r2c3", "r3c1", "r3c2", "r3c3"];
	
	for (var i = 0; i < board.length; i++) {
		document.getElementById(board[i]).innerHTML = "";
		document.getElementById(board[i]).setAttribute('data-value', i);
		document.getElementById(board[i]).className = "";
	}
	
	moves = 1;
	
}

/* Sets up scoreboard on setting change */
function selectSetting() {
	p1Score = 0;
	p2Score = 0;
	p1Wins = 0;
	p2Wins = 0;
	ties = 0;
	document.getElementById("score1").innerHTML = 0;
	document.getElementById("score2").innerHTML = 0;
	document.getElementById("tie1").innerHTML = 0;
	document.getElementById("tie2").innerHTML = 0;

	if (document.getElementById("boU").checked) {
		document.getElementById("wins1").innerHTML = "-";
		document.getElementById("wins2").innerHTML = "-";
	} else {
		document.getElementById("wins1").innerHTML = 0;
		document.getElementById("wins2").innerHTML = 0;
	};
	
}

/* Counter for win conditions */
function checkSetting() {
	
	var settings = [ 
		{ id: "bo3", win: 2 },
		{ id: "bo5", win: 3 },
		{ id: "bo7", win: 4 } 
	];
	
	for (var i = 0; i < settings.length; i++) {
		
		if (document.getElementById(settings[i].id).checked) {
			if (p1Score == settings[i].win) {
				p1Score = 0;
				p2Score = 0;
				ties = 0;
				p1Wins++;
				document.getElementById("score1").innerHTML = 0;
				document.getElementById("score2").innerHTML = 0;
				document.getElementById("wins1").innerHTML = p1Wins;
			} else if (p2Score == settings[i].win) {
				p1Score = 0;
				p2Score = 0;
				ties = 0;
				p2Wins++;
				document.getElementById("score1").innerHTML = 0;
				document.getElementById("score2").innerHTML = 0;
				document.getElementById("wins2").innerHTML = p2Wins;
			}
		}
	}

}

/* Intakes player names and sets up contents */
function setPlayers() {
	console.log("new game triggered");
	
	var p1 = prompt("Player 1: ");
	var p2 = prompt("Player 2: ");
	
	if (p1 === null || p1 === "") {
		p1 = "Player 1";
	}
	
	if (p2 === null || p2 === "") {
		p2 = "Player 2";
	}
	
	/* Ensures score and wins are reset */
	p1Score = 0;
	p2Score = 0;
	p1Wins = 0;
	p2Wins = 0;
	ties = 0;
	
	document.getElementById("playmat").style.opacity = 1;
	document.getElementById("firstGame").style.display = "none";
	document.getElementById("players").className = "";
	document.getElementById("bestOf").className =""; // Show settings
	document.getElementById("boU").checked = true; // Default setting
	
	
	/* Sets up scoreboard */
	document.getElementById("player1").innerHTML = p1; 
	document.getElementById("score1").innerHTML = 0;
	document.getElementById("tie1").innerHTML = 0;
	document.getElementById("wins1").innerHTML = "-";
	document.getElementById("player2").innerHTML = p2;
	document.getElementById("score2").innerHTML = 0;
	document.getElementById("tie2").innerHTML = 0;
	document.getElementById("wins2").innerHTML = "-";
	
}