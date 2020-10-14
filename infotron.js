class Infotron extends Entity {
  constructor(row, col, width, color, symbol, speed, maze, tileType) {
    super(row, col, width, color, symbol, speed, maze, tileType);
  }

  Draw() {
    if (this.visible) {
      noStroke();
      fill(this.color);
      textSize(this.width * 0.6);
      text(this.symbol, this.pos.x, this.pos.y + this.width * 0.7);
    }
  }

  ChangeDirection() {
    this.GoDown();
  }
}
