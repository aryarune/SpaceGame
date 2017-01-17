function distantStar(pos)
{
	this.pos = pos;
	this.r = random(200, 255);
	this.g = random(100, 230);
	this.b = random(100, 230);
	this.a = random(100, 150);
	this.onScreen = true;
	this.isMoving = random(0,10);
	
	this.show = function()
	{
		if(this.onScreen)
		{
			
			strokeWeight(0.5);
			stroke(this.r, this.g, this.b, this.a);
			point(this.pos.x, this.pos.y);
			
		}
	}
	this.checkOnScreen = function(cam)
	{
		this.onScreen = true;
		// if(this.pos.x > cam.leftBound && this.pos.y > cam.topBound && this.pos.x < cam.rightBound && this.pos.y < cam.bottomBound)
		// {
		// 	this.onScreen = true;
		// }
		// else
		// {
		// 	this.onScreen = false;
		// }
	}
	
}