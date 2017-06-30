var database = firebase.database();

var playerList = document.getElementById("playerList");

var selectOrder = true; // Firebase does not support DESC sort; false = DESC

var combos = [
	{ filter: 'centerFilter', 	position: 'C' },
	{ filter: 'leftwingFilter', position: 'LW' },
	{ filter: 'rightwingFilter', position: 'RW' },
	{ filter: 'defenseFilter', position: 'D' },
	{ filter: 'goalieFilter', position: 'G' }
];

var teams = [];
var leagueTeams = [];

var centers = 0;
var leftwings = 0;
var rightwings = 0;
var defensemen = 0;
var goalies = 0;

var totalOffense = 0;
var totalDefense = 0;
var totalPhysical = 0;
var tempOffense = 0;
var tempDefense = 0;
var tempPhysical = 0;

var counter = 0;
var draftOverall = 1;
var round = 1;

window.addEventListener("load", initApp, false);

function initApp() {
	
	// Reset all draft status to false
	database.ref('players/').once('value').then(function(snapshot) {
		var s = snapshot.numChildren();
			
		for (var i = 0; i < s; i++) {
			database.ref('players/' + i + '/drafted/').set(false)
		}
			
	});
	
	// Set up initial playerList
	database.ref('players/').orderByChild('ranking').on('child_added', function(snapshot) {
		
		buildList(snapshot);
		document.getElementById("loadingMessage").className = "none";
		
	});
	
	// Set up computer teams
	database.ref('teams/').orderByChild('city').on('child_added', function(snapshot) {
		
		if (snapshot.val().active) {
			leagueTeams.push(null);
			leagueTeams[leagueTeams.length - 1] = [snapshot.key];
		}
	
	});

	console.log(leagueTeams);
	
	initCircle();
	
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
	
	// Firebase does not support DESC sort; temporary solution
	if (selectOrder) {
		playerList.appendChild(options);
	} else {
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
	
	database.ref('players/' + pValue).once('value').then(function(snapshot) {

		if (snapshot.val().position != 'G') {
			var off = snapshot.val().offense;
			var def = snapshot.val().defense;
			var phy = snapshot.val().physical;
		} else {	
			var off = 0;
			var def = 0;
			var phy = 0;		
		}
	
		var originalOffense = totalOffense / (leagueTeams[0].length - 1);
		var originalDefense = totalDefense / (leagueTeams[0].length - 1);
		var originalPhysical = totalPhysical / (leagueTeams[0].length - 1);

		tempOffense = totalOffense + off;
		tempDefense = totalDefense + def;
		tempPhysical = totalPhysical + phy;

		var percentOffense = Math.round(tempOffense / (leagueTeams[0].length));
		var percentDefense = Math.round(tempDefense / (leagueTeams[0].length));
		var percentPhysical = Math.round(tempPhysical / (leagueTeams[0].length));		
		
		drawCircles(percentOffense, originalOffense, percentDefense, originalDefense, percentPhysical, originalPhysical);
		
	});
	
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
	
	leagueTeams[0].push(draftOverall + " - " + pText);
	teamSummary.innerHTML += leagueTeams[0][leagueTeams[0].length - 1] + "<br>";

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
	
	database.ref('players/' + pValue).once('value').then(function(snapshot) {
	
		var off = snapshot.val().offense;
		var def = snapshot.val().defense;
		var phy = snapshot.val().physical;
	
		if (snapshot.val().position != 'G') {
			console.log(off);
			console.log(def);
			console.log(phy);	

			totalOffense += off;
			totalDefense += def;
			totalPhysical += phy;
		}
	
	});
	
	updateRoundList(pText);
	
	database.ref('players/' + pValue + '/drafted/').set(true);
	counter++;
	
	//compDraft();
	
}

function updateRoundList(string) {

	var stringStart = string.indexOf("-");
	var stringEnd = string.indexOf(")");

	var lists = document.createElement("li");
	var info = document.createTextNode((counter + 1) + "(" + draftOverall + ") - " + string.substring(stringStart + 2, stringEnd + 1));
	
	if (counter == 0) {
		lists.setAttribute("class", "important");
	}
	
	lists.setAttribute("value",round);
	
	lists.appendChild(info);
	roundList.appendChild(lists);
	draftOverall++;
	
	if (counter == leagueTeams.length - 1) {
		round++;
		
		var rounds = document.createElement("option");
		var info = document.createTextNode("Round " + round);
		
		rounds.setAttribute("value",round);
		
		rounds.appendChild(info);
		roundTab.appendChild(rounds);
	}
}

function displayRound() {
	
	var roundList = document.getElementById("roundList");
	var rValue = roundTab.options[roundTab.selectedIndex].value;
	
	for (var i = 0; i < roundList.childElementCount; i++) {
		
		if (roundList.getElementsByTagName("li")[i].value != rValue) {
			roundList.getElementsByTagName("li")[i].classList.add("none");
		} else {
			roundList.getElementsByTagName("li")[i].classList.remove("none");
		}
		
	}
	
}

function compDraft() {
	//console.log("compDraft called");
	
	var rand = Math.floor(Math.random() * (playerList.length / 2));
	//console.log("random number: " + rand);
	
	orderList('ranking');
	
	var cText = playerList.options[rand].text;
	var cValue = playerList.options[rand].value;
	
	updateRoundList(cText);
	
	leagueTeams[counter].push(cText);

	for (var i = 0; i < playerList.length; i++) {
		if (playerList.options[i].value == cValue) {
			playerList.remove(i);
		}
	}
	
	database.ref('players/' + cValue + '/drafted/').set(true);
	
	//Temporary Logic - loops all computers before player re-drafts
	if (counter < leagueTeams.length - 1) {
		counter++;
		compDraft();
	} else {
		counter = 0;
	}
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
	
	database.ref('players/').orderByChild(property).on('child_added', function(snapshot) {
		populateList(snapshot);
	});

	searchList(property);
	
}

// Firebase does not support DESC sort; temporary solution
function orderListReverse(property) {
	//console.log("orderListReverse called");	
	
	clearList();
	
	selectOrder = false;
	
	database.ref('players/').orderByChild(property).on('child_added', function(snapshot) {
		populateList(snapshot);
	});

	searchList(property);
	
}

function filterList() {
	//console.log("filterList called");
	
	var forwardStats = ['orderOffense','orderDefense','orderPhysical'];
	var goalieStats = ['orderVision','orderQuickness','orderRebound'];
	var allStats = forwardStats.concat(goalieStats);
		
	clearList();
	orderList('overall');

	document.getElementById('teamList').disabled = true;
	document.getElementById('dropdownFilter').getElementsByTagName('select')[0].style.color = "#D9D9D9";
	
	if (document.getElementById("goalieFilter").checked) {
		
		forwardStats.forEach(function( id ) {
			document.getElementById(id).className = "none";
		});
		
		goalieStats.forEach(function( id ) {
			document.getElementById(id).className = "";
		});

	} else if (document.getElementById("allFilter").checked) {
		
		allStats.forEach(function( id ) {
			document.getElementById(id).className = "none";
		});
		
	} else {
		
		forwardStats.forEach(function( id ) {
			document.getElementById(id).className = "";
		});
		
		goalieStats.forEach(function( id ) {
			document.getElementById(id).className = "none";
		});
		
	}
	
	database.ref('players/').on('child_added', function(snapshot) {
		populateList(snapshot);
	});
	
	searchList('ranking');
	
}

function searchList(property) {
	//console.log("searchList called");
	
	var search = document.getElementById('searchFilter').value;
	var expr = new RegExp(search, "i");
	
	clearList();
	
	database.ref('players/').orderByChild(property).on('child_added', function(snapshot) {
		
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
	
	database.ref('players/').on('child_added', function(snapshot) {
		populateList(snapshot);
	});
	
	database.ref('teams/').orderByChild('city').on('child_added', function(snapshot) {
		
		if (snapshot.val().active) {
		
			var options = document.createElement("option");
			var info = document.createTextNode(
				snapshot.val().city + " " + snapshot.val().name
			);
					
			options.value = snapshot.key;
			teams.push(snapshot.key);
			options.setAttribute("id", snapshot.key);
			options.appendChild(info);	
			teamList.appendChild(options);
		
		}
	
	});
	
	document.getElementById('teamList').options[0].selected = true;
	document.getElementById('teamList').disabled = false;
	document.getElementById('dropdownFilter').getElementsByTagName('select')[0].style.color = "#0A1612";

	searchList('ranking');
	
}

function dropdownList() {
	//console.log("dropdownList called");
	
	clearList();
	
	database.ref('players/').on('child_added', function(snapshot) {
		populateList(snapshot);
	});
	
	searchList('ranking');
	
}
