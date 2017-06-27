var database = firebase.database();
var players = database.ref('players/');

var playerList = document.getElementById("playerList");

var selectOrder = true; // Firebase does not support DESC sort; false = DESC

var combos = [
	{ filter: 'centerFilter', 	position: 'C' },
	{ filter: 'leftwingFilter', position: 'LW' },
	{ filter: 'rightwingFilter', position: 'RW' },
	{ filter: 'defenseFilter', position: 'D' },
	{ filter: 'goalieFilter', position: 'G' }
];

var teams = [
	"ANA","ARI","BOS","BUF","CAR","CGY","CHI","CLB","COL","DAL",
	"DET","EDM","FLA","LOS","MIN","MTL","NJ","NSH","NYI","NYR",
	"OTT","PHI","PIT","SJ","TBL","TOR","VAN","WIN","WSH"
];

var userTeam = [];
var centers = 0;
var leftwings = 0;
var rightwings = 0;
var defensemen = 0;
var goalies = 0;

var counter = 0;

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
		document.getElementById("loadingMessage").className = "none";
		
	});

}

function buildList(snapshot) {
	//console.log("buildList called");
	
	// Firebase does not support DESC sort; temporary solution
	if (selectOrder) {
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
	
	} else {
		var options = document.createElement("option");		
		var info = document.createTextNode(
			snapshot.val().overall + " - " +
			snapshot.val().lname + ", " + 
			snapshot.val().fname + " (" + 
			snapshot.val().position + ")"
		);
					
		options.value = snapshot.key;	
		options.appendChild(info);		
		playerList.insertBefore(options, playerList.childNodes[0]);
		
	}
	
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
	updateProgress(pValue);
	
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

function updateProgress(pValue) {
	
	database.ref('players/' + pValue).once('value').then(function(snapshot) {
	
		var position = snapshot.val().position;
			
		if (centers + 1 == 5) {
			document.getElementById("centerProgress").style.backgroundColor = "green";
		}
		
		if (leftwings + 1 == 5) {
			document.getElementById("leftWingProgress").style.backgroundColor = "green";
		}
		
		if (rightwings + 1 == 5) {
			document.getElementById("rightWingProgress").style.backgroundColor = "green";
		}
		
		if (defensemen + 1 == 7) {
			document.getElementById("defenseProgress").style.backgroundColor = "green";
		}

		if (goalies + 1 == 3) {
			document.getElementById("goalieProgress").style.backgroundColor = "green";
		}
		
		if (position == 'C') {
		
			if (centers == 4) {
				document.getElementById("centerProgress").style.backgroundColor = "red";
				
				['leftWingCheck','rightWingCheck','defenseCheck','goalieCheck'].forEach(function(id) {
					document.getElementById(id).style.width = 0;
				});
				
			} else {
				document.getElementById("centerCheck").style.width = ((centers + 1) * 25) + "%";
				
				['leftWingCheck','rightWingCheck','defenseCheck','goalieCheck'].forEach(function(id) {
					document.getElementById(id).style.width = 0;
				});
				
			}
			
		} else if (position == 'LW') {

			if (leftwings == 4) {
				document.getElementById("leftWingProgress").style.backgroundColor = "red";
				
				['centerCheck','rightWingCheck','defenseCheck','goalieCheck'].forEach(function(id) {
					document.getElementById(id).style.width = 0;
				});
				
			} else {
				document.getElementById("leftWingCheck").style.width = ((leftwings + 1) * 25) + "%";
				
				['centerCheck','rightWingCheck','defenseCheck','goalieCheck'].forEach(function(id) {
					document.getElementById(id).style.width = 0;
				});
			}
			
		} else if (position == 'RW') {
			
			if (rightwings == 4) {
				document.getElementById("rightWingProgress").style.backgroundColor = "red";
				
				['centerCheck','leftWingCheck','defenseCheck','goalieCheck'].forEach(function(id) {
					document.getElementById(id).style.width = 0;
				});
				
			} else {
				document.getElementById("rightWingCheck").style.width = ((rightwings + 1) * 25) + "%";
	
				['centerCheck','leftWingCheck','defenseCheck','goalieCheck'].forEach(function(id) {
					document.getElementById(id).style.width = 0;
				});
				
			}
			
		} else if (position == 'LD' || position == 'RD') {

			if (defensemen == 6) {
				document.getElementById("defenseProgress").style.backgroundColor = "red";
				
				['centerCheck','leftWingCheck','rightWingCheck','goalieCheck'].forEach(function(id) {
					document.getElementById(id).style.width = 0;
				});
				
			} else {
				document.getElementById("defenseCheck").style.width = ((defensemen + 1) * (100/6)) + "%";
				
				['centerCheck','leftWingCheck','rightWingCheck','goalieCheck'].forEach(function(id) {
					document.getElementById(id).style.width = 0;
				});
				
			}
			
		} else if (position == 'G') {

			if (goalies == 3) {
				document.getElementById("goalieProgress").style.backgroundColor = "red";
				
				['centerCheck','leftWingCheck','rightWingCheck','defenseCheck'].forEach(function(id) {
					document.getElementById(id).style.width = 0;
				});
				
			} else {
				document.getElementById("goalieCheck").style.width = ((goalies + 1) * 50) + "%";
				
				['centerCheck','leftWingCheck','rightWingCheck','defenseCheck'].forEach(function(id) {
					document.getElementById(id).style.width = 0;
				});
				
			}
			
		}
	
	});
	
}

function addPlayer() {
	//console.log("addPlayer called");
	
	var pText = playerList.options[playerList.selectedIndex].text;
	var pValue = playerList.options[playerList.selectedIndex].value;
	
	userTeam.push(pText);
	teamSummary.innerHTML += userTeam[userTeam.length - 1] + "<br>";

	for (var i = 0; i < playerList.length; i++) {
		if (playerList.options[i].value == pValue) {
			playerList.remove(i);
		}
	}
	
	database.ref('players/' + pValue).once('value').then(function(snapshot) {
		
		var position = snapshot.val().position;

		if (position == 'C') {
			centers++;
			document.getElementById("countC").innerHTML = "Centers: " + centers + "/4";
			
			if (centers == 5) {
				document.getElementById("centerProgress").style.backgroundColor = "red";
			} else {
				document.getElementById("centerProgress").style.width = (centers * 25) + "%";
			}
			
		} else if (position == 'LW') {
			leftwings++;
			document.getElementById('countLW').innerHTML = "Left Wings: " + leftwings + "/4";
			
			if (leftwings == 5) {
				document.getElementById("leftWingProgress").style.backgroundColor = "red";
			} else {
				document.getElementById("leftWingProgress").style.width = (leftwings * 25) + "%";
			}
			
		} else if (position == 'RW') {
			rightwings++;
			document.getElementById('countRW').innerHTML = "Right Wings: " + rightwings + "/4";
			
			if (rightwings == 5) {
				document.getElementById("rightWingProgress").style.backgroundColor = "red";
			} else {
				document.getElementById("rightWingProgress").style.width = (rightwings * 25) + "%";
			}
			
		} else if (position == 'LD' || position == 'RD') {
			defensemen++;
			document.getElementById('countD').innerHTML = "Defensemen: " + defensemen + "/6";
			
			if (defensemen == 7) {
				document.getElementById("defenseProgress").style.backgroundColor = "red";
			} else {
				document.getElementById("defenseProgress").style.width = (defensemen * (100/6)) + "%";
			}
			
		} else if (position == 'G') {
			goalies++;
			document.getElementById('countG').innerHTML = "Goalies: " + goalies + "/2";
			
			if (goalies == 3) {
				document.getElementById("goalieProgress").style.backgroundColor = "red";
			} else {
				document.getElementById("goalieProgress").style.width = (goalies * 50) + "%";
			}
			
		}
		
	});
	
	database.ref('players/' + pValue + '/drafted/').set(true);
	counter++;
	//compDraft();
	
}

function populateList(snapshot) {
	//console.log("populateList called");
	
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
	
	selectOrder = true;
	
	players.orderByChild(property).on('child_added', function(snapshot) {
		populateList(snapshot);
	});

	searchList(property);
	
}

// Firebase does not support DESC sort; temporary solution
function orderListReverse(property) {
	//console.log("orderListReverse called");	
	
	clearList();
	
	selectOrder = false;
	
	players.orderByChild(property).on('child_added', function(snapshot) {
		populateList(snapshot);
	});

	searchList(property);
	
}

function filterList() {
	//console.log("filterList called");
	
	document.getElementById('teamList').className = "none";
	
	clearList();
	orderList('overall');
	
	if (document.getElementById("goalieFilter").checked) {
		
		['orderOffense','orderDefense','orderPhysical'].forEach(function( id ) {
			document.getElementById(id).className = "none";
		});
		
		['orderVision','orderQuickness','orderRebound'].forEach(function( id ) {
			document.getElementById(id).className = "";
		});

	} else if (document.getElementById("allFilter").checked) {
		
		['orderOffense','orderDefense','orderPhysical', 'orderOffense','orderDefense','orderPhysical'].forEach(function( id ) {
			document.getElementById(id).className = "none";
		});
		
	} else {
		
		['orderOffense','orderDefense','orderPhysical'].forEach(function( id ) {
			document.getElementById(id).className = "";
		});
		
		['orderVision','orderQuickness','orderRebound'].forEach(function( id ) {
			document.getElementById(id).className = "none";
		});
		
	}
	
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

function initiateDropDown() {
	//console.log("initiateDropDown called");
	
	clearList();
	
	['orderOffense','orderDefense','orderPhysical', 'orderVision','orderQuickness','orderRebound'].forEach(function( id ) {
		document.getElementById(id).className = "none";
	});
	
	var check = true;
	
	while (check) {
		
		if (teamList.length > 1) {
			teamList.remove(1);
		} else {
			check = false;
		}
				
	}
	
	players.on('child_added', function(snapshot) {
		populateList(snapshot);
	});
	
	database.ref('teams/').orderByChild('city').on('child_added', function(snapshot) {
				
		var options = document.createElement("option");
		var info = document.createTextNode(
			snapshot.val().city + " " + snapshot.val().name
		);
				
		options.value = snapshot.key;
		options.setAttribute("id", snapshot.key);
		options.appendChild(info);	
		teamList.appendChild(options);
	
	});
	
	document.getElementById('teamList').options[0].selected = true;
	document.getElementById('teamList').className = "";

	searchList('ranking');
	
}

function dropdownList() {
	//console.log("dropdownList called");
	
	clearList();
	
	players.on('child_added', function(snapshot) {
		populateList(snapshot);
	});
	
	searchList('ranking');
	
}
