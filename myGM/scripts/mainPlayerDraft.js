var database = firebase.database();
var players = database.ref('players/');

var playerList = document.getElementById("playerList");

window.addEventListener("load", initializePlayerList, false);

function initializePlayerList() {
	
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

}

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

function clearList() {
	//console.log("clearList called");

	var check = true;
	
	while (check) {
		
		if (playerList.length > 0) {
			playerList.remove(0);
		} else {
			check = false;
		}
				
	}
	
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
		} else {
			document.getElementById("cat1").innerHTML = "VIS";
			document.getElementById("cardOffense").innerHTML = snapshot.val().vision;
			document.getElementById("cat2").innerHTML = "QCK";
			document.getElementById("cardDefense").innerHTML = snapshot.val().quickness;
			document.getElementById("cat3").innerHTML = "RBC";
			document.getElementById("cardPhysical").innerHTML = snapshot.val().rebound;
		}
		
	});
	
}

function populateList(snapshot) {
	//console.log("populateList called");
	
	var combos = [
		{ filter: 'centerFilter', 	position: 'C' },
		{ filter: 'leftwingFilter', position: 'LW' },
		{ filter: 'rightwingFilter', position: 'RW' },
		{ filter: 'defenseFilter', position: 'D' },
		{ filter: 'goalieFilter', position: 'G' }
	];
	
	if (!snapshot.val().drafted) {
		
		// All players
		if (document.getElementById('allFilter').checked) {
			buildList(snapshot);
		}
		
		// All forwards
		if (document.getElementById('forwardFilter').checked) {
			for(var i = 0; i < 3; i++) {
				if (snapshot.val().position == combos[i].position) {
					buildList(snapshot);
				}
			} 
		}
		
		// Single positions
		for(var i = 0; i < combos.length; i++) {
			if (document.getElementById(combos[i].filter).checked) {
				if (snapshot.val().position == combos[i].position) {
					buildList(snapshot);
				}
			} 
		}
		
		var teams = [
			"ANA","ARI","BOS","BUF","CAR","CBJ","CGY","CHI","COL","DAL",
			"DET","EDM","FLA","LOS","MIN","MTL","NJD","NSH","NYI","NYR",
			"OTT","PHI","PIT","SJS","TBL","TOR","VAN","WIN","WSH"
		];
		
		if (document.getElementById('teamFilter').checked) {
			
			if (document.getElementById('LGE').selected) {
				buildList(snapshot);
			} else {
				for (var i = 0; i < teams.length; i++) {
					if (document.getElementById(teams[i]).selected) {
						if (snapshot.val().team == teams[i]) {
							buildList(snapshot);
						}
					}
				}
			}
		}
		
	}
	
}

function orderList(property) {
	//console.log("orderList called");	
	
	clearList();
	
	players.orderByChild(property).on('child_added', function(snapshot) {
		populateList(snapshot);
	});

	searchList(property);
	
}

function filterList() {
	//console.log("filterList called");
	
	document.getElementById('teamList').className = "hidden";
	
	clearList();
	
	players.on('child_added', function(snapshot) {
		populateList(snapshot);
	});
	
	searchList('ranking');
	
}

function searchList(property) {
	//console.log("searchList called");
	
	var search = document.getElementById('searchFilter').value;
	var expr = new RegExp(search, "i");
	
	clearList();
	
	players.orderByChild(property).on('child_added', function(snapshot) {
		
		var first = snapshot.val().fname;
		var last = snapshot.val().lname;
		
		if (search == "" || search == null) {
			populateList(snapshot);
		} else if (expr.test(first) || expr.test(last)) {
			populateList(snapshot);
		}
		
	});
	
}