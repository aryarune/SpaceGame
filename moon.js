function Moon(par, id)
{
	this.id = id;
	this.par = par;
	this.radius = min(par.radius / 12, random(0.05, 8));
	this.distance = this.par.radius + this.radius + 8 + id*3 + random(-1.0, 1.0);
	this.orbitw = this.distance*1.6;
	this.orbith = this.distance*1;
	
	this.angle = random(0, TWO_PI);
	this.speed = par.speed * (10/id+1) * this.par.moonDirection;
	this.pos = createVector(this.par.pos.x + this.distance * sin(this.angle), this.par.pos.y - this.distance * cos(this.angle));
	this.focus = createVector(this.par.pos.x, this.par.pos.y);
	
	
	this.maxDistance = dist(this.focus.x, this.focus.y, this.focus.x + this.orbitw * sin(radians(90)), this.focus.y + this.orbith * cos(radians(90)));
	if(this.orbitw > this.orbith)
	{
		this.focusDelta = this.orbitw * 0.4;
		this.focus.x += this.focusDelta;
	}
	else
	{
		this.focusDelta = this.orbith * 0.4;
		this.focus.y += this.focusDelta;
	}
	
	this.r = random(150, 250);
	this.g = random(150, 250);
	this.b = random(150, 250);

	
	this.onScreen = true;
	
	this.setPlanetaryView = function()
	{
		this.orbitw = this.distance*1.6;
		this.orbith = this.distance*1;
		if(this.orbitw > this.orbith)
		{
			this.focusDelta = this.orbitw * 0.4;
			this.focus.x += this.focusDelta;
		}
		else
		{
			this.focusDelta = this.orbith * 0.4;
			this.focus.y += this.focusDelta;
		}
	}
	this.show = function()
	{
		
		
		noStroke();
		if(mode == "Star System")
		{
			fill(this.r, this.g, this.b, 100);
			ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
		}
		else if(mode == "Planetary View")
		{
			fill(this.r, this.g, this.b, 255);
			ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
		}
	}
	
	this.update = function(cam)
	{
		var multiplier = 1;
		if(mode == "Star System")
		{
			this.focus.x = this.par.pos.x;
			this.focus.y = this.par.pos.y;
			if(this.orbitw > this.orbith)
			{
				this.focus.x += this.focusDelta;
			}
			else
			{
				this.focus.y += this.focusDelta;
			}
		}
		else if(mode == "Planetary View")
		{
			multiplier = 1;
			this.focus.x = width/2;
			this.focus.y = height/2;
			if(this.orbitw > this.orbith)
			{
				this.focusDelta = this.orbitw * 0.4;
				this.focus.x += this.focusDelta;
			}
			else
			{
				this.focusDelta = this.orbith * 0.4;
				this.focus.y += this.focusDelta;
			}
		}
		var addedSpeed = 0;
		if(degrees(this.angle) >= 0 && degrees(this.angle) <= 180)
		{
			addedSpeed = 1.5 * (abs(cos(this.angle)) + 1);
		}
		else
		{
			addedSpeed = 3 * (abs(sin(this.angle)) + 1);
		}
		this.angle += max(radians(0.05), this.speed + radians(addedSpeed)*this.par.moonDirection) * timeScale;
		this.angle = radians(degrees(this.angle) % 360);
		
		
		this.pos.x = this.focus.x + this.orbitw * multiplier * sin(this.angle);
		this.pos.y = this.focus.y + this.orbith * multiplier * cos(this.angle);
		
		if (this.pos.x > cam.leftBound - this.radius && this.pos.y > cam.topBound - this.radius && this.pos.x < cam.rightBound + this.radius && this.pos.y < cam.bottomBound + this.radius) {
			this.onScreen = true;
		}
		else
			this.onScreen = false;
	}
}