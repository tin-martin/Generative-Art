import java.lang.Math;


int displayWidth = 750;
int displayHeight = 750;
int nBoids = 500;
Boid[] boids = new Boid[nBoids];
O_Rect[] rects = new O_Rect[1];
//adjustable factors
float protectedRange = 8;
float visibleRange = 40;
float avoidFactor = 0.05;
float matchingFactor = 0.05;
float centeringFactor = 0.0045;
float turnFactor = 0.55;
float maxSpeed = 6;
float minSpeed = 3;

float paddingX = 100;
float paddingY = 100;
float leftMargin = paddingX;
float rightMargin = displayWidth - paddingX;
float topMargin = displayHeight - paddingY;
float bottomMargin = paddingY;

float attractorX = -1;
float attractorY = -1;

int[] colors = {#264653,#2a9d8f,#e9c46a,#f4a261,#e76f51};
PImage img;
void setup(){
  // img = loadImage("/Users/martintin/Downloads/download (17).png");
  size(750,750);
  //frameRate(10);
  
  for(int i=0;i<nBoids;i++){
    boids[i] = new Boid(random(1)*displayWidth, random(1)*displayHeight, random(-1,1)*minSpeed, random(-1,1)*minSpeed,colors[round(random(0,colors.length-1))]);
  }
  rects[0] = new O_Rect(100,100,150,150);
}
void draw(){
  //background(255,255,255, 0);
  //  tint(255,255,255,250);
 // image(img,0.0,0.0);
   
  
  fill(255,255,255,80);
  rect(0,0,width,height);
  
  for(int i=0;i<rects.length;i++){
    fill(0,0,0,50);
    noStroke();
   // rect(rects[i].x1,rects[i].x2,rects[i].y1,rects[i].y2);
  }
  for(int x=0;x<=width;x+=width/100){
    for(int y=0;y<=height;y+=height/100){
      float angle = noise(x*0.01,y*0.01)*2*PI;
      stroke(0,25);
      
    //  line(x,y,x+cos(angle)*5,y+sin(angle)*5);
      stroke(0);
    }
  }
  
  for(int u=0;u<nBoids;u++){
    float avgVx = 0;
    float avgVy = 0;
    float avgX = 0;
    float avgY = 0;
    int nNeighbours = 0;
    float speed = sqrt(pow((boids[u].vx),2) + pow((boids[u].vy),2));
    
    for(int i=0;i<nBoids;i++){
      if(i!=u){
        float dist = sqrt(pow((boids[u].x - boids[i].x),2) + pow((boids[u].y - boids[i].y),2));
        //separation

        if(dist <= protectedRange && abs(acos((boids[u].vx*(boids[i].x-boids[u].x) + boids[u].vy*(boids[i].y-boids[u].y))/(dist*speed))) <= radians(125)){
          boids[u].vx += (boids[u].x - boids[i].x)*avoidFactor;
          boids[u].vy += (boids[u].y - boids[i].y)*avoidFactor;
        }
        if(dist <= visibleRange && abs(acos((boids[u].vx*(boids[i].x-boids[u].x) + boids[u].vy*(boids[i].y-boids[u].y))/(dist*speed))) <= radians(125)){
           nNeighbours ++;
           //alignment
          avgVx += boids[i].vx;
          avgVy += boids[i].vy;
           //cohesion
          avgX += boids[i].x;
          avgY += boids[i].y;
        }  
      }
    }
    //alignment (cont.)
    if(nNeighbours > 0){
      avgVx /= nNeighbours;
      avgVy /= nNeighbours;
      boids[u].vx += (avgVx - boids[u].vx)*matchingFactor;
      boids[u].vy += (avgVy - boids[u].vy)*matchingFactor;
    //cohesion (cont.) //<>//
      avgX /= nNeighbours;
      avgY /= nNeighbours;
      boids[u].vx += (avgX - boids[u].x)*centeringFactor;
      boids[u].vy += (avgY - boids[u].y)*centeringFactor;
    }
    //screen edges
    if(boids[u].x > rightMargin){
      boids[u].vx -= turnFactor*(1-abs(width-boids[u].x)/paddingX);
    }
    
    if(boids[u].x < leftMargin){
      boids[u].vx += turnFactor*(1-abs(0-boids[u].x)/paddingX);
    }
    if(boids[u].y > topMargin){
      boids[u].vy -= turnFactor*(1-abs(height-boids[u].y)/paddingY);
    }
    
    if(boids[u].y < bottomMargin){
      boids[u].vy += turnFactor*(1-abs(0-boids[u].y)/paddingY);
    }
    
    //regulate speed
    
    
    if(speed > maxSpeed){
      boids[u].vx /= speed;
      boids[u].vx *= maxSpeed;
      boids[u].vy /= speed;
      boids[u].vy *= maxSpeed;
    }else if(speed < minSpeed){
      boids[u].vx /= speed;
      boids[u].vx *= minSpeed;
      boids[u].vy /= speed;
      boids[u].vy *= minSpeed;
    }
    //float theta = atan(boids[u].vy/boids[u].vx);
    
   // float upstreamFactor = 0.00005;
  //  boids[u].vx += (width - boids[u].x)* upstreamFactor; 
   // boids[u].vy += (0 - boids[u].y)* upstreamFactor;
   
   float noiseFactor = 0.00005;
   boids[u].vx += cos(noise(boids[u].x*0.01,boids[u].y*0.01)*2*PI)*noiseFactor;
   boids[u].vy += sin(noise(boids[u].x*0.01,boids[u].y*0.01)*2*PI)*noiseFactor;
   
  if (mousePressed == true) {
     attractorX = mouseX;
     attractorY = mouseY;
   
  }
   float mouseFactor = 0.0005;
   if(attractorX != -1 && attractorY != -1){
      
     boids[u].vx += ((float)attractorX - boids[u].x)*mouseFactor;
     boids[u].vy += ((float)attractorY - boids[u].y)*mouseFactor;
   }
    //draw the fing boid
    boids[u].x += boids[u].vx;
    boids[u].y += boids[u].vy;
    hint(ENABLE_STROKE_PURE);
    //colorMode(HSB);
      
    stroke(boids[u].c);
    strokeWeight(3);
    point(boids[u].x,boids[u].y);
    
    stroke(boids[u].c,125);
    strokeWeight(1.5);
    line(boids[u].x,boids[u].y,boids[u].x-boids[u].vx, boids[u].y-boids[u].vy);
    //line(boids[u].x, boids[u].y, boids[u].x + boids[u].vx, boids[u].y + boids[u].vy); 
   
  //  circle(boids[u].x + boids[u].vx*5, boids[u].y + boids[u].vy*5,2.5);
   // triangle(boids[u].x+cos(theta)*4, boids[u].y+sin(theta)*4, boids[u].x+cos(theta+2*PI/3)*4, boids[u].y+sin(theta+2*PI/3)*4, boids[u].x+cos(theta-2*PI/3)*4, boids[u].y+sin(theta-2*PI/3)*4);
    // circle(boids[u].x+cos(theta)*10, boids[u].y+sin(theta)*10,1); 
    //   fill(0);
    //circle(boids[u].x+cos(theta)*10, boids[u].y+sin(theta)*10,2); 
 //fill(255);
  //  circle(boids[u].x-cos(theta)*10, boids[u].y-sin(theta)*10,2);  
  }
}

class O_Rect{
  float x1, y1, x2, y2;
  O_Rect(float x1, float y1, float x2, float y2){
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }
}
class Boid {
  float x, y, vx, vy;
  int c;
  Boid (float x, float y, float vx, float vy, int c){
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.c = c;
  }
}
