class Exit extends Tile {
  constructor(row, col, width, forecolor, backcolor, symbol) {
    super(row, col, width, forecolor, backcolor, symbol);
  }

  Draw(refPos) {
    strokeWeight(0.1);
    stroke(GRAY3);
    fill(this.backcolor);
    rect(this.pos.x + refPos.x, this.pos.y + refPos.y, this.width, this.width);
    textSize(this.width);
    textFont(FONT_FAMILY);
    fill(this.forecolor);
    text(
      this.symbol,
      this.pos.x + refPos.x + this.width * 0.2,
      this.pos.y + refPos.y + this.width * 0.8
    );
  }
}
