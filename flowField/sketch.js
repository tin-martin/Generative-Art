
let width;
let height;
let p;
let s;
function setup() {
  width = 3000;
  height = 3000;
  createCanvas(width,height);
  
 // angleMode(DEGREES);
  p = {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: 0,
    vy: 0
  };
  noLoop();
  //background(500);
 
}


function draw(){
  stroke(0);
  strokeWeight(5);
  
  for(var x=0;x<=width;x+=width/500){
    for(var y=0;y<=height;y+=height/500){
      //var angle = (x+y)*0.01 % Math.PI * 2;
      //var angle = (cos(x*0.01)+cos(y*0.01))*Math.PI *2;
      var angle = giveAngle(x,y);
      var lineLen = 2;
      line(x-(lineLen/2)*cos(angle),y-(lineLen/2)*sin(angle),x+(lineLen/2)*cos(angle),y+(lineLen/2)*sin(angle)); 
    }
  }
  /*

 // var angle = (sin(p.x*0.01)+sin(p.y*0.01))*Math.PI *2;
  if(p.x+p.vx > width){
    p.x = 0;
  }else if(p.x+p.vx < 0){
    p.x = width;
  }

  if(p.y+p.vy > height){
    p.y = 0;
  }else if(p.y+p.vy < 0){
    p.y = height;
  }
  
  line(p.x,p.y, p.x+p.vx, p.y+p.vy);
  p.vx += cos(giveAngle(p.x,p.y));
  p.vy += sin(giveAngle(p.x,p.y));
  p.x += p.vx;
  p.y += p.vy;
 */
}

function giveAngle(x,y){
  return (sin(x*0.01)+sin(y*0.01))*Math.PI *2;
  
  var a = -1.4;
  var b = 1.6;
  var c = 1.0;
  var d = 0.7;

  var scale = 0.005;
  x = (x - width/2)*scale;
  y = (y - height/2)*scale;
  
  nX = sin(a*y) + c*cos(a*x);
  nY = sin(b*x) + d*cos(b*y);
  return Math.atan2(nY-y, nX-x);
}