function Constellation()
{
	this.stars = [];
	this.lines = [];
	var numStars = 300;
	this.starCount = 0;
	this.pos = createVector(random(-width,width), random(-height/height));
	this.xSector = 0;
	this.ySector = 0;
	this.curveVertices = [];
	this.w = random(250,500);
	this.h = random(250,500);
	this.show = function()
	{
		if(mode == "Galaxy View")
		{
			fill(255,255,255, 10);
			noStroke();
			rect(this.pos.x-this.w/2, this.pos.y-this.h/2, this.w,this.h, 30);
			
			randomSeed(this.pos.x * this.pos.y);
			for(var i = 0; i < this.w/20 + this.h/20; i++)
			{
				fill(random(200,255), random(200,255), random(200,255), random(220,255));
				var sizeOfStar = random(2,11);
				ellipse(random(this.pos.x-this.w/2,this.pos.x+this.w/2), random(this.pos.y-this.h/2,this.pos.y+this.h/2), sizeOfStar, sizeOfStar);
			}
		}
		if(mode == "Constellation View")
		{
			stroke(255, 255, 255, 100);
			strokeWeight(2);
			for(var i = 0; i < this.lines.length; i++)
			{
				line(this.lines[i].x1, this.lines[i].y1, this.lines[i].x2, this.lines[i].y2);
			}
		}
		if(mode == "Constellation View" || mode == "Star System" || mode == "Planetary View")
		{
			
			for(var i = 0; i < this.stars.length; i++)
			{
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
		for(var i = 0; i < this.stars.length; i++)
		{
			this.stars[i].select(mainCamera);
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
			else if(code == 32)
			{
				selectedStar = null;
				this.stars = [];
				this.lines = [];
				
				mainCamera.setScale(0.5);
				targetCamPos.x = width/2 - width/2*mainCamera.scaleValue;
				targetCamPos.y = height/2 - height/2*mainCamera.scaleValue;
				
				
				mode = "Galaxy View";
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
	
	
	
	this.generateSector = function(xS, yS)
	{
		randomSeed((this.pos.x + xS) * (this.pos.y + yS));
		for(var i = 0; i < numStars; i++)
		{
			var newPos = createVector(random(-2 * width + (5 * width * xS), 3*width+ 5*width*xS), random(-2 * height + (5 * height * yS), 3*height+ 5*height*yS));
			var tries = 1;
			var isFree = false;
			while(!isFree && tries < 2)
			{
				isFree = true;
				for(var j = 0; j < this.stars.length; j++)
				{
					if(p5.Vector.dist(this.stars[j].pos, newPos) < 100)
					{
						isFree = false;
					}
				}
				
				
				if(!isFree)
				{
					tries++;
					newPos = createVector(random(-2 * width + (5 * width * xS), 3*width+ 5*width*xS), random(-2 * height + (5 * height * yS), 3*height+ 5*height*yS));
				}
			}
			if(isFree)
			{
				var s = new Star(newPos);
				s.sectorX = int(xS);
				s.sectorY = int(yS);
				this.starCount++;
				this.stars.push(s);
			}
		}
		
		
	}
	this.setConstellationView = function()
	{
		this.stars = [];
		this.lines = [];
		this.generateSector(0,0); //center
		this.generateSector(-1,0); //center-left1
		this.generateSector(1,0); //center-right1
		
		this.generateSector(0,1); //down1-center
		this.generateSector(-1,1); //down1-left1
		this.generateSector(1,1); //down1-right1
		
		this.generateSector(0,2); //down2-center
		this.generateSector(-1,2); //down2-left1
		this.generateSector(1,2); //down2-right1
		
		this.generateSector(0,-1); //up1-center
		this.generateSector(-1,-1); //up1-left1
		this.generateSector(1,-1); //up1-right1
		console.log(this.starCount + " Stars");
		
		this.generateLines();
	}
	this.generateLines = function()
	{
		
		this.lines = [];
		for(var i = 0; i < this.stars.length; i++)
		{
			var hasConnection = false;
			for(var j = 0; j < this.stars.length; j++)
			{
				if(j != i)
				{
					if(this.stars[i].numLines < 2 && this.stars[j].numLines < 2 && dist(this.stars[i].pos.x, this.stars[i].pos.y, this.stars[j].pos.x, this.stars[j].pos.y) < 300)
					{
						var l = new Line(this.stars[i].pos.x, this.stars[i].pos.y, this.stars[j].pos.x, this.stars[j].pos.y);
						this.lines.push(l);
						this.stars[i].numLines++;
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
					if(j != i)
					{
						var d = dist(this.stars[i].pos.x, this.stars[i].pos.y, this.stars[j].pos.x, this.stars[j].pos.y)
						if(d < minDist)
						{
							closestI = j;
							minDist = d;
						}
					}
				}
				if(closestI != -1)
				{
					var l = new Line(this.stars[i].pos.x, this.stars[i].pos.y, this.stars[closestI].pos.x, this.stars[closestI].pos.y);
					this.lines.push(l);
					this.stars[i].numLines++;
					this.stars[closestI].numLines++;
					hasConnection = true;
				}
			}
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
