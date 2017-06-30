var canvas = [
		document.getElementById('offCanvas'), 
		document.getElementById('defCanvas'), 
		document.getElementById('phyCanvas')
	];
	
var ctx = [
		offCanvas.getContext("2d"), 
		defCanvas.getContext("2d"), 
		phyCanvas.getContext("2d")
	];

var x = 70;
var y = 50;
var radius = 45;
var startAngle = 1.5 * Math.PI;

// onload function to build placeholders 
function initCircle() {
	
	for (var i = 0; i < canvas.length; i++) {
		
		generateBG(i, 'red');
		generateText(i, 'WEAK', 0, 'red');
	
	}

}

// background circle
function generateBG(stat, color) {
		
	ctx[stat].beginPath();
	ctx[stat].arc(x, y, radius, startAngle, 1.4999 * Math.PI, false);
	ctx[stat].lineWidth = 5;
	ctx[stat].strokeStyle = color;
	ctx[stat].stroke();
	
}

// foreground circle
function generateFG(stat, endAngle, color) {
	
	ctx[stat].beginPath();
	ctx[stat].arc(x, y, radius, startAngle, endAngle, false);
	ctx[stat].lineWidth = 7;
	ctx[stat].strokeStyle = color;
	ctx[stat].stroke();
	
}

// print the new center value and the amount it was changed
function generateText(stat, message, value, color) {
	
	ctx[stat].fillStyle = color;
	ctx[stat].beginPath();
	ctx[stat].font = "20px Lato";
	ctx[stat].textAlign="center"; 
	ctx[stat].fillText(message, 70, 130);
	ctx[stat].fillText(value, 70, 50);
	ctx[stat].stroke();
	ctx[stat].closePath();
	
}

// dynamic manipulation of stat circles
function drawCircles(off, off2, def, def2, phy, phy2) {
	var endAngleOFF =  1.5 * Math.PI - (0.062831853071792 * (100 - off));
	var endAngleDEF =  1.5 * Math.PI - (0.062831853071792 * (100 - def));
	var endAnglePHY =  1.5 * Math.PI - (0.062831853071792 * (100 - phy));
	var endAngle = [endAngleOFF, endAngleDEF, endAnglePHY];
	
	var stats = [off, def, phy];
	var stats2 = [off2, def2, phy2];
	
	for (var i = 0; i < canvas.length; i++) {
		ctx[i].clearRect(0,0, canvas[i].width, canvas[i].height);
		
		ctx[i].font = "20px Lato";
		ctx[i].textAlign="center";
		
		generateBG(i, 'gray');
		
		if (stats[i] > 70) {
			
			generateFG(i, endAngle[i], 'green');
			
			ctx[i].fillStyle = 'green';
			ctx[i].beginPath(); 
			ctx[i].fillText("STRONG", 70, 130);
			
			if (isNaN(stats2[i])) {
				ctx[i].fillStyle = 'red';
				ctx[i].fillText(0,70,50);
			} else {
				ctx[i].fillText(stats[i], 70, 50);				
			}
			
			ctx[i].stroke();
			ctx[i].closePath();
			
		} else if (stats[i] > 60) {
			
			generateFG(i, endAngle[i], 'orange');
			
			ctx[i].fillStyle = 'orange';
			ctx[i].beginPath();
			ctx[i].fillText("MEDIUM", 70, 130);
			
			if (isNaN(stats2[i])) {
				ctx[i].fillStyle = 'red';
				ctx[i].fillText(0,70,50);
			} else {
				ctx[i].fillText(stats[i], 70, 50);
			}
			
			ctx[i].stroke();
			ctx[i].closePath();	
			
		} else {
			
			generateFG(i, endAngle[i], 'red');
			
			ctx[i].fillStyle = 'red';
			ctx[i].beginPath();
			ctx[i].fillText("WEAK", 70, 130);
			
			if (isNaN(stats2[i])) {
				ctx[i].fillStyle = 'red';
				ctx[i].fillText(0,70,50);
			} else {
				ctx[i].fillText(stats[i], 70, 50);
			}
			
			ctx[i].stroke();
			ctx[i].closePath();
			
		}
			
		ctx[i].font = "15px Lato";
			
		if (isNaN(stats2[i])) {
			ctx[i].fillStyle = 'green';
			ctx[i].beginPath();
			ctx[i].fillText("+ " + (stats[i]), 70, 70);
			ctx[i].stroke();
			ctx[i].closePath();
		} else if (stats[i] > stats2[i]) {
			ctx[i].fillStyle = 'green';
			ctx[i].beginPath();
			ctx[i].fillText("+ " + (stats[i] - stats2[i]), 70, 70);
			ctx[i].stroke();
			ctx[i].closePath();
		} else if (stats[i] < stats2[i]) {
			ctx[i].fillStyle = 'red';
			ctx[i].beginPath();
			ctx[i].fillText((stats[i] - stats2[i]), 70, 70);
			ctx[i].stroke();
			ctx[i].closePath();
		} else {
			ctx[i].fillStyle = 'orange';
			ctx[i].beginPath();
			ctx[i].fillText("+ 0", 70, 70);
			ctx[i].stroke();
			ctx[i].closePath();
		}
		
	}
		
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