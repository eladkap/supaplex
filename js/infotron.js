class Infotron extends Entity {
  constructor(row, col, width, image, symbol, speed, maze, tileType) {
    super(row, col, width, image, symbol, speed, maze, tileType);
  }

  // Draw(refPos) {
  // if (this.visible) {
  //   noStroke();
  //   fill(this.forecolor);
  //   textSize(this.width * 0.9);
  //   text(
  //     this.symbol,
  //     this.pos.x + refPos.x - this.width * 0.1,
  //     this.pos.y + refPos.y + this.width * 0.8
  //   );
  // }
  // }

  ChangeDirection() {
    this.GoDown();
  }
}
