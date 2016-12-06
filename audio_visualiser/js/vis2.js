var song;
var w = window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;

var h = window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;

var filePath = '/assets/Sail.mp3';

// Useful methods
/*
getPeaks()
*/

/*
  apply inverse equal loudness curve
  OR
  a-weighting 

  20-20000Hz
*/

function preload() {
  //song = loadSound('/assets/OGreenWorld.mp3');
  //song = loadSound('/assets/FeelGoodInc.mp3');
  //song = loadSound('/assets/CigarettesInTheTheatre.mp3');
  //song = loadSound('/assets/spacey.mp3');
  filePath = 'assets/'.concat(document.cookie).concat('.mp3');
  song = loadSound(filePath);
}

function setup() {
    createCanvas(w, h);
    song.play();

    fft = new p5.FFT();
    fft.setInput(song);

    // create a new Amplitude analyzer
    analyzer = new p5.Amplitude();

    // Patch the input to an volume analyzer
    analyzer.setInput(song);
}

function draw() {

  var black = color('#000');
  var purple = color('#69018e');
  var green = color('#0f8e01');
  var blue = color('#06adce');
  var orange = color('#ef9002');
  var red = color('#d10606');

  background(black);
  angleMode(DEGREES);

  // Get the average (root mean square) amplitude
  var rms = analyzer.getLevel();
  var spectrum = fft.analyze();
  //var octaveBands = fft.getOctaveBands(31, 15.625);
  //var spectrum = fft.logAverages(10, 20);
  //console.log("spectrum");
  //console.log(spectrum);

  visualiser(spectrum, rms);

  //fill(black);
  //ellipse(0, 0, (rms*150)+160, (rms*150)+160);
}

function visualiser(spectrum, rms) {
  var c1 = color('#f1e8f4');
  var c2 = color('#bdeff9');
  var c3 = color('#7fe5f9');
  var c4 = color('#57bef2');
  var c5 = color('#5797f2');
  var c6 = color('#2a3acc');
  var c7 = color('#563eb7');
  var c8 = color('#6e3eb7');
  var c9 = color('#e04cd6');

  var c10 = color('#ed1559');

 noStroke();
 if (rms>0.5) {
  fill(c1);
 } else if(rms>0.4) {
  fill(c2);
 } else if (rms>0.3) {
  fill(c3);
 } else if(rms>0.2) {
  fill(c4);
 } else if(rms>0.1) {
  fill(c5); 
} else {fill(c6);}


  
  for (var x = 0; x < spectrum.length; x++) {
    ellipse(x*4, 3*(height/4)-spectrum[x], rms*50, rms*50);
  }

  
}