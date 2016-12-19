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
var timeSlider;
var timeScale;

var letters = [];

function setup()
{
	//randomSeed(5);//second());
	
  	createCanvas(1024, 720);
  	timeScale = 0.5;
  	letters ="ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
	nextShootingStar = random(10, 20);
	sun = new Star(createVector(width/2, height/2));
	mode = "Star System";
	selectedStar = sun;
	timeSlider = createSlider(0, 4, 0.5, 0.05);
	
	for(i = 0; i < 8500; i++)
	{
		var star = new distantStar(createVector(random(-width*6, width*6), random(-height*8, height*8)));
		distantStars.push(star);
		
	}
	shootingStars[0] = new shootingStar(createVector(500, 300));
	mainCamera = new Camera();
	targetCamPos = createVector(mainCamera.tVal.x, mainCamera.tVal.y);
	cameraPos = createVector(mainCamera.tVal.x, mainCamera.tVal.y);
	mainCamera.setScale(0.5);
	//planets[0].selected = true;
}

function mouseClicked()
{
	if(mouseButton == LEFT)
	{
		selectedStar.select(mainCamera);
	}
	
}
function keyPressed()
{
	
	selectedStar.keyInput(keyCode);
	
	
}
function pan()
{
	if(keyIsDown(65) && targetCamPos.x < width*15 && mainCamera.leftBound > -width*15)
	{
		targetCamPos.x += 15;
	}
	else if(keyIsDown(68) && targetCamPos.x > -width*15 && mainCamera.rightBound < width*15)
	{
		targetCamPos.x -= 15;
	}
	if(keyIsDown(87) && targetCamPos.y < height*15 && mainCamera.topBound > -height*15)
	{
		targetCamPos.y += 15;
	}
	else if(keyIsDown(83) && targetCamPos.y > -height*15 && mainCamera.bottomBound < height*15)
	{
		targetCamPos.y -= 15;
	}
	else if(keyIsDown(69))
	{
		mainCamera.setScale(min(mainCamera.scaleValue * 1.01, 3));
	}
	else if(keyIsDown(81))
	{
		mainCamera.setScale(max(mainCamera.scaleValue * 0.99, 0.01));
	}
	else if(keyIsDown(70))
	{
		mainCamera.setScale(1);
	}
	
}
	


function draw() {
  background(0);
 // translate(0,0);
   
 
 	timeScale = timeSlider.value();
  
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
  
  
  cameraPos = cameraPos.lerp(targetCamPos, 0.8);
  
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
  
  //if(mode === "Star System")
  //{
  	if(selectedStar.checkSelected(mainCamera))
  	{
  		targetCamPos.x = width/2 - selectedStar.pos.x*mainCamera.scaleValue;
  		targetCamPos.y = height/2 - selectedStar.pos.y*mainCamera.scaleValue;
  	}
	  
  	selectedStar.show();
  //}
  
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


