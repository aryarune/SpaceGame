function Moon(par)
{
	
	this.par = par;
	this.radius = min(par.radius / 4, random(2, 15));
	this.distance = this.par.radius + this.radius + random(35, 80);
	this.orbitw = this.distance*1.2;
	this.orbith = this.distance*0.6;
	
	this.angle = random(0, TWO_PI);
	this.speed = random(radians(1), radians(1.4)) * par.moonDirection;
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
	
	
	this.show = function()
	{
		fill(this.r, this.g, this.b, 100);
		noStroke();
		ellipse(this.pos.x, this.pos.y, this.radius*2, this.radius*2);
		
	}
	
	this.update = function(cam)
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
		
		var addedSpeed = 0;
		if(degrees(this.angle) >= 0 && degrees(this.angle) <= 180)
		{
			addedSpeed = 1.5 * (abs(cos(this.angle)) + 1);
		}
		else
		{
			addedSpeed = 3 * (abs(sin(this.angle)) + 1);
		}
		this.angle += this.speed + radians(addedSpeed)*par.moonDirection * timeScale;
		this.angle = radians(degrees(this.angle) % 360);
		this.pos.x = this.focus.x + this.orbitw * sin(this.angle);
		this.pos.y = this.focus.y + this.orbith * cos(this.angle);
		
		if (this.pos.x > cam.leftBound - this.radius && this.pos.y > cam.topBound - this.radius && this.pos.x < cam.rightBound + this.radius && this.pos.y < cam.bottomBound + this.radius) {
			this.onScreen = true;
		}
		else
			this.onScreen = false;
		
	}
	
	
	
}