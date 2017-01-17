function Star(pos)
{
	this.numLines = 0;
	this.pos = pos;
	this.radius = random(80, 600);
	this.r = min(random(0, 250) * 7, 255);
	this.g = min(random(0, 250) * 7, 255);
	this.b = min(random(0, 250) * 7, 255);
	this.a = 255;
	this.onScreen = true;
	this.selected = false;
	this.planets = [];
	this.name = letters[int(random(26))];
	this.name += int(random(2000));
	this.sectorX = 0;
	this.sectorY = 0;
	// randomSeed(this.pos.x * this.pos.y);
	// var numPlanets = 10;//int(random(3, 21));
	// for (var i = 0; i < numPlanets; i++) {
	// 	var planet = new Planet(this, i);
	// 	this.planets.push(planet);
	// }
	this.select = function(cam)
	{
		var mx = (1/cam.scaleValue)*(mouseX) + cam.leftBound;
		var my = (1/cam.scaleValue)*(mouseY) + cam.topBound;
		
		if (mode == "Constellation View" && abs(mx - this.pos.x) < this.radius*0.1 && abs(my - this.pos.y) < this.radius*0.1) 
		{
			if(this.selected)
			{
				cam.setScale(1);
			}
			this.selected = true;
		} 
		else if (mode == "Star System" && abs(mx - width/2) < this.radius && abs(my - height/2) < this.radius) 
		{
			if(this.selected)
			{
				cam.setScale(1);
			}
			this.selected = true;
		} 
		else
		{
			this.selected = false;
			for(var i = 0; i < this.planets.length; i++)
			{
				this.planets[i].select(cam);
			}
		}
	}

	this.show = function() {
		if(mode === "Star System")
		{
			
			if(this.onScreen)
			{
				if(this.selected)
				{
					noStroke();
					fill(255,255,255,100);
					rectMode(CENTER)
					rect(width/2, height/2 + this.radius+31, 18*this.name.length, 23);
					
					fill(255);
					noStroke();
					textSize(30);
					textAlign(CENTER);
					text(this.name, width/2, height/2 + this.radius + 42);
					
					
					
				}
				
				fill(this.r, this.g, this.b, 15);
				noStroke();
				ellipse(width/2, height/2, this.radius*5, this.radius*5);
				
				fill(this.r, this.g, this.b, 20);
				noStroke();
				ellipse(width/2, height/2, this.radius*3, this.radius*3);
				
				fill(this.r, this.g, this.b, 40);
				noStroke();
				ellipse(width/2, height/2, this.radius*2.5, this.radius*2.5);
				
				fill(this.r, this.g, this.b, this.a);
				if (this.selected) {
					stroke(255);
					strokeWeight(4);
				} else {
					noStroke();
				}
				ellipse(width/2, height/2, this.radius*2, this.radius*2);
				
			}
			for (var i = 0; i < this.planets.length; i++) {
				this.planets[i].show();
			}
		}
		else if(mode == "Planetary View")
		{
			for (var i = 0; i < this.planets.length; i++) {
				this.planets[i].show();
			}
		}
		else if(mode == "Constellation View")
		{
			if(this.onScreen)
			{
				if(this.selected)
				{
					noStroke();
					fill(255,255,255,100);
					rectMode(CENTER)
					rect(this.pos.x, this.pos.y + this.radius*0.2, 18*this.name.length, 23);
					
					fill(255);
					noStroke();
					textSize(25);
					textAlign(CENTER);
					text(this.name, this.pos.x, this.pos.y + this.radius*0.2 + 8);
					
					
					
				}
				if (this.selected) {
					stroke(255);
					strokeWeight(4);
				} else {
					noStroke();
				}
				// fill(this.r, this.g, this.b, 15);
				// noStroke();
				// ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
			
				// fill(this.r, this.g, this.b, 20);
			
				// ellipse(this.pos.x, this.pos.y, this.radius*0.8, this.radius*0.8);
				
				// fill(this.r, this.g, this.b, 40);
			
				// ellipse(this.pos.x, this.pos.y, this.radius/2, this.radius/2);
				
				fill(this.r, this.g, this.b, this.a);
				
				ellipse(this.pos.x, this.pos.y, this.radius*0.1, this.radius*0.1);
				
			}
		}
		
	}

	this.checkSelected = function(cam) {
		if(mode == "Star System")
		{
			if (width/2 > cam.leftBound - this.radius*2.5 && height/2 > cam.topBound - this.radius*2.5 && width/2 < cam.rightBound + this.radius*2.5 && height/2 < cam.bottomBound + this.radius*2.5) {
				this.onScreen = true;
			} 
			else 
			{
				this.onScreen = false;
			}
		}
		else if(mode == "Constellation View")
		{
			if (this.pos.x > cam.leftBound - this.radius*0.2 && this.pos.y > cam.topBound - this.radius*0.2 && this.pos.x < cam.rightBound + this.radius*0.2 && this.pos.y < cam.bottomBound + this.radius*0.2) {
				this.onScreen = true;
			} 
			else 
			{
				this.onScreen = false;
			}
		}
		for (var i = 0; i < this.planets.length; i++)
		{
			if(mode == "Star System" &&this.planets[i].checkSelected(mainCamera))
		  	{
		  		targetCamPos.x = width/2 - this.planets[i].pos.x*mainCamera.scaleValue;
  				targetCamPos.y = height/2 - this.planets[i].pos.y*mainCamera.scaleValue;
		  	}
		  	if(mode == "Planetary View" && this.planets[i].checkSelected(mainCamera))
		  	{
		  		targetCamPos.x = width/2 - width/2*mainCamera.scaleValue;
  				targetCamPos.y = height/2 - height/2*mainCamera.scaleValue;
		  	}
		}
		
		return this.selected;
	}
	
	this.keyInput = function(code)
	{
		
		var selectedPlanet = null;
		if(code == 13)
		{
			
			for(var i = 0; i < this.planets.length; i++)
			{
				if(this.planets[i].selected)
				{
					console.log(code);
					selectedPlanet = this.planets[i];
				}
			}
			if(selectedPlanet != null)
			{
				for(var i = this.planets.length-1; i >= 0; i--)
				{
					if(this.planets[i] != selectedPlanet)
					{
						this.planets.splice(i, 1);
					}
				}
				
				selectedPlanet.setPlanetaryView();
				mainCamera.setScale(2);
				mode = "Planetary View";
			}
		}
		
		if(code == 32 && mode == "Planetary View")
		{
			this.setStarSystemView();
		}
		
	}
	
	
	this.setStarSystemView = function()
	{
		selectedPlanet = null;
		this.planets = [];
		mainCamera.setScale(0.5);
		targetCamPos.x = width/2 - width/2*mainCamera.scaleValue;
		targetCamPos.y = height/2 - height/2*mainCamera.scaleValue;
		randomSeed(this.pos.x * this.pos.y);
		var numMoons = 10;//int(random(3, 21));
		for (var i = 0; i < numMoons; i++) {
			var planet = new Planet(this, i);
			this.planets.push(planet);
		}
		
		mode = "Star System";
	}
}