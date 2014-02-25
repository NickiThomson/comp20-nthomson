

function draw(){	
	var canvas = document.getElementById('game');
	var ctx = canvas.getContext('2d');
	var spritesheet;

	spritesheet = document.getElementById('spritesheet');

	//Background
	ctx.fillStyle = "#87CEEB";
	ctx.fillRect(0,0,800,600);

	//Draw things
	ctx.drawImage(spritesheet, 0, 272, 80, 125, 15, 175, 240, 375); // tree
	ctx.drawImage(spritesheet, 0, 700, 900, 192, 0, 429, 800, 171); // plants

	ctx.drawImage(spritesheet, 0, 0, 60, 50, 100, 500, 120, 100); // dog
	ctx.drawImage(spritesheet, 336, 191, 36, 38, 500, 200, 72, 74); // bird1
	ctx.drawImage(spritesheet, 260, 120, 40, 35, 355, 400, 80, 70); //bird2
	ctx.drawImage(spritesheet, 260, 155, 40, 42, 150, 100, 80, 84); //bird3
	ctx.drawImage(spritesheet, 80, 115, 40, 40, 700, 300, 80, 80); //bird4
	ctx.drawImage(spritesheet, 125, 116, 44, 38, 450, 280, 88, 76); //bird5


}


