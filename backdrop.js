

function makeBackdrop()
{
	var c=document.getElementById('backdrop');
	c.width = 500; c.height = 500;
	var ctx = c.getContext('2d');
	
	ctx.fillStyle="#222255"
	ctx.fillRect(0,0,500,500);	
		
	c.step=function(count) {
	  ctx.fillStyle="#222255"
	  ctx.globalAlpha=.1;
	  ctx.fillRect(0,0,500,500);	
	
	  ctx.beginPath();
	  var p=(count%30);
	  if (p>15) p=30-p;
	  ctx.moveTo(p*20,0);
	  ctx.lineTo(260,p*10);	  
	  ctx.moveTo(240,p*10);
	  ctx.lineTo(500-p*20,0);
      ctx.strokeStyle='#FFF';
	  ctx.globalAlpha=1;
	  ctx.lineWidth=4;
	  ctx.stroke();
	  
	  ctx.beginPath();
	  ctx.arc(Math.random()*500,Math.random()*500,Math.random()*3+2,0,2*Math.PI);	  
	  ctx.stroke();
	  
	}
    	
	return c;
}

var Backdrop=makeBackdrop();