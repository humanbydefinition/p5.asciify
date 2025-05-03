function setup() {
  setAttributes('antialias', false);
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
  background(32);
  fill(255);
  rotateX(radians(frameCount * 3));
  rotateZ(radians(frameCount));
  directionalLight(255, 255, 255, 0, 0, -1);
  box(400, 100, 100);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}