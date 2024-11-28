import java.lang.Math;
import java.util.Random;
MakeCirclePacker mcp;
int width = 1170*2; int height = 2532*2;
int counter = 0;
void settings(){
  size(width,height);
}
void setup(){
  

  frameRate(100);
  mcp = new MakeCirclePacker(width,height,10);
  background(0,0,0, 0);
}
void draw(){
  counter +=1;
  if(counter > 10000){
    noLoop();
    save("image2.jpg");
  }
  System.out.println("fuck");
  noStroke();
  fill(random(255),random(255),random(255));
  mcp.rose(); //<>//
}

class MakeCirclePacker{
  float width; float height; int gridDivs;
  float gridSizeX; float gridSizeY;
  Cell[][] grid;
  
  MakeCirclePacker(float width, float height, int gridDivs){
    this.width = width;
    this.height = height;
    this.gridDivs = gridDivs;
    
    //actual size of the grid cells
    this.gridSizeX = this.width/this.gridDivs;
    this.gridSizeY = this.height/this.gridDivs;
    
    this.generateGrid();
  } 
  
  void generateGrid(){
    this.grid = new Cell[this.gridDivs][this.gridDivs];
    for(int x=0;x<this.gridDivs;x++){
      for(int y=0;y<this.gridDivs;y++){
        this.grid[x][y] = new Cell(x,y, new ArrayList<CircleObj>());
      }
    }
  }
  
  Cell getTile(float x, float y){
    return this.grid[floor(x/this.gridSizeX)][floor(y/this.gridSizeY)];
  }
  
  ArrayList<Cell> getGridTilesAround(float x, float y, float r){
  //Because a circle can technically touch multiple grid cells, we also need a function that can fetch all of those cells
    ArrayList<Cell> tiles = new ArrayList<Cell>();
    int scaledMinX = floor((x - r )/this.gridSizeX)-1;
    int scaledMaxX = floor((x + r )/this.gridSizeX)+1;
    int scaledMinY = floor((y - r )/this.gridSizeY)-1;
    int scaledMaxY = floor((y + r )/this.gridSizeY)+1;
    for(int i=scaledMinX; i<=scaledMaxX; i++){
      for(int j=scaledMinY; j<=scaledMaxY; j++){
        if(i >= 0 && i < this.gridDivs && j >= 0 && j < this.gridDivs){
          tiles.add(this.grid[i][j]);
        }
      }
    }
    return tiles;
  }
  
  boolean tryToAddCircle(float x, float y, float r){
      Cell tile = this.getTile(x,y);
      for(CircleObj c : tile.circles){
        if(c.isColliding(new CircleObj(x,y,r))){
          return false;
        }
      }
      ArrayList<Cell> tiles_around = this.getGridTilesAround(x,y,r);
      for(Cell t : tiles_around){
        for(CircleObj c : t.circles){
          if(c.isColliding(new CircleObj(x,y,r))){
            return false;
          }
        }
      }
      return true;
  }
  void rose(){
    float t = random(0,1000);
   // float a = 400;
    //float b = 3.5;
   // float k = 5;
  //  rose
    //float x = a*cos(b*theta)*cos(theta) + width/2;
    //float y = a*cos(b*theta)*sin(theta)+ height/2;
    float R = 5*75*2;
    float q = 1*75*2;
    float d = 2*75*2;
    float x = (R - q) * cos(t) + d * cos((R - q) / q * t) + width/2;
    float y = (R - q) * sin(t) - d * sin((R - q) / q * t) + height/2;
    float maxR = 25*2;
    float minR = 5*2;
    
    float r = random(minR,maxR);
    while(r >= minR){
      if(tryToAddCircle(x,y, r)){
        Cell tile = this.getTile(x,y);
        tile.circles.add(new CircleObj(x,y,r)); 
        ellipse(x,y,r*2,r*2);
        return;
      }
      r -= 0.1;
    }
    
  }
  void randomAddCircle(){
    float maxR = 50*2;
    float minR = 0.5*2;
    //generate random x,y coordinate
    float x = random(this.width);
    float y = random(this.height);
    
    float r = maxR;
    while(r >= minR){
      if(tryToAddCircle(x,y, r) && Math.pow(x+r-width/2,2)+Math.pow(y+r-height/2,2) <= Math.pow(100,2) && Math.pow(x-r-width/2,2)+Math.pow(y-r-height/2,2) <= Math.pow(100,2)&& Math.pow(x+r-width/2,2)+Math.pow(y-r-height/2,2) <= Math.pow(100,2)&& Math.pow(x-r-width/2,2)+Math.pow(y+r-height/2,2) <= Math.pow(100,2)){
        Cell t = this.getTile(x,y);
        t.circles.add(new CircleObj(x,y,r)); 
        ellipse(x,y,r*2,r*2);
        return;
      }
      r -= 0.1;
    }
  }
  /*
  boolean tryToAddComposite(CompositeObj comp){
    for(CircleObj c : comp.circles){
       if(!tryToAddCircle(c.x,c.y,c.r)){
         return false;
       }
    }
    return true;
  }
  void randomAddComposite(ArrayList<CircleObj> defn_circles, float defn_width, float defn_height){
    Random rand = new Random();
    float x = rand.nextFloat(this.width);
    float y = rand.nextFloat(this.height);
    float scale = 0.5+rand.nextFloat(0.5);
    float maxScale = Math.min(1.0, scale+0.3);
    float minScale = Math.max(0, scale-0.3);
    float tempScale = maxScale;
    
    while(tempScale >= minScale){
      CompositeObj tempComposite = new CompositeObj(x, y, tempScale, defn_circles, defn_width, defn_height);
      if(tryToAddComposite(tempComposite)){
        for(CircleObj c : tempComposite.circles){
          Cell t = getTile(x,y);
          t.circles.add(c); 
          circle(c.x,c.y,c.r);
        }
        break;
      }
      tempScale -= 0.1;
    }
  }*/
}

class Cell{
  int x; int y; ArrayList<CircleObj> circles;
  Cell(int x, int y, ArrayList<CircleObj> circles){
    this.x = x;
    this.y = y;
    this.circles = circles;
  }
}

class CircleObj{
  float y; float x; float r;
  CircleObj(float x, float y, float r){
   // super(x,y);
    this.y = y;
    this.x = x;
    this.r = r;
  }
  boolean isColliding(CircleObj c){
    return Math.sqrt(Math.pow((this.x-c.x),2) + Math.pow((this.y-c.y),2)) <= this.r + c.r;
  }
}






/*
class CompositeObj{
  ArrayList<CircleObj> defn_circles;
  float defn_width;
  float defn_height;
  ArrayList<CircleObj> circles;
  float x; float y;
  float scale;
  CompositeObj(float x, float y, float scale, ArrayList<CircleObj> defn_circles, float defn_width, float defn_height){
    this.defn_circles = defn_circles;
    this.defn_width = defn_width;
    this.defn_height = defn_height;
    
     //so defn_circles are centered on (defn_width/2, defn_height/2)
    this.scale = scale;
    for(CircleObj d_c : this.defn_circles){
      d_c.x = defn_width/2 - this.scale*(defn_width/2 - d_c.x);
      d_c.y = defn_height/2 - this.scale*(defn_height/2 - d_c.y);
    }
    
    this.x = x;
    this.y = y;
    for(CircleObj d_c : this.defn_circles){
      circles.add(new CircleObj(d_c.x - (this.defn_width/2 - this.x), d_c.y - (this.defn_height/2 - this.y), d_c.r*this.scale));
    }
  }
}*/
