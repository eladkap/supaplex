class Zonk extends Tile {
  constructor(row, col, width, color, symbol) {
    super(row, col, width, color, symbol);
  }

  Draw() {
    if (this.visible) {
      noStroke();
      fill(this.color);
      textSize(this.width * 0.6);
      text(this.symbol, this.pos.x, this.pos.y + this.width * 0.7);
    }
  }
}
