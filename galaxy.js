function Galaxy()
{
	this.pos = createVector(random(width), random(height));
	this.clusters = [];
	this.numClusters = 0;
	var generatingClusters = false;
	this.selectedCluster = null;
	this.generateClusters = function*()
	{
		if(!generatingClusters)
		{
			generatingClusters = true;
			this.clusters = [];
			
			randomSeed(this.pos.x * this.pos.y);
		}
		while(true)
		{
			var total = 0;
			
			for(var i = 0; i < 100; i++)
			{
				var c = new Constellation();
				var isFree = false;
				var tries = 0;
				while(!isFree && tries < 3)
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
					
					this.clusters.push(c);
					total++;
					this.numClusters++;
				}
			}
			console.log(total);
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
		if(this.numClusters < 5000)
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
		if(this.selectedCluster != null)
		{
			
			if(mode == "Galaxy View" && code == 13)
			{
				var hasVisited = false;
				for(var i = 0; i < visitedClusters.length; i++)
				{
					if(visitedClusters[i].x == this.selectedCluster.pos.x && visitedClusters[i].y == this.selectedCluster.pos.y)
					{
						hasVisited = true;
						break;
					}
				}
				if(!hasVisited)
				{
					visitedClusters.push(this.selectedCluster.pos);
				}
				mainCamera.setScale(0.5);
				
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
			else if(mode == "Constellation View" && code == 32)
			{
				mainCamera.setScale(0.5);
				targetCamPos.x = width/2 - width/2*mainCamera.scaleValue;
				targetCamPos.y = height/2 - height/2*mainCamera.scaleValue;
				
				this.clusters = [];
				this.numClusters = 0;
				this.generateClusters();
				if(visitedClusters.length > 0)
				{
					var vCluster = null;
					for(var i = 0; i < this.clusters.length; i++)
					{
						if(visitedClusters[visitedClusters.length-1].x == this.clusters[i].pos.x && visitedClusters[visitedClusters.length-1].y == this.clusters[i].pos.y)
						{
							vCluster = this.clusters[i];
							break;
						}
					}
					if(vCluster != null)
					{
						vCluster.selected = true;
						this.selectedCluster = vCluster;
						targetCamPos.x = width/2 - vCluster.pos.x*mainCamera.scaleValue;
						targetCamPos.y = height/2 - vCluster.pos.y*mainCamera.scaleValue;
						
					}
					for(var i = 0; i < visitedClusters.length; i++)
					{
						console.log("visited cluster at: " + str(visitedClusters[i].x) + ", " + str(visitedClusters[i].y));
					}
				}
				
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