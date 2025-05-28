class Carneiro {
  constructor() {
    this.x = width+random(width);
    this.y = height/1.3;
    this.size =70;
  }
  update() {
    this.x -= sp;
    if(this.x<-this.size){
      this.x= width + random(width);
      score++;
    }
  }
  show() {
    image(TImg,this.x,this.y,this.size,this.size);
    
  }
}
