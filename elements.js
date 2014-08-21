

function drawFire()
{
	var fc=document.getElementById('fire');
	fc.width = 500; fc.height = 100;
	var f_ctx = fc.getContext('2d');
	
	f_ctx.fillStyle="#440000"
	f_ctx.fillRect(0,0,500,500);
	
	var f_pos = 0;

	function step() {
	  f_ctx.beginPath();
	  f_ctx.moveTo(f_pos,0);
	  f_ctx.strokeStyle='rgb(255,'+Math.round(Math.random()*192+64).toString()+','+Math.round(Math.random()*64).toString()+')';
	  f_ctx.globalAlpha=Math.random()*.5+.1;
	  f_ctx.lineWidth=Math.random()*5+5;
	  
	  var r=Math.random()*50;
	  f_ctx.quadraticCurveTo(f_pos+r,50,f_pos,100);
	  f_ctx.quadraticCurveTo(f_pos-r,50,f_pos,0);
	  f_pos+=Math.random()*30+5;
	  f_pos=f_pos%500;
	  f_ctx.stroke();
	}
	
	return step;
}


function drawWater()
{
	var c=document.getElementById('water');
	c.width = 500; c.height = 100;
	var ctx = c.getContext('2d');
	
	ctx.fillStyle="#0000DD"
	ctx.fillRect(0,0,500,500);
	
	
	function step() {
	  ctx.beginPath();
	  ctx.arc(Math.random()*500,Math.random()*100,Math.random()*20+10,0,2*Math.PI);
	  ctx.fillStyle='rgb(0,0,'+Math.round(Math.random()*255).toString()+')';
	  ctx.globalAlpha=Math.random()*.5+.1;
	  ctx.fill();	  
	}
	
	return step;
}


function drawIce()
{
	var c=document.getElementById('ice');
	c.width = 500; c.height = 100;
	var ctx = c.getContext('2d');
	
	ctx.fillStyle="#AAAAFF"
	ctx.fillRect(0,0,500,500);
	
	
	function step() {
	  ctx.beginPath();
	  ctx.moveTo(Math.random()*500,0);
	  ctx.lineTo(Math.random()*500,100);	  
	  ctx.strokeStyle='rgb(200,200,'+Math.round(Math.random()*55+200).toString()+')';
	  ctx.globalAlpha=Math.random()*.5+.1;
	  ctx.lineWidth=2;
	  ctx.stroke();
	  ctx.beginPath();	  
	  ctx.moveTo(0,Math.random()*100);
	  ctx.lineTo(500,Math.random()*100);	  
	  ctx.strokeStyle='rgb(50,50,'+Math.round(Math.random()*515+100).toString()+')';
	  ctx.globalAlpha=Math.random()*.3+.1;
	  ctx.lineWidth=1;
	  ctx.stroke();	  
	}	
	return step;
}

var EvolveElements=[drawFire(),drawWater(),drawIce()];

function drawAll()
{
  for (var i=0;i<EvolveElements.length;i+=1)
     EvolveElements[i]();
  setTimeout(drawAll,100);
}

drawAll();