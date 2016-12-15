var distantStars = [];
var shootingStars = [];
 var nextShootingStar;
// var planets = [];
// var planetLines = [];
var cameraPos;
var targetCamPos;
var sun;
var mode;
var selectedStar;
var camSize;
var mainCamera;

function setup()
{
	//randomSeed(5);//second());
  	createCanvas(1024, 720);
	nextShootingStar = random(10, 20);
	sun = new Star(createVector(width/2, height/2));
	mode = "Star System";
	selectedStar = sun;

	for(i = 0; i < 8500; i++)
	{
		var star = new distantStar(createVector(random(-width*6, width*6), random(-height*8, height*8)));
		distantStars.push(star);
		
	}
	shootingStars[0] = new shootingStar(createVector(500, 300));
	mainCamera = new Camera();
	targetCamPos = createVector(mainCamera.tVal.x, mainCamera.tVal.y);
	cameraPos = createVector(mainCamera.tVal.x, mainCamera.tVal.y);
	mainCamera.setScale(1);
	//planets[0].selected = true;
}

function mouseClicked()
{
	if(mouseButton == LEFT)
	{
		selectedStar.select(mainCamera);
	}
	
}

function pan()
{
	if(keyIsDown(65) && targetCamPos.x < width*5 && mainCamera.leftBound > -width*5)
	{
		targetCamPos.x += 15;
	}
	else if(keyIsDown(68) && targetCamPos.x > -width*8 && mainCamera.rightBound < width*8)
	{
		targetCamPos.x -= 15;
	}
	if(keyIsDown(87) && targetCamPos.y < height*5 && mainCamera.topBound > -height*5)
	{
		targetCamPos.y += 15;
	}
	else if(keyIsDown(83) && targetCamPos.y > -height*5 && mainCamera.bottomBound < height*5)
	{
		targetCamPos.y -= 15;
	}
	else if(keyIsDown(69))
	{
		mainCamera.setScale(min(mainCamera.scaleValue * 1.01, 3));
	}
	else if(keyIsDown(81))
	{
		mainCamera.setScale(max(mainCamera.scaleValue * 0.99, 0.1));
	}
	else if(keyIsDown(70))
	{
		mainCamera.setScale(1);
	}
	
}
	


function draw() {
  background(0);
 // translate(0,0);
  
 
 
  
  translate(mainCamera.tVal.x, mainCamera.tVal.y);
 //scale(1);
  scale(mainCamera.scaleValue);
  
  for(i = 0; i < distantStars.length; i++)
  {
  	if(mainCamera.scaleValue > 0.3)
  	{
  		distantStars[i].checkOnScreen(mainCamera);
  		distantStars[i].show();
  	}
  }
  
  
  cameraPos = cameraPos.lerp(targetCamPos, 0.07);
  
  mainCamera.translatePosition(cameraPos);
  
  
  //mainCamera.show();
  pan();
  if(shootingStars.length > 0 && shootingStars[0].len === 0)
  {
  	shootingStars.pop();
  }
  
  
  
  for(i = 0; i < shootingStars.length; i++)
  {
  	shootingStars[i].show();
  	shootingStars[i].update();
  }
  //for(var i = 0; i < planetLines.length; i++)
  //{
  //	planetLines[i].show();
  //}
  
  //for(var i = 0; i < planets.length; i++)
  //{
  	
  //	if(planets[i].checkSelected(cameraPos))
  //	{
  //		
  //	}
  //	if(planets[i].onScreen)
  //	{
  //		planets[i].show();
  //	}
  //}
  
  if(mode === "Star System")
  {
  	if(selectedStar.checkSelected(mainCamera))
  	{
  		targetCamPos.x = width/2 - selectedStar.pos.x*mainCamera.scaleValue;
  		targetCamPos.y = height/2 - selectedStar.pos.y*mainCamera.scaleValue;
  	}
	  
  	selectedStar.show();
  }
  
  //fill(255);
  //ellipse(-mainCamera.tVal.x*(1/mainCamera.scaleValue)  + width/(2.0 * mainCamera.scaleValue),-mainCamera.tVal.y*(1/mainCamera.scaleValue) + height/(2.0 * mainCamera.scaleValue), 5, 5);
  
  nextShootingStar--;
  if(nextShootingStar <= 0)
  {
  	var star = new shootingStar(createVector(random(0, 1024), random(0, 720)));
	shootingStars.push(star);
  	nextShootingStar = random(10, 120);
  }
  
}

// function planetLine(p1, p2)
// {
// 	this.x1 = p1.pos.x;
// 	this.x2 = p2.pos.x;
// 	this.y1 = p1.pos.y;
// 	this.y2 = p2.pos.y;
	
// 	this.show = function()
// 	{
// 		var thickness = dist(this.x1, this.y1, this.x2, this.y2);
// 		thickness /= 100.0;
// 		thickness = 1.0/thickness;
// 		var a = map(thickness, 0, 1, 0, 255);
		
// 		stroke(255,255,255, a);
		
		
// 		line(this.x1,this.y1,this.x2,this.y2);
		
// 	}
// }

