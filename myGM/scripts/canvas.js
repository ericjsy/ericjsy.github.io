var canvas = document.getElementById('layer2');
var ctx = canvas.getContext("2d");

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