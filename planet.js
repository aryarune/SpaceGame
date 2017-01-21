function Planet(par, id) {
	this.par = par;
	this.id = id;
	this.radius = min(this.par.radius - 10, random(18, 100));
	this.distance = this.par.radius*2.5 + this.radius + (800 * (id+1)) + random(130, 300);
	this.orbitw = this.distance*1.8;
	this.orbith = this.distance*1.2;
	this.angle = random(0, TWO_PI);
	this.speed = radians(0.1 / (id+1));
	
	this.massPower = 24;
	
	
	this.focus = createVector(width/2, height/2);
	this.pos = createVector(this.focus.x + this.distance * sin(this.angle), this.focus.y - this.distance * cos(this.angle));
	this.focusDelta = this.orbitw * 0.4;
	this.focus.x += this.focusDelta;
	
	this.onScreen = true;
	this.selected = false;
	this.moons = [];
	this.hasRing = false;
	this.ring = null;
	this.moonDirection = random(-1,1);
	if(this.moonDirection === 0)
	{
		this.moonDirection = 1;
	}
	this.density = random(20000,40000) - this.distance;
	this.planetType = int(random(5)) //0 = rocky with atmosphere, 1 = gas planet with no rings, 2 = gas planet with rings, 3 = gas giant, 4 = dwarf planet
	if(this.planetType == 0 || this.planetType == 4)
	{
		this.r = random(20, 150);
		this.g = random(10, 100);
		this.b = random(20, 150);
		
		
	}
	else
	{
		var rgb = int(random(3));
		if(rgb === 0)
		{
			this.r = random(150,200);
			this.g = random(0,50);
			this.b = random(0,50);
		}
		else if(rgb == 1)
		{
			this.r = random(0,50);
			this.g = random(150,200);
			this.b = random(0,50);
		}
		else if(rgb == 2)
		{
			this.r = random(0,50);
			this.g = random(0,50);
			this.b = random(150,200);
		}
		
		if(this.planetType == 2)
		{
			this.hasRing = true;
			this.ring = new Ring(this);
		}
		if(this.planetType == 3)
		{
			this.radius = min(this.radius * random(5,10), this.par.radius/5);
		}
		if(this.planetType == 4)
		{
			this.radius = max(this.radius / random(15.0,20.0), 2);
		}
	}
	this.name = "";
	this.name += "P";
	this.name += id;
	this.name += "-";
	//this.name += int(this.distance);
	if(this.planetType === 0 || this.planetType == 4)
	{
		this.name+="R";
	}
	else
	{
		this.name+="G";
	}
	if(this.planetType == 3)
	{
		this.name+="g";
	}
	if(this.planetType == 4)
	{
		this.name+="d";
	}
	if(this.hasRing)
	{
		this.name+="r";
	}
	var volume = 4/3 * 3.1415 * pow(this.radius*80000,3);
	this.mass = volume * this.density / pow(10,24);
	

	var numMoons = int(random(0, 40));
	for (var i = 0; i < numMoons; i++) {
		var moon = new Moon(this,i);
		this.moons.push(moon);
	}
	
	this.lastSelectedTimer = 0.1;
		
	this.show = function() {
		
		if(mode === "Star System")
		{
			noFill();
			strokeWeight(5);
			stroke(255,255,255,255);
			if(this.selected)
			{
				stroke(255,255,0,255);
			}
			ellipse(this.focus.x, this.focus.y, this.orbitw*2, this.orbith*2);
			strokeWeight(1);
			if(this.onScreen)
			{
				if(this.selected)
				{
					fill(255);
					textSize(12);
					textAlign(CENTER);
					text(this.name, this.pos.x, this.pos.y + this.radius + 22);
				}
				
				if(this.planetType === 0 || this.planetType == 4)
				{
					if (this.selected) {
					stroke(255);
					} else {
						noStroke();
					}
					fill(this.r, this.g, this.b, 50);
					ellipse(this.pos.x, this.pos.y, this.radius*2, this.radius*2);
					noStroke();
					fill(this.r, this.g, this.b, 255);
					ellipse(this.pos.x, this.pos.y, this.radius*1.3, this.radius*1.3);
				}
				else
				{
					if(this.hasRing)
					{
						this.ring.show();
					}
					if (this.selected) {
					stroke(255);
					} else {
						noStroke();
					}
					fill(this.r, this.g, this.b, 50);
					var dR = random(-0.02,0.02);
					ellipse(this.pos.x, this.pos.y, this.radius*2, this.radius*2);
										
					noStroke();
					fill(this.r, this.g, this.b, 80);
					ellipse(this.pos.x, this.pos.y, this.radius*(1.5 + dR*2), this.radius*(1.5 + dR*2));
					
					fill(this.r, this.g, this.b, 80);
					ellipse(this.pos.x, this.pos.y, this.radius*(1 + dR), this.radius*(1+dR));
					fill(this.r, this.g, this.b, 255);
					ellipse(this.pos.x, this.pos.y, this.radius*0.8, this.radius*0.8);
					
				}
			
			}
			
			for (var i = 0; i < this.moons.length; i++) {
				if(this.moons[i].onScreen)
					this.moons[i].show();
			}
		}
		else if(mode === "Planetary View")
		{
			if(this.onScreen)
			{
				//if(this.selected)
				//{
					fill(255);
					textSize(12);
					textAlign(CENTER);
					text(this.name, width/2, height/2 + this.radius + 22);
					var massLabel = "Mass: " + str(this.mass).substring(0,8) + " x 10^" + str(this.massPower) + " kg";
					text(massLabel, width/2, height/2 + this.radius + 42);
					
				//}
				
				if(this.planetType === 0 || this.planetType == 4)
				{
					if (this.selected) {
					stroke(255);
					} else {
						noStroke();
					}
					fill(this.r, this.g, this.b, 50);
					ellipse(width/2, height/2, this.radius*2, this.radius*2);
					noStroke();
					fill(this.r, this.g, this.b, 255);
					ellipse(width/2, height/2, this.radius*1.2, this.radius*1.2);
				}
				else
				{
					if(this.hasRing)
					{
						this.ring.show();
					}
					if (this.selected) {
					stroke(255);
					} else {
						noStroke();
					}
					fill(this.r, this.g, this.b, 50);
					var dR = random(-0.02,0.02);
					ellipse(width/2, height/2, this.radius*2, this.radius*2);
										
					noStroke();
					fill(this.r, this.g, this.b, 80);
					ellipse(width/2, height/2, this.radius*(1.5 + dR*3), this.radius*(1.5 + dR*3));
					
					fill(this.r, this.g, this.b, 80);
					ellipse(width/2, height/2, this.radius*(1.2 + dR), this.radius*(1.2 + dR));
					fill(this.r, this.g, this.b, 255);
					ellipse(width/2, height/2, this.radius*0.5, this.radius*0.5);
					
				}
			
			}
			for (var i = 0; i < this.moons.length; i++) {
				if(this.moons[i].onScreen)
					this.moons[i].show();
			}
		}
		
		if(this.lastSelectedTimer >= 0)
		{
			this.lastSelectedTimer -= 0.01;
		}
		
	}

	this.select = function(cam)
	{
		var mx = (1/cam.scaleValue)*(mouseX) + cam.leftBound;
		var my = (1/cam.scaleValue)*(mouseY) + cam.topBound;
		if (mode == "Star System" &&abs(mx - this.pos.x) < this.radius && abs(my - this.pos.y) < this.radius) 
		{
			console.log(this.mass);
			if(this.selected)
			{
				cam.setScale(width/(this.radius*15));
			}
			this.selected = true;
		} 
		else if (mode == "Planetary View" && abs(mx - width/2) < this.radius && abs(my - height/2) < this.radius) 
		{
			// if(this.selected)
			// {
			// 	cam.setScale(width/(this.radius*15));
			// }
			this.selected = true;
			targetCamPos = createVector(width/2, height/2);
		} 
		else if(this.lastSelectedTimer <= 0)
		{
			this.selected = false;
		}
		
		
		
	}
	this.setPlanetaryView = function()
	{
		console.log(this.moons.length);
		for(var i = 0; i < this.moons.length; i++)
		{
			this.moons[i].setPlanetaryView();
		}
		
		
	}
	this.checkSelected = function(cam) 
	{
		this.focus.x = width/2;
		this.focus.y = height/2;
		
		this.focus.x += this.focusDelta;
		
		
		this.angle += this.speed * timeScale;
		this.angle = radians(degrees(this.angle) % 360);
		this.pos.x = this.focus.x + this.orbitw * sin(this.angle);
		this.pos.y = this.focus.y + this.orbith * cos(this.angle);
		if(mode === "Star System")
		{
			if (this.pos.x > cam.leftBound - this.radius && this.pos.y > cam.topBound - this.radius && this.pos.x < cam.rightBound + this.radius && this.pos.y < cam.bottomBound + this.radius) {
	
				this.onScreen = true;
				
			} 
			else 
			{
				this.onScreen = false;
			}
			
				for (var i = 0; i < this.moons.length; i++)
				{
					this.moons[i].update(cam);
				}
		}
		else if(mode === "Planetary View")
		{
			if (width/2 > cam.leftBound - this.radius*4 && height/2 > cam.topBound - this.radius*4 && width/2 < cam.rightBound + this.radius*4 && height/2 < cam.bottomBound + this.radius*4) {
	
				this.onScreen = true;
				
			} 
			else 
			{
				this.onScreen = false;
			}
			
			for (var i = 0; i < this.moons.length; i++)
			{
				this.moons[i].update(cam);
			}
		}
		else
		{
			this.selected = false;
		}
		
		return this.selected;
	}
}