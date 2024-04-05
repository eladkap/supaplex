class Port extends Tile {
  constructor(row, col, width, image, symbol, type) {
    super(row, col, width, image, symbol);
    this.type = type;
  }
}
