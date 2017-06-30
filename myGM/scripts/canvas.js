var offCanvas = document.getElementById('offCanvas');
var defCanvas = document.getElementById('defCanvas');
var phyCanvas = document.getElementById('phyCanvas');
var offCTX = offCanvas.getContext("2d");
var defCTX = defCanvas.getContext("2d");
var phyCTX = phyCanvas.getContext("2d");

var canvas = [document.getElementById('offCanvas'), document.getElementById('defCanvas'), document.getElementById('phyCanvas')]
var ctx = [offCanvas.getContext("2d"), defCanvas.getContext("2d"), phyCanvas.getContext("2d")];

var x = 70;
var y = 50;
var radius = 45;
var startAngle = 1.5 * Math.PI;
var counterClockwise = false;

function initCircle() {
	
	for (var i = 0; i < canvas.length; i++) {
	ctx[i].beginPath();
	ctx[i].arc(x, y, radius, startAngle, 1.4999 * Math.PI, counterClockwise);
	ctx[i].lineWidth = 5;
	ctx[i].strokeStyle = 'gray';
	ctx[i].stroke();
	
	ctx[i].fillStyle = 'red';
	ctx[i].beginPath();
	ctx[i].font = "20px Lato";
	ctx[i].textAlign="center"; 
	ctx[i].fillText("WEAK",70,130);
	ctx[i].stroke();
	ctx[i].closePath();
	
	}

}

function drawCircles(off, off2, def, def2, phy, phy2) {
	var endAngleOFF =  1.5 * Math.PI - (0.062831853071792 * (100 - off));
	var endAngleDEF =  1.5 * Math.PI - (0.062831853071792 * (100 - def));
	var endAnglePHY =  1.5 * Math.PI - (0.062831853071792 * (100 - phy));

	var stats = [off, def, phy];
	var stats2 = [off2, def2, phy2];
	
	for (var i = 0; i < canvas.length; i++) {
		ctx[i].clearRect(0,0, canvas[i].width, canvas[i].height);
		
		ctx[i].beginPath();
		ctx[i].arc(x, y, radius, startAngle, 1.4999 * Math.PI, counterClockwise);
		ctx[i].lineWidth = 5;
		ctx[i].strokeStyle = 'gray';
		ctx[i].stroke();
		
		if (stats[i] > 70) {
			ctx[i].beginPath();
			ctx[i].arc(x, y, radius, startAngle, endAngleOFF, counterClockwise);
			ctx[i].lineWidth = 7;
			ctx[i].strokeStyle = 'green';
			ctx[i].stroke();
			
			ctx[i].fillStyle = 'green';
			ctx[i].beginPath();
			ctx[i].font = "20px Lato";
			ctx[i].textAlign="center"; 
			ctx[i].fillText("STRONG", 70, 130);
			ctx[i].fillText(stats[i], 70, 50);
			ctx[i].stroke();
			ctx[i].closePath();
		} else if (stats[i] > 60) {
			ctx[i].beginPath();
			ctx[i].arc(x, y, radius, startAngle, endAngleOFF, counterClockwise);
			ctx[i].lineWidth = 7;
			ctx[i].strokeStyle = 'orange';
			ctx[i].stroke();
			
			ctx[i].fillStyle = 'orange';
			ctx[i].beginPath();
			ctx[i].font = "20px Lato";
			ctx[i].textAlign="center"; 
			ctx[i].fillText("MEDIUM", 70, 130);
			ctx[i].fillText(stats[i], 70, 50);
			ctx[i].stroke();
			ctx[i].closePath();
		} else {
			ctx[i].beginPath();
			ctx[i].arc(x, y, radius, startAngle, endAngleOFF, counterClockwise);
			ctx[i].lineWidth = 7;
			ctx[i].strokeStyle = 'red';
			ctx[i].stroke();
			
			ctx[i].fillStyle = 'red';
			ctx[i].beginPath();
			ctx[i].font = "20px Lato";
			ctx[i].textAlign="center"; 
			ctx[i].fillText("WEAK", 70, 130);
			ctx[i].fillText(stats[i], 70, 50);
			ctx[i].stroke();
			ctx[i].closePath();
		}
		
		if (isNaN(stats2[i])) {
			ctx[i].fillStyle = 'green';
			ctx[i].beginPath();
			ctx[i].font = "15px Lato";
			ctx[i].textAlign="center";
			ctx[i].fillText("+ " + (stats[i]), 70, 70);
			ctx[i].stroke();
			ctx[i].closePath();
		} else if (stats[i] > stats2[i]) {
			ctx[i].fillStyle = 'green';
			ctx[i].beginPath();
			ctx[i].font = "15px Lato";
			ctx[i].textAlign="center";
			ctx[i].fillText("+ " + (stats[i] - stats2[i]), 70, 70);
			ctx[i].stroke();
			ctx[i].closePath();
		} else if (stats[i] < stats2[i]) {
			ctx[i].fillStyle = 'red';
			ctx[i].beginPath();
			ctx[i].font = "15px Lato";
			ctx[i].textAlign="center";
			ctx[i].fillText((stats[i] - stats2[i]), 70, 70);
			ctx[i].stroke();
			ctx[i].closePath();
		} else {
			ctx[i].fillStyle = 'orange';
			ctx[i].beginPath();
			ctx[i].font = "15px Lato";
			ctx[i].textAlign="center";
			ctx[i].fillText("+ 0", 70, 70);
			ctx[i].stroke();
			ctx[i].closePath();
		}
		
	}
		
	/*
		document.getElementById('avgOff').innerHTML = "Offense: " + Math.round(percentOffense * 100) + " +" + Math.round((percentOffense - originalOffense) * 100);
		document.getElementById('avgOff').style.color = "#00FF00";
	} else if (percentOffense < originalOffense) {
		document.getElementById('avgOff').innerHTML = "Offense: " + Math.round(percentOffense * 100) + " " + Math.round((percentOffense - originalOffense) * 100);
		document.getElementById('avgOff').style.color = "#FF0000";
	} else {
		document.getElementById('avgOff').innerHTML = "Offense: " + Math.round(percentOffense * 100) + " +" + Math.round((percentOffense - originalOffense) * 100);
		document.getElementById('avgOff').style.color = "#000000";
	}
	
	if (percentDefense > originalDefense) {
		document.getElementById('avgDef').innerHTML = "Defense: " + Math.round(percentDefense * 100) + " +" + Math.round((percentDefense - originalDefense) * 100);
		document.getElementById('avgDef').style.color = "#00FF00";
	} else if (percentDefense < originalDefense) {
		document.getElementById('avgDef').innerHTML = "Defense: " + Math.round(percentDefense * 100) + " " + Math.round((percentDefense - originalDefense) * 100);
		document.getElementById('avgDef').style.color = "#FF0000";			
	} else {
		document.getElementById('avgDef').innerHTML = "Defense: " + Math.round(percentDefense * 100) + " +" + Math.round((percentDefense - originalDefense) * 100);
		document.getElementById('avgDef').style.color = "#000000";				
	}
	
	if (percentPhysical > originalPhysical) {
		document.getElementById('avgPhy').innerHTML = "Physical: " + Math.round(percentPhysical * 100) + " +" + Math.round((percentPhysical - originalPhysical) * 100);
		document.getElementById('avgPhy').style.color = "#00FF00";
	} else if (percentPhysical < originalPhysical) {
		document.getElementById('avgPhy').innerHTML = "Physical: " + Math.round(percentPhysical * 100) + " " + Math.round((percentPhysical - originalPhysical) * 100);
		document.getElementById('avgPhy').style.color = "#FF0000";
	} else {
		document.getElementById('avgPhy').innerHTML = "Physical: " + Math.round(percentPhysical * 100) + " +" + Math.round((percentPhysical - originalPhysical) * 100);
		document.getElementById('avgPhy').style.color = "#000000";		
	}
	*/

}


/*
ctx.fillStyle = '#000000';
ctx.beginPath();
ctx.font = "20px Lato";
ctx.fillText("OFF", 130, 25);
ctx.fillText("DEF", 20, 135);
ctx.fillText("PHY", 240, 135);
ctx.stroke();
ctx.closePath();

ctx.fillStyle = '#000000';
ctx.beginPath();
ctx.moveTo(150, 35);
ctx.lineTo(70, 115);
ctx.lineTo(230, 115);
ctx.lineTo(150, 35);

ctx.lineWidth = 1;
ctx.fill();
ctx.stroke();
ctx.closePath();
*/