function Ring(par)
{
	this.par = par;
	this.angle = radians(0);
	this.w = random(this.par.radius*1.6,this.par.radius*2.8);
	this.h = random(this.par.radius * 0.3, this.par.radius * 0.8);
	this.speed = random(2,6);
	this.r = this.par.r + this.par.r*random(-0.4, 0.4);
	this.g = this.par.g + this.par.g*random(-0.4,0.4);
	this.b = this.par.b + this.par.b*random(-0.4,0.4);
	
	this.show = function()
	{
		noFill();
		stroke(this.r, this.g, this.b, 200);
		strokeWeight(2);
		
		
		ellipse(this.par.pos.x,this.par.pos.y, this.w, this.h);
		
		
		
		this.angle += radians(this.speed);
		this.angle = this.angle % radians(360);
	}
	
	
	
}