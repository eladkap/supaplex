class Wall extends Tile {
  constructor(row, col, width, forecolor, backcolor, symbol) {
    super(row, col, width, forecolor, backcolor, symbol);
  }

  // Draw() {
  // strokeWeight(0.1);
  // stroke(GRAY3);
  // fill(this.forecolor);
  // rect(this.pos.x, this.pos.y, this.width, this.width);
  // textSize(this.width * 0.75);
  // text(this.symbol, this.pos.x, this.pos.y + this.width * 0.7);
  // }
}
