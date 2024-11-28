var vertices;
var triangles;
var WIDTH;
var LENGTH;
var sTriangle;
var i = 0;
let pause = false;

function setup() {
  frameRate(100);
  noFill();
  WIDTH = 1000;
  LENGTH = 1000;
  createCanvas(WIDTH,LENGTH);
  vertices = [];
  triangles = [];
 
  for(var i=0;i<1000;i++){
    var randX = random(50,WIDTH-50);
    var randY = random(50,LENGTH-50);
    vertices.push(new Vertex(randX,randY));
  } 
  

  //Create bounding super triangle  
  //COPIED @symbolab.com/solver/step-by-step/%5Cfrac%7Bd%7D%7Bdx%7D%5Cleft(arctan%5Cleft(x%5Cright)%5Cright)?or=input
  var minX = Infinity;
  var minY = Infinity;
  var maxX = -Infinity;
  var maxY = -Infinity;

  vertices.forEach(function(vertex) {
    minX = Math.min(minX, vertex.x);
    minY = Math.min(minY,vertex.y);
    maxX = Math.max(maxX,vertex.x);
    maxY = Math.max(maxY, vertex.y);
   });
   var dX = (maxX - minX) * 10;
   var dY = (maxY - minY) * 10;

   var v0 = new Vertex(minX - dX, minY - dY * 3);
   var v1 = new Vertex(minX - dX, maxY + dY);
   var v2 = new Vertex(maxX + dX * 3, maxY + dY);

  sTriangle = new Triangle(v0,v1,v2);

   triangles.push(sTriangle);

}

function draw() {
  //Triangulate each vertex ⇐ uses addVertex() function
  if(i<vertices.length){
    
    background(220);

    var u = vertices[i];
     //Update array of triangles by adding a new vertex

    // Remove triangles with circumcircles containing the vertex
    var tempArr = [];
    var uniqueEdges = [];
    
    for(var j=0;j<triangles.length;j++){
      if(!triangles[j].containsVertex(u)){
        tempArr.push(triangles[j]);
      }else{
         // Get unique edges 
        uniqueEdges.push( new Edge(triangles[j].v0, triangles[j].v1) );
        uniqueEdges.push( new Edge(triangles[j].v1, triangles[j].v2) );
        uniqueEdges.push( new Edge(triangles[j].v2, triangles[j].v0) );
      }
    }
    uniqueEdges = uniquify(uniqueEdges);
    for(var j=0;j<uniqueEdges.length;j++){
      tempArr.push(new Triangle(uniqueEdges[j].v0, uniqueEdges[j].v1, u));
    }

    triangles = tempArr;

    for(var j=0;j<triangles.length;j++){
      var t = triangles[j];
      triangle(t.v0.x,t.v0.y,t.v1.x,t.v1.y,t.v2.x,t.v2.y);
    }
    
    strokeWeight(10);
    
    for(var j=0;j<vertices.length;j++){
   
      point(vertices[j].x,vertices[j].y);
    }
    strokeWeight(1);
    
  }else{

    var tempArr = [];
    for(var j=0;j<triangles.length;j++){
      var t = triangles[j];
      if(sTriangle.v0.equals(t.v0) || sTriangle.v0.equals(t.v1) || sTriangle.v0.equals(t.v2)){
        
      }
      else if(sTriangle.v1.equals(t.v0) || sTriangle.v1.equals(t.v1) || sTriangle.v1.equals(t.v2)){
       
      }
      else if(sTriangle.v2.equals(t.v0) || sTriangle.v2.equals(t.v1) || sTriangle.v2.equals(t.v2)){
       
      }else{
        tempArr.push(t);
      }
    }
    triangles = tempArr;
    background(255);


    for(var j=0;j<triangles.length;j++){
      var t = triangles[j];
      triangle(t.v0.x,t.v0.y,t.v1.x,t.v1.y,t.v2.x,t.v2.y);
    }
    
    strokeWeight(10);
    
    for(var j=0;j<vertices.length;j++){
   
      point(vertices[j].x,vertices[j].y);
    }
    strokeWeight(1);


  }

  i++;
  //Remove triangles that share edges with super triangles
  

}


class Vertex{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }

  equals(vertex){
    return this.x == vertex.x && this.y == vertex.y;
  }
}

//non-directional edges
class Edge{
  constructor(v0,v1){
    this.v0 = v0;
    this.v1 = v1;
  }

  equals(edge){
    return (this.v0 == edge.v0 && this.v1 == edge.v1) || (this.v0 == edge.v1 && this.v1 == edge.v0);
  }
}

class Triangle{
  constructor(v0,v1,v2){
    this.v0 = v0;
    this.v1 = v1;
    this.v2 = v2;
  }

  //check if given vertex is within circumcircle of triangle
  containsVertex(v){
  
    
    //calculate perpendicular bisectors of two edges
    
    //y - y1 = m(x-x1)

    var x0 = (this.v0.x + this.v2.x)/2;


    var y0 = (this.v0.y + this.v2.y)/2;
    
    var m0 = -1/(  (this.v2.y - this.v0.y)/(this.v2.x - this.v0.x)  );

    var x1 = (this.v1.x + this.v2.x)/2;
    var y1 = (this.v1.y + this.v2.y)/2;
    var m1 = -1/(  (this.v2.y - this.v1.y)/(this.v2.x - this.v1.x)  );
    
    if(m0 == -Infinity){
      m0 = 0;
    }
    if(m1 == -Infinity){
      m1 = 0;
    }
    //calculate coordinates of circumcircle
    //  aka find the intersection of two perpendicular bisecors

    //y - y0 = m0(x-x0)
    //y - y1 = m1(x-x1)

    //y = m1(x-x1) + y1

    //m1(x-x1) + y1 = m0(x-x0) + y0 
    //m1(x-x1) + y1 - y0 = m0(x-x0) 

    //m1(x) - m1(x1) + y1 - y0 = m0(x) - m0(x0)

     //m1(x)  - m0(x) = y0 -y1 - m0(x0) + m1(x1) 
    // x (m1 - m0) = y0 - y1 - m0(x0) + m1(x1)

    //x  = (y0 - y1 - m0(x0) + m1(x1))/(m1 - m0)


    //x =  (y0 - y1 - m0(x0) + m1(x1))/(m1 - m0) 
    //y = m1(x-x1) + y1

    var xIntersect =  (y0 - y1 - m0*x0 + m1*x1) / (m1 - m0);
  
    var yIntersect = m1*(xIntersect - x1) + y1;

    //calculate radius of cicumcircle
    var radius = sqrt((yIntersect - this.v0.y)**2 + (xIntersect - this.v0.x)**2);

    //calculate distance of vertex to circumcircle origin
    var distToOrigin = sqrt((yIntersect - v.y)**2 + (xIntersect - v.x)**2);

    //  compare to radius to determine if vertex is within or not :)
   
    return distToOrigin <= radius;
  }
}

//copied from @https://www.gorillasun.de/blog/bowyer-watson-algorithm-for-delaunay-triangulation/
function uniquify(edges){
  var uniqueEdges = [];
  for(var i=0;i<edges.length;i++){
    var isUnique = true;
    for(var j=0;j<edges.length;j++){
      if(i != j && edges[i].equals(edges[j])){
        isUnique = false;
        break;
      }
    }
    if(isUnique){
      uniqueEdges.push(edges[i]);
    }
  }
  return uniqueEdges;
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