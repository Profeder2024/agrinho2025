class Agricultor {
  constructor(x,y,w) {
    this.x = x;
    this.y = y;
    this.size = w;
    this.vy = 0;
    this.gravity = height/400;
    this.jump=false;
  }
  
  update() {
    this.y += this.vy;
    this.vy += this.gravity;
    this.y = constrain(this.y, 0, height/1.4);
    if(this.y>=height/1.4){
      this.jump=false;
    }
    if(keyIsPressed){
      if(key==" " && this.jump==false){
        this.vy=-height/25;
        this.jump=true;
      }
    }
  }
  show() {
    image(FImg,this.x,this.y,this.size,this.size);
  }
  
  jump() {
    this.vy = -20;
  }
}

