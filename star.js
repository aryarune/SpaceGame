function Star(pos)
{
	this.pos = pos;
	this.radius = random(120, 200);
	this.r = random(120, 250);
	this.g = random(120, 250);
	this.b = random(120, 250);
	this.a = 255;
	this.onScreen = true;
	this.selected = false;
	this.planets = [];

	var numMoons = int(random(4, 9));
	for (var i = 0; i < numMoons; i++) {
		var planet = new Planet(this, i);
		this.planets.push(planet);
	}
	this.select = function(cam)
	{
		var mx = (1/cam.scaleValue)*(mouseX) + cam.leftBound;
		var my = (1/cam.scaleValue)*(mouseY) + cam.topBound;
		
		if (abs(mx - this.pos.x) < this.radius && abs(my - this.pos.y) < this.radius) 
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
		}
		for (var i = 0; i < this.planets.length; i++) {
				this.planets[i].show();
		}
	}

	this.checkSelected = function(cam) {
		if (this.pos.x > cam.leftBound - this.radius*2.5 && this.pos.y > cam.topBound - this.radius*2.5 && this.pos.x < cam.rightBound + this.radius*2.5 && this.pos.y < cam.bottomBound + this.radius*2.5) {
			this.onScreen = true;
		} 
		else 
		{
			this.onScreen = false;
		}
		
		for (var i = 0; i < this.planets.length; i++)
		{
			if(this.planets[i].checkSelected(mainCamera))
		  	{
		  		targetCamPos.x = width/2 - this.planets[i].pos.x*mainCamera.scaleValue;
  				targetCamPos.y = height/2 - this.planets[i].pos.y*mainCamera.scaleValue;
		  	}
		}
		
		return this.selected;
	}
	
	
	
	
	
}