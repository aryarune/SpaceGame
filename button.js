function Button(x, y, w, h, par)
{
	this.pos = createVector(x,y);
	this.w = w;
	this.h = h;
	this.label = "";
	this.par = par;
	this.hovering = false;
	this.clicked = false;
	this.listID = 0;
	
	this.show = function()
	{
		this.checkClick();
		
		pop();
		push();
		rectMode(CORNER);
		translate(0,0);
		scale(1);
		if(this.hovering)
		{
			fill(200, 200, 0, 255);
		}
		else
		{
			fill(200,200,200,255);
		}
		if(this.clicked)
		{
			fill(70);
		}
		
		stroke(0, 0, 0, 200);
		rect(this.pos.x, this.pos.y, this.w, this.h);
		
		fill(51);
		noStroke();
		textSize(10);
		textAlign(CENTER);
		text(this.label, this.pos.x + this.w/2, this.pos.y + this.h/2 + 3);
		
		
		pop();
	}
	
	this.checkClick = function()
	{
		if(mouseX >= this.pos.x && mouseX <= this.pos.x + this.w && mouseY >= this.pos.y && mouseY <= this.pos.y + this.h)
		{
			
			this.hovering = true;
			if(mouseIsPressed)
			{
				if(!this.clicked)
				{
					this.onClick();
				}
				this.clicked = true;
			}
			else
			{
				this.clicked = false;
			}
		}
		else
		{
			this.hovering = false;
			this.clicked = false;
		}
	}
	
	this.onClick = function()
	{
		
	}
	
	
}