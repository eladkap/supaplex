class Port extends Tile {
  constructor(row, col, width, image, symbol, type) {
    super(row, col, width, image, symbol);
    this.type = type;
  }

  Draw(refPos) {
    image(
      this.image,
      this.pos.x + refPos.x + this.width / 2,
      this.pos.y + refPos.y + this.width / 2,
      this.width,
      this.width
    );
  }
}
