let carneiro, agricultor, obsticle;
let FImg, TImg;
let sp = 5;
let score = 0;
let mode = 0; // alterna entre: 0 (início), 1 (jogo), 2 (fim)
let won = false;
let gameOverImage;
let backImg;
let song;

let startAgricultor;
let startCarneiro;

function preload() {
  FImg = loadImage("agricultor.png");
  TImg = loadImage("carneiro.png");
  backImg = loadImage("raca.jpg");
  startAgricultor = loadImage("StartAgricultor.png");
  startCarneiro = loadImage("StartCarneiro.png");

  soundFormats('mp3', 'wav');
  song = loadSound('Som.mp3', loaded);
}

function loaded() {
  // Não inicia o som automaticamente
}

function setup() {
  createCanvas(854, 480);
  noStroke();
  carneiro = new Carneiro();
  agricultor = new Agricultor(width / 4, height / 1.4, width / 8);
  frameRate(60);
}

function draw() {
  background(backImg);
  fill(186, 123, 65);
  
if (mode == 0) {
  image(startAgricultor, width / 8, height * 0.3, width / 6, width / 3);
  image(startCarneiro, width / 1.4, height * 0.45, width / 4, width / 4);
  fill(255, 80);
  stroke(255);
  rect(width / 2 - width / 8, height / 2, width / 4, height / 4, height / 8);
  noStroke();
  fill(255);
  textSize(width / 20);
  text("START", width / 2.05, height / 2 + width / 11);
  
  // Texto adicional na abertura
  fill(25)
  textSize(40);
  textAlign(CENTER);
  text("Ajude o agricultor a escapar do carneiro!", width / 2, height * 0.15);
  
  fill(10)
  textSize(40);
  textAlign(CENTER);
  3,text("AGRINHO 2025", width / 2, height * 0.3);
  }

  if (mode == 1) {
    rect(0, height * 0.9, width, height / 10);
    for (let i = 0; i < 20; i++) {
      tree((width / 15) * i - frameCount % 60, height * 0.7, width / 15);
    }

    carneiro.show();
    carneiro.update();

    agricultor.show();
    agricultor.update();

    checkCollisions();

    textSize(width / 30);
    fill(0);
    text(score, width * 0.95, height * 0.1);
  }

  if (mode == 2) {
    image(gameOverImage, 0, 0);
    textSize(width / 30);
    fill(0);
    text(score, width * 0.95, height * 0.1);
    textSize(width / 20);
    if (won) {
      fill(140, 50, 8);
      text("You Won:)", width / 2.5, height / 2);
    } else {
      fill(25);
      textSize(80);
      text("Game Over", width / 2, height / 4);
    }

    if (mouseIsPressed) {
      carneiro.x = width + random(width);
      score = 0;
      won = false;
    }
  }

  sp = map(score, 0, 100, 10, 40);

  if (score >= 100) {
    gameOverImage = get(0, 0, width, height);
    won = true;
    mode = 2;
    if (song.isPlaying()) {
      song.stop();
    }
  }
}

function checkCollisions() {
  if (
    agricultor.x + agricultor.size / 1.5 > carneiro.x &&
    agricultor.x < carneiro.x + carneiro.size / 1.5 &&
    agricultor.y + agricultor.size / 3 > carneiro.y &&
    agricultor.y < carneiro.y + carneiro.size / 3
  ) {
    gameOverImage = get();
    mode = 2;
    if (song.isPlaying()) {
      song.stop();
    }
  }
}

function mouseClicked() {
  if (mode != 1) {
    mode += 1;

    if (mode == 1 && !song.isPlaying()) {
      song.loop(); // Toca a música quando o jogo começa
    }

    if (mode > 2) {
      mode = 0;
    }
  }
}

function tree(x, y, w) {
  fill(80, 50, 30);
  rect(x + w / 2 - w / 8, y + w * 0.7, w / 4, w);
}