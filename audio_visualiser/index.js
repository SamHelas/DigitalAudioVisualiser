var song;

function preload() {
  song = loadSound('/assets/OGreenWorld.mp3');
  //song = loadSound('/assets/FeelGoodInc.mp3');
}

function setup() {
    createCanvas(1080, 720);
    song.loop();

    // create a new Amplitude analyzer
    analyzer = new p5.Amplitude();

    // Patch the input to an volume analyzer
    analyzer.setInput(song);
}

function draw() {
  background(255);

  // Get the average (root mean square) amplitude
  var rms = analyzer.getLevel();
  fill(127);
  stroke(0);

  // Draw an ellipse with size based on volume
  //ellipse(width/2, height/2, 20+rms*200, 20+rms*200);

  rect((width/2)+(rms*200), height/2, rms*200, 2);
  rect((width/2)-2*(rms*200), height/2, rms*200, 2);
  rect(width/2, (height/2)+(rms*200), 2, rms*200);
  rect(width/2, (height/2)-2*(rms*200), 2, rms*200);
}