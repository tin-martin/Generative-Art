var P;
let myGeometry;
let wrapNum = 256;
let width = 2500;
let length = 2500;
var points;
var colors = ["#335c67","#fff3b0","#e09f3e","#9e2a2b","#540b0e"];
let count = 0;

function regeneratePoints(numPoints){
  points = [];
  for(var i=0;i<numPoints;i++){
    points.push({
      x: Math.random() * width,
      y: Math.random() * length,
      vx: 0,
      vy: 0,
      opacity:25,
      weight:35,
      color:colors[round(random(0,colors.length-1))]
    });
    
  }
  
}
function setup() {
 
  angleMode(RADIANS);
  createCanvas(width,length);
  regeneratePoints(2750);
  
  
  P = [];
  for(var i=0; i<wrapNum; i++){
    P[i] = i;
  }
  P = shuffle(P);
  /*
  for(var y=0;y<length;y++){
    for(var x=0;x<width;x++){
      var n = perlin2D(x*0.01,y*0.01);
      n += 1.0;
      n /= 2.0;
      var c = Math.round(255*n);
      set(x,y,c);

    }
  }
  
  updatePixels();
  for(var y=0;y<length;y+=10){
    for(var x=0;x<width;x+=10){
      var angle = giveAngle(x,y);

      var lineLen = 10;
      strokeWeight(4);
      point(x,y);
      strokeWeight(1);
      line(x-(lineLen/2)*cos(angle),y-(lineLen/2)*sin(angle),x+(lineLen/2)*cos(angle),y+(lineLen/2)*sin(angle)); 
    }
  }
**/
 // noLoop();
 background(255,255,255);
// background(255,255,255);
}

function draw() {
  console.log(points.length);
  count++;
  var temp = [];
  for(var i=0;i<points.length;i++){
    var p = points[i];
    if(p.x+p.vx > width){
      p.x = 0;
      p.vy = 0;
    }else if(p.x+p.vx < 0){
      p.x = width;
      P.vx - 0;
    }
  
    if(p.y+p.vy > length){
      p.y = 0;
    }else if(p.y+p.vy < 0){
      p.y = length;
    }
   
    var c = color(p.color);
    c.setAlpha(p.opacity);
    if(p.opacity > 1){
      p.opacity-=0.25;
    }
   
    
    stroke(c);
    strokeWeight(p.weight);
    if(p.weight > 5){
      p.weight -= 0.5;
    }
  

      line(p.x,p.y,p.x+p.vx,p.y+p.vy);
   
      p.vx = cos(giveAngle(p.x,p.y));
      p.vy = sin(giveAngle(p.x,p.y));
      p.x += p.vx;
      p.y += p.vy;
    
   

    if(count > 40){
      if(Math.random() < 0.99){
       
        temp.push(points[i]);
      }
    }else{
      temp.push(points[i]);
    }
  }
 
  points = temp;
}


function giveAngle(x,y){
  var n = perlin2D(x*0.01,y*0.01);
  n += 1.0;
  n /= 2.0;
  var c = Math.round(255*n);
  var angle = c/255*2*Math.PI;
  return angle;
}

function perlin2D(x,y){
  const X = Math.floor(x) % wrapNum;
  const Y = Math.floor(y) % wrapNum;

  const xf = x-Math.floor(x);
  const yf = y-Math.floor(y);

  const tr = createVector(xf-1.0, yf-1.0);
  const tl = createVector(xf, yf-1.0);
  const br = createVector(xf-1.0, yf);
  const bl = createVector(xf, yf);

  const vTr = P[P[X+1]+Y+1];
  const vTl = P[P[X]+Y+1];
  const vBr = P[P[X+1]+Y];
  const vBl = P[P[X]+Y];

  const dTr = tr.dot(GetConstantVector(vTr));
  const dTl = tl.dot(GetConstantVector(vTl));
  const dBr = br.dot(GetConstantVector(vBr));
  const dBl = bl.dot(GetConstantVector(vBl));

  const u = Fade(xf);
  const v = Fade(yf);

  const result = Lerp(u, 
    Lerp(v, dBl, dTl), 
    Lerp(v,dBr,dTr));
 
  return result;
}

function Lerp(t, a1, a2){
  return a1 + t*(a2-a1);
}

/*
function Fade(t){
  return 6*t**5 - 15*t**4 + 10*t**3;
}
*/

function Fade(t){
  return ((6*t - 15)*t + 10)*t**3;
}

//Fisher-Yates Shuffle
const shuffle = (array) => {
  for(var i= array.length - 1; i > 0; i--){
    var j = Math.floor(Math.random() * (i+1));
    [array[i],array[j]] = [array[j],array[i]];
  }
  return array;
};

function GetConstantVector(vector){
  const h = vector % 4;
  if(h == 0){
    return createVector(1.0,1.0);
  }else if(h == 1){
    return createVector(-1.0, 1.0);
  }else if(h == 2){
    return createVector(-1.0, -1.0);
  }else{
    return createVector(1.0, -1.0);
  }   
}
