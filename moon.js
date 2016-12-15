function Moon(par)
{
	
	this.par = par;
	this.radius = min(par.radius - 10, random(4, 15));
	this.distance = this.par.radius + this.radius + random(5, 20);
	this.angle = random(0, TWO_PI);
	this.speed = random(PI/128, PI/64);
	this.pos = createVector(this.par.pos.x + this.distance * sin(this.angle), this.par.pos.y - this.distance * cos(this.angle));
	
	this.r = random(150, 250);
	this.g = random(150, 250);
	this.b = random(150, 250);
	this.a = 255;
	
	this.onScreen = true;
	
	
	this.show = function()
	{
		fill(this.r, this.g, this.b, this.a);
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