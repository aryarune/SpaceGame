function Galaxy()
{
	this.pos = createVector(random(width), random(height));
	this.clusters = [];
	this.numClusters = 3000;
	
	this.selectedCluster = null;
	this.generateClusters = function()
	{
		this.clusters = [];
		var total = 0;
		randomSeed(this.pos.x * this.pos.y);
		for(var i = 0; i < this.numClusters; i++)
		{
			var c = new Constellation();
			var isFree = false;
			var tries = 0;
			while(!isFree && tries < 10)
			{
				c.pos.x = random(-width*6, width*6);
				c.pos.y = random(-height*6, height*6);
				isFree = true;
				for(var j = 0; j < this.clusters.length; j++)
				{
					var r =0;
					if(c.w > c.h)
						r = c.w;
					else
						r = c.h;
						
					if(this.clusters[j].w > this.clusters[j].h)
						r += this.clusters[j].w;
					else
						r += this.clusters[j].h;
					if(c.pos.dist(this.clusters[j].pos) < r/2)
					{
						isFree = false;
						break;
					}
				}
				tries++;
			}
			if(isFree)
			{
				this.clusters.push(c);
				total++;
			}
		}
		console.log(total);
	}
	this.show = function()
	{
		for(var i = 0; i < this.clusters.length; i++)
		{
			this.clusters[i].show();
		}
	}
	this.keyInput = function(code)
	{
		if(this.selectedCluster != null)
		{
			
			if(mode == "Galaxy View" && code == 13)
			{
				mainCamera.setScale(0.5);
				this.selectedCluster.setConstellationView();
				mode = "Constellation View";
				for(var i = this.clusters.length-1; i >= 0 ; i--)
				{
					if(this.selectedCluster != this.clusters[i])
					{
						this.clusters.splice(i,1);
					}
				}
				
			}	
			else if(mode == "Constellation View" && code == 32)
			{
				mainCamera.setScale(0.5);
				targetCamPos.x = width/2 - width/2*mainCamera.scaleValue;
				targetCamPos.y = height/2 - height/2*mainCamera.scaleValue;
				
				
				this.generateClusters();
				mode = "Galaxy View";
			}
			else
				this.selectedCluster.keyInput(code);
		}
	}
	
	this.select = function()
	{
		var selected = false;
		if(mode == "Galaxy View")
		{
			for(var i = 0; i < this.clusters.length; i++)
			{
				if(this.clusters[i].select())
				{
					this.selectedCluster = this.clusters[i];
					selected = true;
				}
			}
			if(!selected)
			{
				this.selectedCluster = null;
			}
		}
		else
		{
			this.selectedCluster.select();
		}
		
	}
	
}