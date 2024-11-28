var width;
var height;
var tri;
var triB;
let pause = false;
var recursionLimit = 10;
var opacity = 128;
function setup() {
  frameRate(100);
  width = 2500;
  height = 2500;
  createCanvas(width, height);
  stroke(0);
  strokeWeight(4.5);
 // noLoop();
  tri = [];
  
  tri.push([[2500,0],[0,0],[2500,2500],0]);

  triB = [];
  triB.push([[0,2500],[2500,2500],[0,0],0]);
}

function draw() {
  //background(220);
  opacity -= 0.1;
  let c = color(0);
  c.setAlpha(opacity);
  stroke(c);

  
    var u = tri.shift();
    if(u[3] >= recursionLimit){
      if(random() < 0.3){
        return;
      }
      
    }
    
    var uB = triB.shift();
    drawTri(u);
    drawTri(uB);
    /*
    tri.push([[(u[2][0]+u[1][0])/2,(u[2][1]+u[1][1])/2]  ,u[0],u[1]   ] );
    tri.push([[(u[2][0]+u[1][0])/2,(u[2][1]+u[1][1])/2]  ,u[0],u[2]   ] );

   
 */
    
    var r = random(0.3,0.7);
    var dist01 = abs((u[0][0] - u[1][0])**2 + (u[0][1] - u[1][1])**2);
    var dist02 = abs((u[0][0] - u[2][0])**2 + (u[0][1] - u[2][1])**2);
    var dist12 = abs((u[1][0] - u[2][0])**2 + (u[1][1] - u[2][1])**2);

    if(dist01 >= dist02 && dist01 >= dist12){
      tri.push([[ u[0][0] + r*(u[1][0] - u[0][0]), u[0][1] + r*(u[1][1] - u[0][1])]  ,u[0],u[1]   ,u[3]+1] );
      tri.push([[ u[0][0] + r*(u[1][0] - u[0][0]), u[0][1] + r*(u[1][1] - u[0][1])]  ,u[0],u[2]   ,u[3]+1] );
    }else if(dist02 >= dist01 && dist02 >= dist12){
      tri.push([[ u[0][0] + r*(u[2][0] - u[0][0]), u[0][1] + r*(u[2][1] - u[0][1])]  ,u[0],u[1]   ,u[3]+1] );
      tri.push([[ u[0][0] + r*(u[2][0] - u[0][0]), u[0][1] + r*(u[2][1] - u[0][1])] ,u[0],u[2]   ,u[3]+1] );
    }else{
      //dist12 is greatest
      tri.push([[ u[1][0] + r*(u[2][0] - u[1][0]), u[1][1] + r*(u[2][1] - u[1][1])]  ,u[0],u[1] ,u[3]+1  ] );
      tri.push([[ u[1][0] + r*(u[2][0] - u[1][0]), u[1][1] + r*(u[2][1] - u[1][1])] ,u[0],u[2] ,u[3]+1  ] );
    }

    //tri.push([[ u[1][0] + r*(u[2][0] - u[1][0]), u[1][1] + r*(u[2][1] - u[1][1])]  ,u[0],u[1]   ] );
    //tri.push([[u[1][0] + r*(u[2][0] - u[1][0]), u[1][1] + r*(u[2][1] - u[1][1])]  ,u[0],u[2]   ] );



    triB.push([[(uB[2][0]+uB[1][0])/2,(uB[2][1]+uB[1][1])/2]  ,uB[0],uB[1]   ] );
    triB.push([[(uB[2][0]+uB[1][0])/2,(uB[2][1]+uB[1][1])/2]  ,uB[0],uB[2]   ] );
    /*
    var r = Math.random();
    triB.push([[ uB[1][0] + r*(uB[2][0] - uB[1][0]), uB[1][1] + r*(uB[2][1] - uB[1][1])]  ,uB[0],uB[1]   ] );
    triB.push([[uB[1][0] + r*(uB[2][0] - uB[1][0]), uB[1][1] + r*(uB[2][1] - uB[1][1])]  ,uB[0],uB[2]   ] );
    
   */
   
}
  
  

function mousePressed(){ //bei click Pause, bei 2. click weiter
  if(pause==false){
    noLoop();
    pause=true;
  }else{
    loop();
    pause = false;
  }
}

function drawTri(u){
  line(u[0][0],u[0][1],u[1][0],u[1][1]);
  line(u[1][0],u[1][1],u[2][0],u[2][1]);
  line(u[2][0],u[2][1],u[0][0],u[0][1]);

  let c = color(random(255),random(128),random(128));
  c.setAlpha(random(128));
  fill(c);

  
  //triangle(u[0][0],u[0][1],u[1][0],u[1][1],u[2][0],u[2][1]);
}

  /*
  
  var points = [];
  points.push([0,0]);
  points.push([0,2500]);
  points.push([2500,0]);
  var queue = [[0,0]];
  line (2500,0,0,2500);
  for(var i=0;i<2 && queue.length > 0;i++){
    var u = queue.shift();
   console.log(u);
    var tempArr = [];
    for(var a in points){
      if(!(points[a][0] == u[0] && points[a][1] == u[1])){
        for(var b in points){
          if(!(points[b][0] == u[0] && points[b][1] == u[1])){
            if(a > b){
             
              line(u[0],u[1], (points[a][0]+points[b][0])/2 , (points[a][1]+points[b][1])/2 );
             
              tempArr.push([(points[a][0]+points[b][0])/2 , (points[a][1]+points[b][1])/2 ]);
            }
          }
  
         
  
        }
      }
     
    
     
    }

    for(var n in tempArr){
      queue.push(tempArr[n]);
     points.push(tempArr[n]);
    }
  
  }
  */
 












  /*
COOL ACCIDENT
  var width;
var height;
function setup() {
  width = 2500;
  height = 2500;
  createCanvas(width, height);
  stroke(0);
  strokeWeight(5);
  noLoop();
}

function draw() {
  background(220);
  var tri = [];
  tri.push([[0,2500],[2500,2500],[0,0]]);
  for(var i=0;i<25;i++){
    var u = tri.shift();
    drawTri(u);
    tri.push([[(u[2][0]+u[1][0])/2,(u[2][1]+u[1][1])/2]  ,u[0],u[1]   ] );
  }
}

function drawTri(u){
  line(u[0][0],u[0][1],u[1][0],u[1][1]);
  line(u[1][0],u[1][1],u[2][0],u[2][1]);
  line(u[2][0],u[2][1],u[0][0],u[0][1]);
}
*/