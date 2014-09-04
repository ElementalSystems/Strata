var addElement=-1;
var addTime=0;

var Level=0;
	
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

function rainDownElement(elementIndex)
{
  if (addElement<0) {
     addElement=elementIndex;  
	 addtime=0;
  }
}

var yDieP=30;
var layerDepthP=10;
var layerSpeedP=5;

function drawMain()
{
	var c=document.getElementById('main');
	c.width = c.offsetWidth; c.height = c.offsetHeight;
	var ctx = c.getContext('2d');
	
	ctx.fillStyle="#005"
	var Layers=[];
	var layerStart=c.height*.6;
	var lastTime=0;
	var fullAddTime=500;
	
	function step(timestamp) {
	  
      var yDie=c.height*yDieP/100.0;
	  var layerDepth=c.height*layerDepthP/100.0;
	  var layerSpeed=c.height*layerSpeedP/100.0;
      	  
	  var frameTime=(lastTime==0)?0:(timestamp-lastTime);
      lastTime=timestamp;	  
	  //load patterns
	  for (var i=0;i<Elements.length;i+=1)
	    if (!Elements[i].pattern)
		   Elements[i].pattern=ctx.createPattern(Elements[i],'repeat');

	  //clear old contents
	  ctx.fillStyle="#005"
	  ctx.globalAlpha=frameTime/250;
	  ctx.drawImage(Backdrop,0,0);
	  
	  //draw the current action
	  if (addElement>=0) {
	     var ratio=(addTime+0.001)/fullAddTime;
		 var yPos=ratio*(yDie+layerStart);
		 var width=ratio*c.width;
		 var left=c.width/2-width/2;
		 var right=c.width/2+width/2;
		 var off1=left+width/3;
		 var off2=left+2*width/3;
		 ctx.globalAlpha=1;
	   
		 
		 ctx.fillStyle=Elements[addElement].pattern;
		 ctx.moveTo(left,yPos);
		 ctx.bezierCurveTo(off1,yPos-layerDepth,off2,yPos+layerDepth,right,yPos);
		 ctx.lineTo(right,yPos+layerDepth);
		 ctx.bezierCurveTo(off2,yPos+2*layerDepth,off1,yPos,left,yPos+layerDepth);		 
		 ctx.fill();
         addTime+=frameTime;
         if (ratio>1) { 
		    //change layer
			var newEl=Elements[Layers[0]].response_transform[addElement];
			var addEl=Elements[Layers[0]].response_addlayer[addElement];
			if (newEl<0) { //destroy 
			   layerStart+=layerDepth;
		       Layers.splice(0,1);
			   levelUp();
			} else
			   Layers[0]=newEl;
			
			if (addEl>=0) {
			  layerStart-=layerDepth;
			  Layers.unshift(addEl);
            }			
			
		    addElement=-1;	
			addTime=0; }
	  }
	  
	  ctx.globalAlpha=1;
	  
	  
	  var yStart=yDie+layerStart;	   
	  for (var i=0;i<Layers.length;i+=1) {
	    ctx.save();
	    ctx.beginPath();
		var xoff=(yStart+i*layerDepth)*Elements[Layers[i]].xflow;
		var yoff=(yStart+i*layerDepth)*Elements[Layers[i]].yflow;
		ctx.translate(-xoff,-yoff)
	    ctx.fillStyle=Elements[Layers[i]].pattern;
		ctx.moveTo(xoff,yoff+yStart+i*layerDepth);
		ctx.quadraticCurveTo(xoff+c.width/2,yoff+(yDie+yStart+i*layerDepth)/2,xoff+c.width,yoff+yStart+i*layerDepth);
		ctx.lineTo(xoff+c.width,yoff+yStart+i*layerDepth+layerDepth);
		ctx.lineTo(xoff,yoff+yStart+i*layerDepth+layerDepth);
		ctx.fill();
		ctx.restore();	  
	  }
	  
	  layerStart-=layerSpeed*frameTime/1000;
	  if (layerStart<0) {
	    layerStart+=layerDepth;
		Layers.splice(0,1);
	  }
	  
	  while (Layers.length<10)
	    Layers.push(ElGenerateList[Math.floor(Math.random()*ElGenerateList.length)]);
		
	  
	  window.requestAnimationFrame(step);
	}	
	levelUp();
	step(-1);
	
}


function levelUp()
{
  Level+=1;
  switch (Level) {
  case 1: ElGenerateList=[2,6]; MaxElAvail=0; break;  
  case 5: ElGenerateList=[3,3,3,2,6]; break;
  case 10: MaxElAvail=1; break;
  case 11: ElGenerateList=[3,2,6,4]; break;
  
  }
  
  for (var i=0;i<Elements.length;i+=1) {
     if (i<=MaxElAvail)
       Elements[i].classList.add("control");
	 else
	   Elements[i].classList.remove("control");
	 
  }
  
}

drawMain();