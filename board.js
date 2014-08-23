function pingpong(start,end,time,timestamp)
{
  var pos=timestamp%(time*2);
  if (pos>time) pos=2*time-pos;
  return start+(pos/time)*(end-start);
}

function slide(start,end,time,timestamp)
{
  var pos=timestamp%time;
  return start+(pos/time)*(end-start);
}

function drawMain()
{
	var c=document.getElementById('main');
	c.width = 500; c.height = 500;
	var ctx = c.getContext('2d');
	
	ctx.fillStyle="#000"
	
	var Layers=[];
	var layerStart=400;
	var lastTime=0;
	function step(timestamp) {
	    
	  var frameTime=(lastTime==0)?0:(timestamp-lastTime);
      lastTime=timestamp;	  
	  ctx.fillRect(0,0,500,500);
	  
	  //load patterns
	  for (var i=0;i<Elements.length;i+=1)
	    if (!Elements[i].pattern)
		   Elements[i].pattern=ctx.createPattern(Elements[i],'repeat');

	  var yDie=200;
	  
	  var yStart=yDie+layerStart;	   
	  var layerDepth=50;
	  var layerSpeed=50;
      for (var i=0;i<Layers.length;i+=1) {
	    ctx.save();
	    ctx.beginPath();
	    ctx.fillStyle=Elements[Layers[i]].pattern;
		ctx.moveTo(0,yStart+i*layerDepth);
		ctx.quadraticCurveTo(250,yDie,500,yStart+i*layerDepth);
		ctx.lineTo(500,yStart+i*layerDepth+layerDepth);
		ctx.lineTo(0,yStart+i*layerDepth+layerDepth);
		ctx.fill();
		ctx.restore();	  
	  }
	  
	  layerStart-=layerSpeed*frameTime/1000;
	  if (layerStart<0) {
	    layerStart+=layerDepth;
		Layers.splice(0,1);
	  }
	  
	  while (Layers.length<20)
	    Layers.push(Math.floor(Math.random()*Elements.length));
		
	  
		   
	  /*
	  var xoff=0;
	  var yoff=slide(0,100,200,timestamp);
	  var waveamp=pingpong(-50,50,500,timestamp);
	  ctx.translate(-xoff,-yoff);
	  
	  ctx.beginPath();
	  ctx.fillStyle=Elements[0].pattern;
	  ctx.moveTo(0+xoff,50+yoff);
	  ctx.bezierCurveTo(200+xoff,50-waveamp+yoff,300+xoff,50+waveamp+yoff,500+xoff,50+yoff);
	  ctx.lineTo(500+xoff,250+yoff);
	  ctx.lineTo(0+xoff,250+yoff);
	  ctx.fill();
	  
	  ctx.restore();
	  ctx.save();
	  
	  xoff=slide(0,500,5000,timestamp);
	  yoff=pingpong(-20,20,1200,timestamp);
	  ctx.translate(-xoff,-yoff);
	  
	  
	  ctx.beginPath();
	  
	  
	  waveamp=pingpong(-80,80,2000,timestamp);
	  
	  ctx.fillStyle=Elements[1].pattern;;
	  ctx.moveTo(0+xoff,200+yoff);
	  ctx.bezierCurveTo(100+xoff,200-waveamp+yoff,200+xoff,200+waveamp+yoff,300+xoff,200+yoff);
	  ctx.bezierCurveTo(400+xoff,200-waveamp+yoff,500+xoff,200+waveamp+yoff,600+xoff,200+yoff);
	  ctx.lineTo(500+xoff,400+yoff);
	  ctx.lineTo(0+xoff,400+yoff);
	  ctx.fill();
	  
	  ctx.restore();
	  ctx.save();
	  
	  ctx.beginPath();	  
	  
	  ctx.fillStyle=Elements[2].pattern;;
	  ctx.moveTo(0,300);
	  ctx.lineTo(500,300);
	  ctx.lineTo(500,500);
	  ctx.lineTo(0,500);
	  ctx.fill();
	  ctx.restore();
	  ctx.save();
	  
	  xoff=pingpong(-100,100,100,timestamp);
	  yoff=slide(0,100,800,timestamp);
	  var waveamp=pingpong(-50,50,5000,timestamp);
	  ctx.translate(-xoff,-yoff);
	  
	  ctx.beginPath();
	  ctx.fillStyle=Elements[0].pattern;
	  ctx.moveTo(0+xoff,400+yoff);
	  ctx.bezierCurveTo(200+xoff,400-waveamp+yoff,300+xoff,400+waveamp+yoff,500+xoff,400+yoff);
	  ctx.lineTo(500+xoff,420+yoff);
	  ctx.bezierCurveTo(300+xoff,400+waveamp+yoff,200+xoff,400-waveamp+yoff,0+xoff,420+yoff);
	  ctx.lineTo(0+xoff,420+yoff);
	  ctx.fill();
	  
	  ctx.restore();	  
	  */
	  window.requestAnimationFrame(step);
	}	
	step(-1);
	
}

drawMain();