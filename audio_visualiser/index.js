var song;

// Useful methods
/*
getPeaks()
*/

function preload() {
  //song = loadSound('/assets/OGreenWorld.mp3');
  song = loadSound('/assets/FeelGoodInc.mp3');
}

function setup() {
    createCanvas(1080, 720);
    song.loop();

    fft = new p5.FFT();
    fft.setInput(song);

    // create a new Amplitude analyzer
    analyzer = new p5.Amplitude();

    // Patch the input to an volume analyzer
    analyzer.setInput(song);
}

function draw() {
  var c = color('#000');
  background(c);
  angleMode(DEGREES);

  // Get the average (root mean square) amplitude
  var rms = analyzer.getLevel();
  var spectrum = fft.analyze();

  fill(127);
  translate(width/2, height/2);
  noStroke();
  for (var i = 0; i < spectrum.length; i ++) {
    //rect(0, 30, 2, rms*200);
    rect(0, 30, 2, spectrum[i]);
    //rect(x, y, w, h)
    rotate(spectrum.length/360);
    //rotate(PI/(spectrum.length));
  }

  fill(c);
  ellipse(0, 0, (rms*200)+60, (rms*200)+60);
  ellipse()
}