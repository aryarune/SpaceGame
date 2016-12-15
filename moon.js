function Moon(par)
{
	
	this.par = par;
	this.radius = min(par.radius / 4, random(2, 15));
	this.distance = this.par.radius + this.radius + random(35, 80);
	this.angle = random(0, TWO_PI);
	this.speed = random(radians(0.5), radians(4)) * par.moonDirection;
	this.pos = createVector(this.par.pos.x + this.distance * sin(this.angle), this.par.pos.y - this.distance * cos(this.angle));
	
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
		this.angle += this.speed;
		this.pos.x = this.par.pos.x + this.distance * sin(this.angle);
		this.pos.y = this.par.pos.y - this.distance * cos(this.angle);
		
		if (this.pos.x > cam.leftBound - this.radius && this.pos.y > cam.topBound - this.radius && this.pos.x < cam.rightBound + this.radius && this.pos.y < cam.bottomBound + this.radius) {
			this.onScreen = true;
		}
		else
			this.onScreen = false;
		
	}
	
	
	
}