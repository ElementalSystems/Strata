var addElement=-1;
var addTime=0;

var Level=0;
var helpTime=-1;
var fullHelpTime=3000;
var helptext=document.getElementById('helptext');
var leveltext=document.getElementById('level');
var ElGenerateList=[0,1,2,3,4,5,6,7];
var levelController;

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
var layerSpeedP=10;
var Layers=[];
var layerStart=0;
var layerStartOrigin=0;
	
function drawMain()
{
	var c=document.getElementById('main');
	c.width = c.offsetWidth; c.height = c.offsetHeight;
	var ctx = c.getContext('2d');
	
	ctx.fillStyle="#005"
	var lastTime=0;
	var fullAddTime=300;
    layerStartOrigin=c.height*.8;
	layerStart=layerStartOrigin;
	    
	function step(timestamp) {
	  
      var yDie=c.height*yDieP/100.0;
	  var layerDepth=c.height*layerDepthP/100.0;
	  var layerSpeed=c.height*layerSpeedP/100.0;
      	  
	  var frameTime=(lastTime==0)?0:(timestamp-lastTime);
      lastTime=timestamp;	  
	  
	  var posAccRatio=layerStart/layerStartOrigin;
	  if (posAccRatio>.5) //extra fast
	     layerSpeed*=1+(posAccRatio-.5)*5;
	  
	  layerStart-=layerSpeed*frameTime/1000;
	  if (layerStart+layerDepth<0) {
	    layerStart+=layerDepth;
		Layers.splice(0,1);
	  }
	  
	  if (layerStart<0) {
	    gameOver();
	  }
	  
	  
	  //load patterns
	  for (var i=0;i<Elements.length;i+=1)
	    if (!Elements[i].pattern)
		   Elements[i].pattern=ctx.createPattern(Elements[i],'repeat');

	  //clear old contents
	  ctx.fillStyle="#005"
	  ctx.globalAlpha=frameTime/100;	  
	  ctx.drawImage(Backdrop,0,0);
	  
	  //draw the current action
	  if (addElement>=0) {
	     var ratio=(addTime+0.001)/fullAddTime;
		 var yPos=ratio*(yDie+layerStart+layerDepth*2);
		 var width=ratio*c.width*1.4;
		 var left=c.width/2-width/2;
		 var right=c.width/2+width/2;
		 var center=c.width/2;
		 
		 ctx.globalAlpha=1;
	   
		 
		 ctx.fillStyle=Elements[addElement].pattern;
		 ctx.moveTo(left,yPos);
		 ctx.quadraticCurveTo(center,0,right,yPos);
		 ctx.lineTo(right,yPos);
		 ctx.quadraticCurveTo(center,(yDie+layerStart+yPos)/2,left,yPos);		 
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
	  
	  
	  while (Layers.length<10)
	    Layers.push(ElGenerateList[Math.floor(Math.random()*ElGenerateList.length)]);
		
	  if (helpTime>0) {
	     helpTime-=frameTime;
		 if (helpTime<0)
		   helptext.classList.remove("showhelp");
	  }
	  
	  window.requestAnimationFrame(step);
	}	
	step(-1);
	
}


function setHelp(text)
{
   helptext.innerHTML=text;
   if (!helptext.classList.contains("showhelp"))
     helptext.classList.add("showhelp");
   helpTime=fullHelpTime;
}

function levelUp()
{
  
  Level+=1;
  levelController();
  for (var i=0;i<Elements.length;i+=1) {
     if (i<=MaxElAvail)
       Elements[i].classList.add("control");
	 else
	   Elements[i].classList.remove("control");
  }
  
  leveltext.innerHTML=Level;
  
}

function tutorial()
{
 switch (Level) {
  case 1: layerSpeedP=5; ElGenerateList=[5]; MaxElAvail=0; setHelp("Press the air button to blow away the layers of dust"); break;  
  case 2: ElGenerateList=[6];  break;  
  case 5: setHelp("Get rid of the rising layers before they get to the top."); ElGenerateList=[5,6];  break;  
  case 10: layerSpeedP=2; setHelp("Air kicks up sand to make dust - then blow away the dust."); break;
  case 11: ElGenerateList=[2,2,2,5,6]; break;
  case 15: layerSpeedP=5; ElGenerateList=[2,4,6,5]; break;
  case 16: layerSpeedP=2; MaxElAvail=1; setHelp("You get to use fire too - it works on water and ice too..."); break;
  case 25: ElGenerateList=[2,3,3,3,4,5,6,7]; break;
  case 30: MaxElAvail=2;  setHelp("New Element: Water. Can wash away earth but can cause problems"); break;
  case 40: ElGenerateList=[1,1,1,2,3,4,5,6,7]; break;
  case 45: MaxElAvail=3; setHelp("Now you have Earth. Discover its properties."); break;
  case 46: ElGenerateList=[1,2,3,4,5,6,7]; break;
  
  }
}

function maingame()
{
 switch (Level) {
  case 1: layerSpeedP=5; ElGenerateList=[2,4,5,5,5,6,6,6]; MaxElAvail=3; setHelp("Get rid of the layers before they crush you."); break;  
  case 2: layerSpeedP=2; ElGenerateList=[2,4,6,5];  break;  
  case 10: layerSpeedP=3; break;
  case 15: layerSpeedP=4; break;
  case 25: layerSpeedP=1; ElGenerateList=[2,4,6,5,3,3,7,7]; break;
  case 30: layerSpeedP=2; break;
  case 35: layerSpeedP=3; break;
  case 40: layerSpeedP=4; break;
  case 45: layerSpeedP=1; ElGenerateList=[1,2,3,4,5,6,7]; break;
  case 60: layerSpeedP=2; break;
  case 70: layerSpeedP=3; break;
  case 80: layerSpeedP=4; break;
  case 90: layerSpeedP=5; break;
  
  }
}



drawMain();

function playGame(controller)
{
  levelController=controller
  if (!document.body.classList.contains("inplay")) {
    document.body.classList.add("inplay");
  }
  Level=0;
  Layers=[];
  layerStart=layerStartOrigin
  levelUp();
  
}

function gameOver()
{
   if  (document.body.classList.contains("inplay")) {
      document.body.classList.remove("inplay");
	  document.body.classList.add("gameover");
      document.getElementById("finallevel").innerHTML=Level;
   }
}

function reset()
{
      document.body.classList.remove("gameover");
}