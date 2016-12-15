function Planet(par, id) {
	this.par = par;
	this.id = id;
	this.radius = min(this.par.radius - 10, random(18, 50));
	this.distance = this.par.radius*2.5 + this.radius + (400 * id) + random(130, 300);
	this.angle = random(0, TWO_PI);
	this.speed = random(radians(0.05), radians(0.1));
	this.pos = createVector(this.par.pos.x + this.distance * sin(this.angle), this.par.pos.y - this.distance * cos(this.angle));
	
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
	
	this.planetType = int(random(3)) //0 = rocky with atmosphere, 1 = gas planet with no rings, 2 = gas planet with rings
	if(this.planetType === 0)
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
			
	}
	this.name = par.name;
	this.name += ":P";
	this.name += id;
	this.name += "-";
	this.name += int(this.distance);
	if(this.planetType === 0)
	{
		this.name+="R";
	}
	else
	{
		this.name+="G";
	}
	if(this.hasRing)
	{
		this.name+="r";
	}
	
	

	var numMoons = int(random(0, 4));
	for (var i = 0; i < numMoons; i++) {
		var moon = new Moon(this);
		this.moons.push(moon);
	}
	
		
	this.show = function() {
		
		if(mode === "Star System")
		{
			noFill();
			strokeWeight(1);
			stroke(255,255,255,100);
			ellipse(this.par.pos.x, this.par.pos.y, this.distance * 2, this.distance * 2);
			
			if(this.onScreen)
			{
				if(this.selected)
				{
					fill(255);
					textSize(12);
					textAlign(CENTER);
					text(this.name, this.pos.x, this.pos.y + this.radius + 22);
				}
				
				if(this.planetType === 0)
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
		else if(mode === "Galaxy")
		{
			noFill();
			strokeWeight(1);
			stroke(255,255,255,100);
			ellipse(this.par.pos.x, this.par.pos.y, this.distance / 2, this.distance / 2);
			if(this.onScreen)
			{
				fill(this.r, this.g, this.b, this.a);
				if (this.selected) {
					stroke(255);
				} else {
					stroke(0);
				}
				ellipse(this.pos.x, this.pos.y, this.radius/2, this.radius/2);
	
			}
		}
		
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
		}
	}

	this.checkSelected = function(cam) 
	{
		this.angle += this.speed;
		this.pos.x = this.par.pos.x + this.distance * sin(this.angle);
		this.pos.y = this.par.pos.y - this.distance * cos(this.angle);
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
		else
		{
			this.selected = false;
		}
		
		return this.selected;
	}



}