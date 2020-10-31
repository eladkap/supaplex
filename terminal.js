class Terminal extends Tile {
  constructor(row, col, width, image, symbol) {
    super(row, col, width, image, symbol);
  }

  // Draw(refPos) {
  //   image(
  //     terminalImage,
  //     this.pos.x + refPos.x + this.width / 2,
  //     this.pos.y + refPos.y + this.width / 2,
  //     this.width,
  //     this.width
  //   );
  // }
}
