

function makeFire()
{
	var fc=document.getElementById('fire');
	fc.width = 100; fc.height = 100;
	var f_ctx = fc.getContext('2d');
	
	f_ctx.fillStyle="#FFCC55"
	f_ctx.fillRect(0,0,100,100);
	
	
	fc.step=function() {
	  f_ctx.beginPath();
	  f_ctx.moveTo(f_pos,0);
	  f_ctx.strokeStyle='rgb(255,'+Math.round(Math.random()*192+64).toString()+','+Math.round(Math.random()*64).toString()+')';
	  f_ctx.globalAlpha=Math.random()*.5+.1;
	  f_ctx.lineWidth=Math.random()*5+5;
	  
	  var r=Math.random()*50;
	  var f_pos = Math.random()*100;
      f_ctx.moveTo(f_pos,0);
	  f_ctx.quadraticCurveTo(f_pos+r,50,f_pos,100);
	  f_ctx.quadraticCurveTo(f_pos-r,50,f_pos,0);
	  f_ctx.moveTo(100-f_pos,0);
	  f_ctx.quadraticCurveTo(100-f_pos+r,50,100-f_pos,100);
	  f_ctx.quadraticCurveTo(100-f_pos-r,50,100-f_pos,0);
	  f_ctx.stroke();
	}
	fc.xflow=0;
	fc.yflow=-2.5;
	return fc;
}

function makeEarth()
{
	var fc=document.getElementById('earth');
	fc.width = 100; fc.height = 100;
	var f_ctx = fc.getContext('2d');
	
	f_ctx.fillStyle="#FFCC55"
	f_ctx.fillRect(0,0,100,100);
	
	
	fc.step=function() {
	  f_ctx.beginPath();
	  var p=Math.random()*100;
	  f_ctx.globalAlpha=Math.random()*.5+.1;
	  f_ctx.strokeStyle='rgb(128,'+Math.round(Math.random()*50+50).toString()+',0)';
	  f_ctx.lineWidth=Math.random()*15+2;
	  f_ctx.moveTo(0,p);
	  f_ctx.lineTo(100,p);
	  f_ctx.stroke();
	}
	
	fc.xflow=0;
	fc.yflow=-.5;	
	return fc;
}


function makeWater()
{
	var c=document.getElementById('water');
	c.width = 100; c.height = 100;
	var ctx = c.getContext('2d');
	
	ctx.fillStyle="#0000DD"
	ctx.fillRect(0,0,500,500);	
	
	c.step=function() {
	  var r=Math.random()*10+5;
	  var x=Math.random()*(100-r);
	  var y=Math.random()*(100-r);
	  ctx.fillStyle='rgb(0,0,'+Math.round(Math.random()*192+64).toString()+')';
	  ctx.globalAlpha=Math.random()*.5+.1;
	  
	  ctx.beginPath();
	  ctx.arc(x,y,r,0,2*Math.PI);
	  ctx.fill();	  
	  
	  if ((x-r)<0) {
	    ctx.beginPath();
	    ctx.arc(x+100,y,r,0,2*Math.PI);
	    ctx.fill();	  
	  }
	  
	  if ((y-r)<0) {
	    ctx.beginPath();
	    ctx.arc(x,y+100,r,0,2*Math.PI);
	    ctx.fill();	  
	  }
	  	  
	  
	}
	c.xflow=1;
	c.yflow=-.7;	
	return c;
}


function makeSand()
{
	var c=document.getElementById('sand');
	c.width = 100; c.height = 100;
	var ctx = c.getContext('2d');
	
	ctx.fillStyle="#BBAA66"
	ctx.fillRect(0,0,100,100);	
	
	c.step=function() {
	  var r=Math.random()*2+1;
	  var x=Math.random()*(100-r);
	  var y=Math.random()*(100-r);
	  var c=Math.random();
	  if (c<.33)
	     ctx.fillStyle="#FFDD88";
	  else if (c<.66)
	     ctx.fillStyle="#BBAA66";
	  else
    	  ctx.fillStyle="#887755";
		
	  ctx.globalAlpha=Math.random()*.8+.1;
	  
	  ctx.beginPath();
	  ctx.arc(x,y,r,0,2*Math.PI);
	  ctx.fill();	  
	}
	c.xflow=0;
	c.yflow=-.5;
	
	return c;
}


function makeIce()
{
	var c=document.getElementById('ice');
	c.width = 100; c.height = 100;
	var ctx = c.getContext('2d');
	
	ctx.fillStyle="#AAAAFF"
	ctx.fillRect(0,0,500,500);
	
	
	c.step=function() {
	  ctx.beginPath();
	  var p=Math.random()*100;
	  var poff=Math.random()*10;
	  ctx.moveTo(p-poff,0);
	  ctx.lineTo(p+poff,100);	  
	  ctx.moveTo(p+poff,0);
	  ctx.lineTo(p-poff,100);	  
	  ctx.strokeStyle='rgb(200,200,'+Math.round(Math.random()*55+200).toString()+')';
	  ctx.globalAlpha=Math.random()*.5+.1;
	  ctx.lineWidth=2;
	  ctx.stroke();
	  ctx.beginPath();	  
	  p=Math.random()*100;
	  poff=Math.random()*10;	  
	  ctx.moveTo(0,p-poff);
	  ctx.lineTo(100,p+poff);	  
	  ctx.moveTo(0,p+poff);
	  ctx.lineTo(100,p-poff);	  
	  ctx.strokeStyle='rgb(50,50,'+Math.round(Math.random()*515+100).toString()+')';
	  ctx.globalAlpha=Math.random()*.3+.1;
	  ctx.lineWidth=1;
	  ctx.stroke();	  
	}
    c.xflow=0;
	c.yflow=-.5;
		
	return c;
}

var Elements=[makeFire(),makeWater(),makeIce(),makeEarth(),makeSand()];

function drawAll()
{
  var count=0;
  for (var i=0;i<Elements.length;i+=1) {
     Elements[i].step(count);
	 Elements[i].pattern=null;
	 count+=1;
  }
  setTimeout(drawAll,100);
}

drawAll();