// All Examples Written by Casey Reas and Ben Fry

// unless otherwise stated.

float max_distance;
float radius;

void setup() {

  size(700, 500); 

  smooth();

  noStroke();

  // frameRate(26);

  // strokeWeight( 1111 );

  max_distance = dist(300, 300, width, height);

}



void draw() {

  background(208,mouseY/2, 45 );

  radius = radius + sin( frameCount / 6 ); 

  for(int i = 0; i <= width*1.1; i += 20) {

    for(int j = 0; j <= width*1.1; j += 20) {

      float size = dist(j, j, i, j);

      size = size/max_distance * 66 - radius;

      fill(i/3,j/3, mouseX/3);

      ellipse(i, j, size, size);

    }


  }

}