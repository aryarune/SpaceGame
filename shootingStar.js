function shootingStar(pos)
{
	this.pos = pos;
	this.r = random(200, 255);
	this.g = random(0, 130);
	this.b = random(0, 130);
	this.a = random(170, 255);
	
	this.isMoving = random(0,10);
	
	this.angle = random(0, TWO_PI);
	this.len = 1;
	this.maxLen = random(10, 40);
	this.time = 0;
	this.maxTime = random(20, 50);
	this.show = function()
	{
		stroke(this.r, this.g, this.b, this.a);
		line(this.pos.x, this.pos.y, this.pos.x - (this.len * sin(this.angle)), this.pos.y - (this.len * cos(this.angle)));
	}
	
	this.update = function()
	{
		this.pos.x += 3 * sin(this.angle);
		this.pos.y += 3 * cos(this.angle);
		if(this.time < this.maxTime && this.len < this.maxLen)
		{
			this.len++;
		}
		else if(this.time >= this.maxTime && this.len > 0)
		{
			this.len--;
		}
		
		this.time++;
		
	}
	
}