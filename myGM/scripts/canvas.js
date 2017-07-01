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

var x = 55;
var y = 40;
var radius = 35;
var startAngle = 1.5 * Math.PI;

// Draw placeholders
function initCircle() {
	
	for (var index = 0; index < canvas.length; index++) {
		
		drawBG(index, 'red');
		drawText(index, 'WEAK', 'red', 0);
	
	}

}

// Dynamically manipulate stats circles
function drawCircles(newOff, avgOff, newDef, avgDef, newPhy, avgPhy) {
	var endAngleOff =  1.5 * Math.PI - (0.062831853071792 * (100 - newOff));
	var endAngleDef =  1.5 * Math.PI - (0.062831853071792 * (100 - newDef));
	var endAnglePhy =  1.5 * Math.PI - (0.062831853071792 * (100 - newPhy));
	var endAngle = [endAngleOff, endAngleDef, endAnglePhy];
	
	var value = [newOff, newDef, newPhy];
	var difference = [avgOff, avgDef, avgPhy];
	
	for (var index = 0; index < canvas.length; index++) {
		
		ctx[index].clearRect(0,0, canvas[index].width, canvas[index].height);
		
		drawBG(index, 'gray');
		
		if (value[index] > 70) {
			
			drawFG(index, endAngle[index], 'green');
			drawText(index, "STRONG", 'green', value[index], difference[index]);
			
		} else if (value[index] > 60) {
			
			drawFG(index, endAngle[index], 'orange');
			drawText(index, "MEDIUM", 'orange', value[index], difference[index]);	
			
		} else {
			
			drawFG(index, endAngle[index], 'red');
			drawText(index, "WEAK", 'red', value[index], difference[index]);
						
		}
		
	}
		
}

// Draw background circle
function drawBG(index, color) {
		
	ctx[index].beginPath();
	ctx[index].arc(x, y, radius, startAngle, 1.4999 * Math.PI, false);
	ctx[index].lineWidth = 5;
	ctx[index].strokeStyle = color;
	ctx[index].stroke();
	
}

// Draw foreground circle
function drawFG(index, endAngle, color) {
	
	ctx[index].beginPath();
	ctx[index].arc(x, y, radius, startAngle, endAngle, false);
	ctx[index].lineWidth = 7;
	ctx[index].strokeStyle = color;
	ctx[index].stroke();
	
}

// Draw text components
function drawText(index, message, color, value, difference) {
	
	difference = difference || 0;
	
	value = Math.round(value);
	difference = Math.round(difference);
	
	// Draw value and message
	ctx[index].beginPath();
	ctx[index].fillStyle = color;
	ctx[index].font = "20px Lato";
	ctx[index].textAlign="center"; 
	ctx[index].fillText(message, 55, 110);
	
	if (value == 0) {
		ctx[index].fillStyle = 'red';
		ctx[index].fillText(0,55,40);
	} else {
		ctx[index].fillText(value, 55, 40);				
	}
	
	ctx[index].stroke();
	ctx[index].closePath();
	
	// Draw difference
	ctx[index].beginPath();	
	ctx[index].font = "15px Lato";	
			
	if (isNaN(difference)) {
		ctx[index].fillStyle = 'green';
		ctx[index].fillText("+ " + value, 55, 60);
	} else if (value > difference) {
		ctx[index].fillStyle = 'green';
		ctx[index].fillText("+ " + (value - difference), 55, 60);
	} else if (value < difference) {
		ctx[index].fillStyle = 'red';
		ctx[index].fillText(value - difference, 55, 60);
	} else {
		ctx[index].fillStyle = 'orange';
		ctx[index].fillText("+ 0", 55, 60);
	}
	
	ctx[index].stroke();
	ctx[index].closePath();

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