function Camera()
{
	this.tVal = createVector(0, 0);
	this.position = createVector(this.tVal.x,this.tVal.y);
	this.scaleValue = 1;
	this.leftBound = -this.tVal.x * 1/this.scaleValue;
	this.rightBound = this.leftBound + width*this.scaleValue;
	this.topBound = -this.tVal.y * 1/this.scaleValue;
	this.bottomBound = this.topBound + height*this.scaleValue;
	
	this.show = function()
	{
		noFill();
		strokeWeight(8);
		stroke(255, 255, 0, 255);
		rect(this.leftBound, this.topBound, this.rightBound-this.leftBound, this.bottomBound - this.topBound);
	}
	
	this.setScale = function(s)
	{
		
		if(s > 0)
		{
			var xCenter = -(-targetCamPos.x/this.scaleValue + width/(2*this.scaleValue));
			var yCenter = -(-targetCamPos.y/this.scaleValue + height/(2*this.scaleValue));
			targetCamPos.x = s*(xCenter + width/(2*s));
			targetCamPos.y = s*(yCenter + height/(2*s));
			this.scaleValue = s;
			this.leftBound = -this.tVal.x*(1/this.scaleValue);
			this.rightBound = this.leftBound + width*(1/this.scaleValue);
			this.topBound = -this.tVal.y*(1/this.scaleValue);
			this.bottomBound = this.topBound + height*(1/this.scaleValue);
			
			//this.tVal.x = targetCamPos.x;
			//this.tVal.y = targetCamPos.y;
			
			//this.updatePosition();
		}
	}
	this.translatePosition = function(p)
	{
		//this.updatePosition();
		this.tVal.x = p.x;
		this.tVal.y = p.y;
		this.leftBound = -this.tVal.x * 1/this.scaleValue;
		this.rightBound = this.leftBound + width*(1/this.scaleValue);
		this.topBound = -this.tVal.y * 1/this.scaleValue;
		this.bottomBound = this.topBound + height*(1/this.scaleValue);
	}
	this.updatePosition = function()
	{
		this.position.x = this.tVal.x + (width/2)*(this.scaleValue);
		this.position.y = this.tVal.y + height/2*(this.scaleValue);
		//console.log(this.position.x);
	}
}