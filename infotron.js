class Infotron extends Entity {
  constructor(
    row,
    col,
    width,
    forecolor,
    backcolor,
    symbol,
    speed,
    maze,
    tileType
  ) {
    super(row, col, width, forecolor, backcolor, symbol, speed, maze, tileType);
  }

  Draw() {
    if (this.visible) {
      noStroke();
      fill(this.forecolor);
      textSize(this.width * 0.9);
      text(
        this.symbol,
        this.pos.x - this.width * 0.1,
        this.pos.y + this.width * 0.8
      );
    }
  }

  ChangeDirection() {
    this.GoDown();
  }
}
