var song;
var w = window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

var h = window.innerHeight ||
  document.documentElement.clientHeight ||
  document.body.clientHeight;

var filePath;
var spectrum_length = 1024;
var freq_hi = 1024;
var freq_lo = 0;

function preload() {
  if (document.cookie != null) {
    filePath = 'assets/'.concat(document.cookie).concat('.mp3');
  } else {
    filePath = '/assets/Sail.mp3';
  }
  song = loadSound(filePath);
  document.getElementById("songName").innerHTML = document.cookie.toUpperCase();
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

  background(black);
  angleMode(DEGREES);

  // Get the average (root mean square) amplitude
  var rms = analyzer.getLevel();
  var spectrum = fft.analyze();
  spectrum_length = spectrum.length;

  visualiser(spectrum, rms);
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
  if (rms > 0.5) {
    fill(c10);
  } else if (rms > 0.45) {
    fill(c2);
  } else if (rms > 0.4) {
    fill(c3);
  } else if (rms > 0.35) {
    fill(c4);
  } else if (rms > 0.3) {
    fill(c5);
  } else if (rms > 0.25) {
    fill(c6);
  } else if (rms > 0.2) {
    fill(c7);
  } else if (rms > 0.15) {
    fill(c8);
  } else if (rms > 0.1) {
    fill(c9);
  } else {
    fill(c5);
  }

  for (var x = freq_lo; x < freq_hi; x = x + 2) {
    ellipse(x * 4, 3 * (height / 4), 5, 5);
    ellipse(x * 4, 3 * (height / 4) - spectrum[x], rms * 40, rms * 40);
  }
}

$(function() {
  $("#slider3").slider({
    range: true,
    min: 0,
    max: spectrum_length,
    values: [0, spectrum_length],
    slide: function(event, ui) {
      freq_lo = ui.values[0];
      freq_hi = ui.values[1];
    }
  });
});