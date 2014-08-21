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
	
	ctx.fillStyle="#AAAAFF"
	var xpos=0;
	
	function step(timestamp) {
	  ctx.save();
	  ctx.fillRect(0,0,500,500);
	  
	  
	  var xoff=0;
	  var yoff=slide(0,100,200,timestamp);
	  var waveamp=pingpong(-50,50,500,timestamp);
	  ctx.translate(-xoff,-yoff);
	  
	  ctx.beginPath();
	  var fire_pat=ctx.createPattern(document.getElementById("fire"),"repeat");	
	  ctx.fillStyle=fire_pat;
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
	  
	  
	  var water_pat=ctx.createPattern(document.getElementById("water"),"repeat");	
	  waveamp=pingpong(-80,80,2000,timestamp);
	  
	  ctx.fillStyle=water_pat;
	  ctx.moveTo(0+xoff,200+yoff);
	  ctx.bezierCurveTo(100+xoff,200-waveamp+yoff,200+xoff,200+waveamp+yoff,300+xoff,200+yoff);
	  ctx.bezierCurveTo(400+xoff,200-waveamp+yoff,500+xoff,200+waveamp+yoff,600+xoff,200+yoff);
	  ctx.lineTo(500+xoff,400+yoff);
	  ctx.lineTo(0+xoff,400+yoff);
	  ctx.fill();
	  
	  ctx.restore();
	  ctx.save();
	  
	  ctx.beginPath();	  
	  
	  var ice_pat=ctx.createPattern(document.getElementById("ice"),"repeat");	
	  
	  ctx.fillStyle=ice_pat;
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
	  ctx.fillStyle=fire_pat;
	  ctx.moveTo(0+xoff,400+yoff);
	  ctx.bezierCurveTo(200+xoff,400-waveamp+yoff,300+xoff,400+waveamp+yoff,500+xoff,400+yoff);
	  ctx.lineTo(500+xoff,420+yoff);
	  ctx.bezierCurveTo(300+xoff,400+waveamp+yoff,200+xoff,400-waveamp+yoff,0+xoff,420+yoff);
	  ctx.lineTo(0+xoff,420+yoff);
	  ctx.fill();
	  
	  ctx.restore();	  
	  
	  window.requestAnimationFrame(step);
	}	
	step(-1);
	
}

drawMain();