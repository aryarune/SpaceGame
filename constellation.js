function Constellation()
{
	this.stars = [];
	this.lines = [];
	var numStars = 100;
	this.starCount = 0;
	this.targetStarCount = 3500;
	this.pos = createVector(0, 0);
	this.xSector = 0;
	this.ySector = 0;
	this.curveVertices = [];
	this.w = random(50,100);
	this.h = random(50,100);
	this.selected = false;
	this.onScreen = true;
	this.visited = false;
	
	
	var currentLinesI = 0;
	var boundSize = 10;
	
	
	this.show = function()
	{
		if(mode == "Galaxy View")
		{
			if(this.pos.x >= mainCamera.leftBound - this.w/2 && this.pos.x <= mainCamera.rightBound + this.w/2
				&& this.pos.y >= mainCamera.topBound - this.h/2 && this.pos.y <= mainCamera.bottomBound + this.h/2)
			{
				this.onScreen = true;
			}
			else
			{
				this.onScreen = false;
			}
			
			if(this.onScreen)
			{
				fill(255,255,255, 100);
				if(this.visited)
				{
					fill(0,255,0,20);
				}
				noStroke();
				if(this.selected)
				{
					stroke(255);
				}
				
				rect(this.pos.x-this.w/2, this.pos.y-this.h/2, this.w,this.h, 30);
				noStroke();
				/*randomSeed(this.pos.x * this.pos.y);
				for(var i = 0; i < this.w/20 + this.h/20; i++)
				{
					fill(random(200,255), random(200,255), random(200,255), random(220,255));
					var sizeOfStar = random(1,5);
					ellipse(random(this.pos.x-this.w/2,this.pos.x+this.w/2), random(this.pos.y-this.h/2,this.pos.y+this.h/2), sizeOfStar, sizeOfStar);
				}*/
			}
			
		}
		if(mode == "Constellation View")
		{
			if(this.starCount < this.targetStarCount)
			{
				this.loadingScreen().next();
				this.generate().next();
			}
			else if(currentLinesI < this.starCount-1)
			{
				this.loadingScreen().next();
				this.generateLines().next();
			}
			else
			{
				stroke(255, 255, 255, 100);
				strokeWeight(2);
				for(var i = 0; i < this.lines.length; i++)
				{
					line(this.lines[i].x1, this.lines[i].y1, this.lines[i].x2, this.lines[i].y2);
				}	
			}
		}
		if(mode == "Constellation View" || mode == "Star System" || mode == "Planetary View")
		{
			
			for(var i = 0; i < this.stars.length; i++)
			{
				if(mode != "Constellation View" || (this.starCount > this.targetStarCount && currentLinesI >= this.starCount-1))
					this.stars[i].show();
				if(mode == "Constellation View" && this.stars[i].checkSelected(mainCamera))
			  	{
			  		targetCamPos.x = width/2 - this.stars[i].pos.x*mainCamera.scaleValue;
			  		targetCamPos.y = height/2 - this.stars[i].pos.y*mainCamera.scaleValue;
			  	}
			  	else if(mode == "Star System" && this.stars[i].checkSelected(mainCamera))
			  	{
			  		targetCamPos.x = width/2 - width/2 * mainCamera.scaleValue;
			  		targetCamPos.y = height/2 - height/2 * mainCamera.scaleValue;
			  	}
			  	else
			  	{
			  		this.stars[i].checkSelected(mainCamera);
			  	}
			}
		}
		
		
	}
	this.select = function()
	{
		if(mode == "Galaxy View")
		{
			var mx = (1/mainCamera.scaleValue)*(mouseX) + mainCamera.leftBound;
			var my = (1/mainCamera.scaleValue)*(mouseY) + mainCamera.topBound;
			if (abs(mx - this.pos.x) <= this.w/2 && abs(my - this.pos.y) <= this.h/2) 
			{
				if(this.selected)
				{
					mainCamera.setScale(1);
				}
				this.selected = true;
				targetCamPos.x = width/2 - this.pos.x*mainCamera.scaleValue;
  				targetCamPos.y = height/2 - this.pos.y*mainCamera.scaleValue;
  				return true;
			} 
			else
			{
				this.selected = false;
				return false;
			}
			
			
		}
		else
		{
			for(var i = 0; i < this.stars.length; i++)
			{
				this.stars[i].select(mainCamera);
			}
			return false;
		}
	}

	this.keyInput = function(code)
	{
		
		if(mode == "Constellation View")
		{
			if(code == 13)
			{
				var selectedStar;
				for(var i = 0; i < this.stars.length; i++)
				{
					if(this.stars[i].selected)
					{
						selectedStar = this.stars[i];
					}
				}
				if(selectedStar != null)
				{
					for(var i = this.stars.length-1; i>= 0; i--)
					{
						if(selectedStar != this.stars[i])
						{
							this.stars.splice(i,1);
						}
					}
					selectedStar.setStarSystemView();
				}
			}
		
			
		}
		else if(code == 32 && mode == "Star System")
		{
			mainCamera.setScale(0.5);
			targetCamPos.x = width/2 - width/2*mainCamera.scaleValue;
			targetCamPos.y = height/2 - height/2*mainCamera.scaleValue;
			this.setConstellationView();
			
			mode = "Constellation View";
		}
		else
		{
			for(var i = 0; i < this.stars.length; i++)
			{
				this.stars[i].keyInput(code);
			}
		}
		
		
		
	}
	
	this.generate = function*()
	{
		while(true)
		{
			randomSeed(this.pos.x * this.pos.y + this.starCount);
			for(var i = 0; i < numStars; i++)
			{
				var divisor = 2;
				var newPos = createVector(random(-width*(boundSize/divisor), width*(boundSize/divisor)), random(-width*(boundSize/divisor), width*(boundSize/divisor)));
				var tries = 1;
				var isFree = false;
				while(!isFree && tries <= 2)
				{
					isFree = true;
					for(var j = 0; j < this.stars.length; j++)
					{
						if(p5.Vector.dist(this.stars[j].pos, newPos) < 150)
						{
							isFree = false;
						}
					}
					
					
					if(!isFree)
					{
						tries++;
						divisor--;
						newPos = createVector(random(-width*(boundSize/divisor), width*(boundSize/divisor)), random(-height*(boundSize/divisor), height*(boundSize/divisor)));
					}
				}
				if(isFree)
				{
					var s = new Star(newPos);
				//	s.sectorX = int(xS);
				//	s.sectorY = int(yS);
					this.starCount++;
					this.stars.push(s);
				}
			}
			if(this.starCount > this.targetStarCount)
			{
				console.log(this.starCount + " Stars");
				currentLinesI = 0;
			}
			yield;
		}
	}
	
	
	var lastStarCount = this.starCount;
	this.loadingScreen = function*()
	{
		var lights = [];
		randomSeed(this.pos.x * this.pos.y);
		for(var i = 0; i < 100; i++)
		{
			lights.push(createVector(random(width/3,2*width/3), random(height/3,2*height/3)));
		}
		var center = createVector(width/2,height/2);
		//randomSeed(millis);
		while(true)
		{
			pop();
			push();
			
			stroke(255);
			for(var i = 0; i < lights.length; i++)
			{
				var moveVector = p5.Vector.sub(lights[i], center);
				moveVector.normalize();
				var k = map(this.starCount + (10*currentLinesI), 0, 1200, 0, width/2) % random(width/4, width/2); //* random(0.5,2.2);
				var kk = map(lastStarCount, 0 ,1200, 0, width/2) % random(width/4, width/2); //* random(0.5,2.2);
				moveVector.mult(kk);
				lights[i] = p5.Vector.add(lights[i], moveVector);
				moveVector.normalize();
				moveVector.mult(k);
				var final = p5.Vector.add(lights[i], moveVector);
				line(lights[i].x,lights[i].y, final.x, final.y);
				lastStarCount = this.starCount + (10*currentLinesI);
			}
			pop();
			randomSeed(millis());
			yield;
		}
	}
	
	this.setConstellationView = function()
	{
		this.stars = [];
		this.lines = [];
		this.starCount = 0;
		
	}
	this.generateLines = function*()
	{
		while(currentLinesI < this.starCount-1)
		{
			var currentLinesMax = min(currentLinesI + 30, this.starCount-1); 
			for(currentLinesI; currentLinesI < currentLinesMax; currentLinesI++)
			{
				//console.log("CurrentLinesI: " + str(currentLinesI));
				var hasConnection = false;
				for(var j = 0; j < this.stars.length; j++)
				{
					if(j != currentLinesI)
					{
						if(this.stars[currentLinesI].numLines < 2 && this.stars[j].numLines < 2 && dist(this.stars[currentLinesI].pos.x, this.stars[currentLinesI].pos.y, this.stars[j].pos.x, this.stars[j].pos.y) < 300)
						{
							var l = new Line(this.stars[currentLinesI].pos.x, this.stars[currentLinesI].pos.y, this.stars[j].pos.x, this.stars[j].pos.y);
							this.lines.push(l);
							this.stars[currentLinesI].numLines++;
							this.stars[j].numLines++;
							hasConnection = true;
						}
					}
				}
				if(!hasConnection)
				{
					var minDist = 10000;
					var closestI = -1;
					for(var j = 0; j < this.stars.length; j++)
					{
						if(j != currentLinesI)
						{
							var d = dist(this.stars[currentLinesI].pos.x, this.stars[currentLinesI].pos.y, this.stars[j].pos.x, this.stars[j].pos.y)
							if(d < minDist)
							{
								closestI = j;
								minDist = d;
							}
						}
					}
					if(closestI != -1)
					{
						var l = new Line(this.stars[currentLinesI].pos.x, this.stars[currentLinesI].pos.y, this.stars[closestI].pos.x, this.stars[closestI].pos.y);
						this.lines.push(l);
						this.stars[currentLinesI].numLines++;
						this.stars[closestI].numLines++;
						hasConnection = true;
					}
				}
			}
			yield;
		}
	}
}
function Line(x1, y1, x2, y2)
{
	this.x1 = x1;
	this.x2 = x2;
	this.y1 = y1;
	this.y2 = y2;
}
