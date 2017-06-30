var offCanvas = document.getElementById('offCanvas');
var defCanvas = document.getElementById('defCanvas');
var phyCanvas = document.getElementById('phyCanvas');
var offCTX = offCanvas.getContext("2d");
var defCTX = defCanvas.getContext("2d");
var phyCTX = phyCanvas.getContext("2d");

var x = 70;
var y = 50;
var radius = 45;
var startAngle = 1.5 * Math.PI;
var counterClockwise = false;

function initCircle() {
	offCTX.beginPath();
	offCTX.arc(x, y, radius, startAngle, 1.4999 * Math.PI, counterClockwise);
	offCTX.lineWidth = 5;
	offCTX.strokeStyle = 'gray';
	offCTX.stroke();
	
	offCTX.fillStyle = 'red';
	offCTX.beginPath();
	offCTX.font = "20px Lato";
	offCTX.textAlign="center"; 
	offCTX.fillText("WEAK",70,130);
	offCTX.stroke();
	offCTX.closePath();
	
	defCTX.beginPath();
	defCTX.arc(x, y, radius, startAngle, 1.4999 * Math.PI, counterClockwise);
	defCTX.lineWidth = 5;
	defCTX.strokeStyle = 'gray';
	defCTX.stroke();
	
	defCTX.fillStyle = 'red';
	defCTX.beginPath();
	defCTX.font = "20px Lato";
	defCTX.textAlign="center"; 
	defCTX.fillText("WEAK",70,130);
	defCTX.stroke();
	defCTX.closePath();
	
	phyCTX.beginPath();
	phyCTX.arc(x, y, radius, startAngle, 1.4999 * Math.PI, counterClockwise);
	phyCTX.lineWidth = 5;
	phyCTX.strokeStyle = 'gray';
	phyCTX.stroke();
	
	phyCTX.fillStyle = 'red';
	phyCTX.beginPath();
	phyCTX.font = "20px Lato";
	phyCTX.textAlign="center"; 
	phyCTX.fillText("WEAK",70,130);
	phyCTX.stroke();
	phyCTX.closePath();
}

function drawCircles(off, off2, def, def2, phy, phy2) {
	var endAngleOFF =  1.5 * Math.PI - (0.062831853071792 * (100 - off));
	var endAngleDEF =  1.5 * Math.PI - (0.062831853071792 * (100 - def));
	var endAnglePHY =  1.5 * Math.PI - (0.062831853071792 * (100 - phy));

	offCTX.clearRect(0, 0, offCanvas.width, offCanvas.height);
	defCTX.clearRect(0, 0, defCanvas.width, defCanvas.height);
	phyCTX.clearRect(0, 0, phyCanvas.width, phyCanvas.height);

	// Full arc; background
	offCTX.beginPath();
	offCTX.arc(x, y, radius, startAngle, 1.4999 * Math.PI, counterClockwise);
	offCTX.lineWidth = 5;
	offCTX.strokeStyle = 'gray';
	offCTX.stroke();
	
	if (off > 70) {
		offCTX.beginPath();
		offCTX.arc(x, y, radius, startAngle, endAngleOFF, counterClockwise);
		offCTX.lineWidth = 7;
		offCTX.strokeStyle = 'green';
		offCTX.stroke();
		
		offCTX.fillStyle = 'green';
		offCTX.beginPath();
		offCTX.font = "20px Lato";
		offCTX.textAlign="center"; 
		offCTX.fillText("STRONG", 70, 130);
		offCTX.fillText(off, 70, 50);
		offCTX.stroke();
		offCTX.closePath();
	} else if (off > 60) {
		offCTX.beginPath();
		offCTX.arc(x, y, radius, startAngle, endAngleOFF, counterClockwise);
		offCTX.lineWidth = 7;
		offCTX.strokeStyle = 'orange';
		offCTX.stroke();
		
		offCTX.fillStyle = 'orange';
		offCTX.beginPath();
		offCTX.font = "20px Lato";
		offCTX.textAlign="center"; 
		offCTX.fillText("MEDIUM", 70, 130);
		offCTX.fillText(off, 70, 50);
		offCTX.stroke();
		offCTX.closePath();
	} else {
		offCTX.beginPath();
		offCTX.arc(x, y, radius, startAngle, endAngleOFF, counterClockwise);
		offCTX.lineWidth = 7;
		offCTX.strokeStyle = 'red';
		offCTX.stroke();
		
		offCTX.fillStyle = 'red';
		offCTX.beginPath();
		offCTX.font = "20px Lato";
		offCTX.textAlign="center"; 
		offCTX.fillText("WEAK", 70, 130);
		offCTX.fillText(off, 70, 50);
		offCTX.stroke();
		offCTX.closePath();
	}

	// Full arc; background
	defCTX.beginPath();
	defCTX.arc(x, y, radius, startAngle, 1.4999 * Math.PI, counterClockwise);
	defCTX.lineWidth = 5;
	defCTX.strokeStyle = 'gray';
	defCTX.stroke();

	// Overlaying arc; foreground

	if (def > 70) {
		defCTX.beginPath();
		defCTX.arc(x, y, radius, startAngle, endAngleDEF, counterClockwise);
		defCTX.lineWidth = 7;
		defCTX.strokeStyle = 'green';
		defCTX.stroke();
		
		defCTX.fillStyle = 'green';
		defCTX.beginPath();
		defCTX.font = "20px Lato";
		defCTX.textAlign="center";
		defCTX.fillText("STRONG", 70, 130);
		defCTX.fillText(def, 70, 50);
		defCTX.stroke();
		defCTX.closePath();
	} else if (def > 60) {
		defCTX.beginPath();
		defCTX.arc(x, y, radius, startAngle, endAngleDEF, counterClockwise);
		defCTX.lineWidth = 7;
		defCTX.strokeStyle = 'orange';
		defCTX.stroke();
		
		defCTX.fillStyle = 'orange';
		defCTX.beginPath();
		defCTX.font = "20px Lato";
		defCTX.textAlign="center";
		defCTX.fillText("MEDIUM", 70, 130);
		defCTX.fillText(def, 70, 50);
		defCTX.stroke();
		defCTX.closePath();
	} else {
		defCTX.beginPath();
		defCTX.arc(x, y, radius, startAngle, endAngleDEF, counterClockwise);
		defCTX.lineWidth = 7;
		defCTX.strokeStyle = 'red';
		defCTX.stroke();
		
		defCTX.fillStyle = 'red';
		defCTX.beginPath();
		defCTX.font = "20px Lato";
		defCTX.textAlign="center";
		defCTX.fillText("WEAK", 70, 130);
		defCTX.fillText(def, 70, 50);
		defCTX.stroke();
		defCTX.closePath();
	}

	// Full arc; background
	phyCTX.beginPath();
	phyCTX.arc(x, y, radius, startAngle, 1.4999 * Math.PI, counterClockwise);
	phyCTX.lineWidth = 5;
	phyCTX.strokeStyle = 'gray';
	phyCTX.stroke();

	if (phy > 70) {
		phyCTX.beginPath();
		phyCTX.arc(x, y, radius, startAngle, endAnglePHY, counterClockwise);
		phyCTX.lineWidth = 7;
		phyCTX.strokeStyle = 'green';
		phyCTX.stroke();
		
		phyCTX.fillStyle = 'green';
		phyCTX.beginPath();
		phyCTX.font = "20px Lato";
		phyCTX.textAlign="center";
		phyCTX.fillText("STRONG", 70, 130);
		phyCTX.fillText(phy, 70, 50);
		phyCTX.stroke();
		phyCTX.closePath();
	} else if (phy > 60) {
		phyCTX.beginPath();
		phyCTX.arc(x, y, radius, startAngle, endAnglePHY, counterClockwise);
		phyCTX.lineWidth = 7;
		phyCTX.strokeStyle = 'orange';
		phyCTX.stroke();
		
		phyCTX.fillStyle = 'orange';
		phyCTX.beginPath();
		phyCTX.font = "20px Lato";
		phyCTX.textAlign="center";
		phyCTX.fillText("MEDIUM", 70, 130);
		phyCTX.fillText(phy, 70, 50);
		phyCTX.stroke();
		phyCTX.closePath();
	} else {
		phyCTX.beginPath();
		phyCTX.arc(x, y, radius, startAngle, endAnglePHY, counterClockwise);
		phyCTX.lineWidth = 7;
		phyCTX.strokeStyle = 'red';
		phyCTX.stroke();
		
		phyCTX.fillStyle = 'red';
		phyCTX.beginPath();
		phyCTX.font = "20px Lato";
		phyCTX.textAlign="center";
		phyCTX.fillText("WEAK", 70, 130);
		phyCTX.fillText(phy, 70, 50);
		phyCTX.stroke();
		phyCTX.closePath();
	}
	
	if (isNaN(off2)) {
		offCTX.fillStyle = 'green';
		offCTX.beginPath();
		offCTX.font = "15px Lato";
		offCTX.textAlign="center";
		offCTX.fillText("+ " + (off), 70, 70);
		offCTX.stroke();
		offCTX.closePath();
	} else if (off > off2) {
		offCTX.fillStyle = 'green';
		offCTX.beginPath();
		offCTX.font = "15px Lato";
		offCTX.textAlign="center";
		offCTX.fillText("+ " + (off - off2), 70, 70);
		offCTX.stroke();
		offCTX.closePath();
	} else if (off < off2) {
		offCTX.fillStyle = 'red';
		offCTX.beginPath();
		offCTX.font = "15px Lato";
		offCTX.textAlign="center";
		offCTX.fillText((off - off2), 70, 70);
		offCTX.stroke();
		offCTX.closePath();
	} else {
		offCTX.fillStyle = 'orange';
		offCTX.beginPath();
		offCTX.font = "15px Lato";
		offCTX.textAlign="center";
		offCTX.fillText("+ 0", 70, 70);
		offCTX.stroke();
		offCTX.closePath();
	}
		
	if (isNaN(def2)) {
		defCTX.fillStyle = 'green';
		defCTX.beginPath();
		defCTX.font = "15px Lato";
		defCTX.textAlign="center";
		defCTX.fillText("+ " + (def), 70, 70);
		defCTX.stroke();
		defCTX.closePath();
	} else if (def > def2) {
		defCTX.fillStyle = 'green';
		defCTX.beginPath();
		defCTX.font = "15px Lato";
		defCTX.textAlign="center";
		defCTX.fillText("+ " + (def - def2), 70, 70);
		defCTX.stroke();
		defCTX.closePath();
	} else if (def < def2) {
		defCTX.fillStyle = 'red';
		defCTX.beginPath();
		defCTX.font = "15px Lato";
		defCTX.textAlign="center";
		defCTX.fillText((def - def2), 70, 70);
		defCTX.stroke();
		defCTX.closePath();
	} else {
		defCTX.fillStyle = 'orange';
		defCTX.beginPath();
		defCTX.font = "15px Lato";
		defCTX.textAlign="center";
		defCTX.fillText("+ 0", 70, 70);
		defCTX.stroke();
		defCTX.closePath();
	}
	
	if (isNaN(phy2)) {
		phyCTX.fillStyle = 'green';
		phyCTX.beginPath();
		phyCTX.font = "15px Lato";
		phyCTX.textAlign="center";
		phyCTX.fillText("+ " + (phy), 70, 70);
		phyCTX.stroke();
		phyCTX.closePath();
	} else if (phy > phy2) {
		phyCTX.fillStyle = 'green';
		phyCTX.beginPath();
		phyCTX.font = "15px Lato";
		phyCTX.textAlign="center";
		phyCTX.fillText("+ " + (phy - phy2), 70, 70);
		phyCTX.stroke();
		phyCTX.closePath();
	} else if (phy < phy2) {
		phyCTX.fillStyle = 'red';
		phyCTX.beginPath();
		phyCTX.font = "15px Lato";
		phyCTX.textAlign="center";
		phyCTX.fillText((phy - phy2), 70, 70);
		phyCTX.stroke();
		phyCTX.closePath();
	} else {
		phyCTX.fillStyle = 'orange';
		phyCTX.beginPath();
		phyCTX.font = "15px Lato";
		phyCTX.textAlign="center";
		phyCTX.fillText("+ 0", 70, 70);
		phyCTX.stroke();
		phyCTX.closePath();
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