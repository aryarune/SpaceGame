function Galaxy()
{
	this.pos = createVector(random(width), random(height));
	this.clusters = [];
	this.visitedClusters = [];
	this.numClusters = 0;
	var generatingClusters = false;
	this.selectedCluster = null;
	this.generateClusters = function*()
	{
		if(!generatingClusters)
		{
			mainCamera.setScale(0.1);
			generatingClusters = true;
			this.clusters = [];
			
			randomSeed(this.pos.x * this.pos.y);
		}
		while(true)
		{
			randomSeed(this.pos.x * this.pos.y + this.numClusters);
			var total = 0;
			
			for(var i = 0; i < 100; i++)
			{
				var c = new Constellation();
				var isFree = false;
				var tries = 0;
				while(!isFree && tries < 2)
				{
					c.pos.x = random(-width*24, width*24);
					c.pos.y = random(-height*24, height*24);
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
					c.id = this.numClusters;
					if(this.visitedClusters.indexOf(c.id) != -1)
					{
					  c.visited = true;
					}
					this.clusters.push(c);
					total++;
					this.numClusters++;
				}
			}
		//	console.log(total);
			yield;
		}
	}
	var lastNumClusters = this.numClusters;
	this.loadingScreen = function*()
	{
		var lights = [];
		randomSeed(this.pos.x * this.pos.y);
		for(var i = 0; i < 100; i++)
		{
			lights.push(createVector(random(width/3,2*width/3), random(height/3,2*height/3)));
		}
		var center = createVector(width/2,height/2);
		//randomSeed(millis);
		while(true)
		{
			pop();
			push();
			
			stroke(255);
			for(var i = 0; i < lights.length; i++)
			{
				var moveVector = p5.Vector.sub(lights[i], center);
				moveVector.normalize();
				var k = map(this.numClusters, 0, 1200, 0, width/2) % random(width/4, width/2); //* random(0.5,2.2);
				var kk = map(lastNumClusters, 0 ,1200, 0, width/2) % random(width/4, width/2); //* random(0.5,2.2);
				moveVector.mult(kk);
				lights[i] = p5.Vector.add(lights[i], moveVector);
				moveVector.normalize();
				moveVector.mult(k);
				var final = p5.Vector.add(lights[i], moveVector);
				line(lights[i].x,lights[i].y, final.x, final.y);
				lastNumClusters = this.numClusters;
			}
			pop();
			randomSeed(millis());
			yield;
		}
		
	}
	
	this.show = function()
	{
		if(this.numClusters < 2000)
		{
			this.generateClusters().next();
			this.loadingScreen().next();
			
		}
		else if(generatingClusters)
		{
			generatingClusters = false;
			console.log(this.numClusters);
		}
		if(!generatingClusters)
		{
			for(var i = 0; i < this.clusters.length; i++)
			{
				this.clusters[i].show();
			}
		}
		
		
	}
	this.keyInput = function(code)
	{
		if(this.selectedCluster !== null)
		{
			
			if(mode == "Galaxy View" && code == 13) //enter constellation view from galaxy view
			{
			  
				this.selectedCluster.visited = true; //set cluster visited
				if(this.visitedClusters.indexOf(this.selectedCluster.id) == -1) //add cluster to array of visited cluster if it isn't already there
				{
				  this.visitedClusters.push(this.selectedCluster.id);
				}
				
				mainCamera.setScale(0.2);
				
				targetCamPos.x = width/2 - width/2*mainCamera.scaleValue;
				targetCamPos.y = height/2 - height/2*mainCamera.scaleValue;
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
			else if(mode == "Constellation View" && code == 32) //leave constellation view and come back to galaxy view
			{
				mainCamera.setScale(0.05);
				targetCamPos.x = width/2 - width/2*mainCamera.scaleValue;
				targetCamPos.y = height/2 - height/2*mainCamera.scaleValue;
				
				this.clusters = [];
				this.numClusters = 0;
				randomSeed(this.pos.x * this.pos.y);
				this.generatingClusters = true;
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