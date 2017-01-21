function Menu(x, y, w, h)
{
	this.pos = createVector(x,y);
	this.w = w;
	this.h = h;
	this.hidden = false;
	this.hideButton = new Button(this.pos.x + this.w/2 - 15,this.pos.y - 10,40,30, this);
	this.hideButton.label = "HIDE";
	this.hideButton.onClick = function()
	{
		this.par.hidden = !this.par.hidden;
		if(this.par.hidden)
		{
			this.label = "SHOW";
			this.pos.y += this.par.h-20;
		}
		else
		{
			this.label = "HIDE";
			this.pos.y = this.par.pos.y - 10;
		}
		
	}
	
	
	
	this.buttons = [];
	
	this.addButton = function(b)
	{
		this.buttons.push(b);
	}
	
	this.show = function()
	{
		
		pop();
		push();
		if(!this.hidden)
		{
			rectMode(CORNER);
			translate(0,0);
			scale(1);
			fill(255,255,255,50);
			stroke(255, 255, 255, 200);
			rect(this.pos.x, this.pos.y, this.w, this.h);
			
			
		}
		pop();
		if(!this.hidden)
		{
			for(var i = 0; i < this.buttons.length; i++)
			{
				this.buttons[i].show();
			}
		}
		this.hideButton.show();
	}
	
	
	
	
}