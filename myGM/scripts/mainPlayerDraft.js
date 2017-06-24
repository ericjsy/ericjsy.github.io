var database = firebase.database();
var players = database.ref('players/');

var playerList = document.getElementById("playerList");

// Reset all draft status to false
players.once('value').then(function(snapshot) {
	var s = snapshot.numChildren();
		
	for (var i = 0; i < s; i++) {
		database.ref('players/' + i + '/drafted/').set(false)
	}
		
});

// Set up initial playerList
players.orderByChild('ranking').on('child_added', function(snapshot) {
	
	buildList(snapshot);
	document.getElementById("loadingMessage").className = "hidden";
	
});

function buildList(snapshot) {
	//console.log("buildList called");
	
	var options = document.createElement("option");
	var info = document.createTextNode(
		snapshot.val().overall + " - " +
		snapshot.val().lname + ", " + 
		snapshot.val().fname + " (" + 
		snapshot.val().position + ")"
	);
				
	options.value = snapshot.key;
	options.appendChild(info);
	playerList.appendChild(options);
	
}

function selectPlayer() {
	//console.log("selectPlayer called");
	
	var pValue = playerList.options[playerList.selectedIndex].value;
	
	updatePlayerCard(pValue);
	
}

function updatePlayerCard(pValue) {
	
	document.getElementById("cardPlaceholder").style.display = "none";
	
	database.ref('players/' + pValue + '/').once('value').then(function(snapshot) {
		
		// Top information
		document.getElementById("cardFN").innerHTML = snapshot.val().fname;
		document.getElementById("cardLN").innerHTML = snapshot.val().lname;
		document.getElementById("cardPos").innerHTML = snapshot.val().position + " &vert; ";
		document.getElementById("cardType").innerHTML = snapshot.val().type;
		document.getElementById("overallTitle").innerHTML = "Overall";
		document.getElementById("overallNumber").innerHTML = snapshot.val().overall;
		
		// Graphics
		document.getElementById("cardGraphic").style.backgroundImage = 'url(../assets/logos/' + snapshot.val().team + '.png)'
		
		database.ref('teams/' + snapshot.val().team + '/colors').once('value').then(function(snapshot) {
			document.getElementById("playerCard").style.backgroundColor = snapshot.val().primary;
			document.getElementById("playerCard").style.background = "linear-gradient(" + 
				snapshot.val().secondary + ", " + 
				snapshot.val().primary + ")";
				
			document.getElementById("cardGraphic").style.borderColor = snapshot.val().accent;
			document.getElementById("playerCard").style.color = snapshot.val().contrast;
		});
		
		// Bottom information		
		database.ref('teams/' + snapshot.val().team).once('value').then(function(snapshot) {
			document.getElementById("cardTeam").innerHTML = "Team: " + 
				snapshot.val().city + " " + 
				snapshot.val().name;
		});
		
		document.getElementById("cardNation").innerHTML = "Nation: " + snapshot.val().nationality;
		
		if (snapshot.val().position != 'G') {
			document.getElementById("cat1").innerHTML = "OFF";
			document.getElementById("cardOffense").innerHTML = snapshot.val().offense;
			document.getElementById("cat2").innerHTML = "DEF";
			document.getElementById("cardDefense").innerHTML = snapshot.val().defense;
			document.getElementById("cat3").innerHTML = "PHY";
			document.getElementById("cardPhysical").innerHTML = snapshot.val().physical;
		}
		
	});
	
}